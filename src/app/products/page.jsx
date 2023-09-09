'use client'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import style from './page.module.css'
import Image from "next/image"
import React, { useContext } from 'react'
import useSWR, { mutate } from "swr";
import Date from '@/components/Date/Date'
import product from "public/apps.jpg"

import { ThemeContext } from '@/context/ThemeContext';

const Products =  () => {

  const session = useSession()
  const router = useRouter()

  const {mode} = useContext(ThemeContext)

  console.log(mode);


  // NEW WAY TO FETCH DATA
  const fetcher = async (...args) => await fetch(...args).then(res => res.json());
  const { data, error, isLoading } = useSWR(`/api/posts/${session?.data?.user.accessToken}`, fetcher)




  if (session.status === "loading") {
    return <p>Loading</p>
  }
  if (session.status === "unauthenticated") {
    router?.push("/dashboard/login");
  }


  if (session.status === "authenticated") {

    return (
      <div className='products px-4'>
        <div className=' flex flex-wrap mt-10'>
          <div className='flex-auto pb-5 w-full text-center'>
            <h2 className='text-2xl'>Welcome to SnJcZ</h2>
          </div>
          {/* Show All Product */}

          {isLoading ? "Loading" : data?.map((post) => (

            <div key={post._id} className={`porduct sm:w-3/6  xl:w-2/6 w-full   px-2  `}>
              <div className={`   mb-6  py-2  overflow-hidden  rounded-xl ${style.product} ${mode === 'light' ? "bg-zinc-300" : 'bg-zinc-950'}`}>
                <div className='post-by p-2 flex justify-between'>
                  <h5 className='text-sm'>Post By: <span>{post.posted_by}</span> </h5>

                  <h6 className='text-xs'><Date dateString={post.createdAt} /> </h6>
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
                    <div>
                      <h3 className='title'>Product: {post.product_name}</h3>
                      <h5 className='text-sm'>Contact: <span>{post.contact}</span></h5>
                    </div>
                  </div>
                  <div className={`${style.desc} h-16 text-xs p-2 pl-3 m-0.5`}>
                    <p>{post.description}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}



        </div>
      </div>
    )
  }
  return (
    <div>Error</div>
  )
}

export default Products