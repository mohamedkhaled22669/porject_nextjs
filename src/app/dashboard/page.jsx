"use client"
import React, { useContext } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import useSWR from 'swr'
import Image from 'next/image'
import style from './page.module.css'

import product from "public/apps.jpg"
import Date from '@/components/Date/Date'
import { getCookie } from 'cookies-next'

import { ThemeContext } from '@/context/ThemeContext'

const Dashboard = () => {

  const session = useSession()
  const router = useRouter()

  const {mode} = useContext(ThemeContext)



  // NEW WAY TO FETCH DATA
  const fetcher = async (...args) => await fetch(...args).then(res => res.json());

  const { data, mutate, error, isLoading } = useSWR(`/api/posts/dashboard-my-post/${session?.data?.user.accessToken}`, fetcher);



  if (session.status === "loading") {
    return <p>Loading</p>
  }
  if (session.status === "unauthenticated") {
    router?.push("/dashboard/login");
  }


  // delete post
  const handleDelete = async (id) => {
    try {
      await fetch(`/api/posts/dashboard-my-post/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `${session?.data?.user.accessToken}`
          }
        })
      mutate()
    } catch (error) {
      console.log(error);
    }
  }



  const handleSubmit = async (e) => {
    e.preventDefault()
    const productName = e.target[0].value
    const category = e.target[1].value
    const price = e.target[2].value
    const contact = e.target[3].value
    const imageURL = e.target[4].value
    const description = e.target[5].value

    try {
      const res = await fetch('/api/posts/dashboard-my-post/', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productName,
          category,
          price,
          contact,
          imageURL,
          description,
        }),
      })
      mutate()
      e.target.reset()
      console.log(res);
    } catch (error) {
      console.log(error);
    }


  }



  if (session.status === "authenticated") {


    return (
      <div className='flex justify-between mt-12 px-4'>
        <div className='flex flex-wrap  sm:w-full lg:w-2/3 2xl:w-3/4 justify-between 2xl:justify-around '>
            {/* Show All Product */}
            {isLoading ? "Loading" : data?.map((post) => (

              <div key={post._id} className={`porduct sm:w-10/12  2xl:w-5/12   mb-6  py-2  overflow-hidden mx-3 rounded-xl ${style.product} ${mode === 'light' ? "bg-zinc-300" : "bg-zinc-950"}`}>
                <div className='post-by p-2 flex justify-between'>
                  <h4 className='cursor-pointer p-1' onClick={() => handleDelete(post._id)}> <span>X</span></h4>

                  <h5><Date dateString={post.createdAt} /></h5>
                </div>
                <div className='img'>
                  <Image src={product} alt="Image-Product" className="w-full" />
                </div>
                <div className='content '>
                  <div className='flex justify-between p-2 pl-3'>
                    <div className='pb-2'>
                      <h3 className=''>Category: {post.category}</h3>
                      <h5 className='text-sm'>Salary: <span>{post.price}</span>$</h5>
                    </div>
                    <div className=''>
                      <h3 className='title'>Product: {post.product_name}</h3>
                      <h5 className='text-sm'>Contact: <span>{post.contact}</span></h5>
                    </div>
                  </div>
                  <div className={`${style.desc} text-xs p-2 pl-3 m-0.5`}>
                    <p>{post.description}</p>
                  </div>
                </div>
              </div>
            ))}



          </div>
        <div className=' sm:w-full flex-auto sm:mb-20 lg:w-1/4'>
          <div className='mb-3 text-lg'>Add New Post</div>
          <form onSubmit={handleSubmit} >
            <input type="text" placeholder='Product Name' className='block mb-4 px-3 py-2 rounded-sm border-2 border-gray-400  bg-transparent  w-full' />
            <input type="text" placeholder='Category' className='block mb-4 px-3 py-2 rounded-sm border-2 border-gray-400  bg-transparent  w-full' />
            <input type="text" placeholder='Price' className='block mb-4 px-3 py-2 rounded-sm border-2 border-gray-400  bg-transparent  w-full ' />
            <input type="text" placeholder='Contact' className='block mb-4 px-3 py-2 rounded-sm border-2 border-gray-400  bg-transparent  w-full' />
            <input type="text" placeholder='image url' className='block mb-4 px-3 py-2 rounded-sm border-2 border-gray-400  bg-transparent  w-full' />
            <textarea placeholder='Description' className={`block mb-4 h-44 px-3 py-2 rounded-sm border-2 border-gray-400  bg-transparent  w-full ${style.desc}`}></textarea>
            <button className='py-3 w-40 px-2 text-[#eee] rounded-sm bg-[#53c28b]'>Send</button>
          </form>
        </div>
      </div>
    )
  }



}

export default Dashboard