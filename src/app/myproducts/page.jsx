'use client'
import { useSession, } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import style from './page.module.css'
import Image from "next/image"
import React, { useState, useEffect, useContext } from 'react'
import useSWR from "swr";
import Date from '@/components/Date/Date';

import product from "public/apps.jpg"
import Edit from "public/edit.jpg"

import { ThemeContext } from '@/context/ThemeContext';

const MyProduct = () => {

	const session = useSession()
	const router = useRouter()

	const {mode} = useContext(ThemeContext)


	const [id, setID] = useState("")
	const [productNmae, setProductName] = useState("")
	const [category, setCategory] = useState("")
	const [price, setPrice] = useState("")
	const [contact, setContact] = useState("")
	const [imageURL, setImageURL] = useState("")
	const [description, setDescription] = useState("")
	const [stateUpdate, setStateUpdate] = useState("")

	// NEW WAY TO FETCH DATA

	const fetcher = async (...args) => await fetch(...args).then(res => res.json());

	const { data, mutate, error, isLoading } = useSWR(`/api/posts/dashboard-my-post/${session?.data?.user.accessToken}`, fetcher);


	console.log(session);

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


	const handleDisabledInput = (st) => {
		const btnState = document.querySelector('#stateBotton')
		btnState.children[0].disabled = st
		btnState.children[1].disabled = st
		btnState.children[2].disabled = st
		btnState.children[3].disabled = st
		btnState.children[4].disabled = st
		btnState.children[5].disabled = st
		btnState.children[6].disabled = st
	}


	const handleConvertToUpdate = (post) => {

		handleDisabledInput(false)

		setID(post._id)
		setProductName(post.product_name)
		setCategory(post.category)
		setPrice(post.price)
		setContact(post.contact)
		setImageURL(post.image_url)
		setDescription(post.description)
		setStateUpdate(true)

	}

	const handleUpdate = async (e) => {
		e.preventDefault()
		const productName = e.target[0].value
		const category = e.target[1].value
		const price = e.target[2].value
		const contact = e.target[3].value
		const imageURL = e.target[4].value
		const description = e.target[5].value


		try {
			const res = await fetch(`/api/posts/dashboard-my-post/${id}`,
				{
					method: "PATCH",
					headers: {
						"Content-Type": "application/json",
						"Authorization": `${session?.data?.user.accessToken}`
					},
					body: JSON.stringify({
						id, productName, category, price, contact, imageURL, description
					})
				})

			if (res.ok) {
				mutate()
				e.target.reset()
				setID("")
				setProductName("")
				setCategory("")
				setPrice("")
				setContact("")
				setImageURL("")
				setDescription("")
				setStateUpdate(false)

				handleDisabledInput(true)
			} else {
				console.log("samesing is err");
			}

		} catch (error) {
			console.log(error);
		}
	}



	if (session.status === "authenticated") {

		return (
			<div className='products flex justify-between mt-12 px-4  sm:flex-col-reverse lg:flex-row'>
				{/* Cards */}
				<div className=' flex flex-wrap  sm:w-full lg:w-2/3 2xl:w-3/4 justify-between 2xl:justify-around'>

					{/* Show All Product */}

					{isLoading ? "Loading" : data?.map((post) => (

						<div key={post._id} className={`porduct sm:w-10/12  2xl:w-5/12    mb-6  py-2  overflow-hidden mx-3 rounded-xl ${style.product} ${mode === 'light' ? "bg-zinc-300" : "bg-zinc-950"}` }>
							<div className={`post-by p-2 flex justify-between `}>
								<h4 className='flex justify-start items-center' >
									<span className='cursor-pointer p-1 ' onClick={() => handleDelete(post._id)}>X</span>
									<span className='h-6 w-6 cursor-pointer ml-2' onClick={() => { handleConvertToUpdate(post) }}><Image src={Edit} alt='Edit Post' className='' /></span>
								</h4>

								<h5><Date dateString={post.createdAt} /> </h5>
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
				{/* Add Posts */}
				<div className='sm:w-full flex-auto sm:mb-20 lg:w-1/4'>
						<div className='mb-3 text-lg'>Edit Post</div>
						<form onSubmit={handleUpdate} id='stateBotton'>
							<input required disabled onChange={(e) => setProductName(e.target.value)} value={productNmae} type="text" placeholder='Product Name' className='px-3 py-2 rounded-sm border-2 border-gray-400  bg-transparent  w-full  block mb-4' />
							<input required disabled onChange={(e) => setCategory(e.target.value)} value={category} type="text" placeholder='Category' className='block mb-4 px-3 py-2 rounded-sm border-2 border-gray-400  bg-transparent w-full' />
							<input required disabled onChange={(e) => setPrice(e.target.value)} value={price} type="text" placeholder='Price' className='block mb-4 px-3 py-2 rounded-sm border-2 border-gray-400  bg-transparent w-full' />
							<input required disabled onChange={(e) => setContact(e.target.value)} value={contact} type="text" placeholder='Contact' className='block mb-4 px-3 py-2 rounded-sm border-2 border-gray-400  bg-transparent w-full' />
							<input required disabled onChange={(e) => setImageURL(e.target.value)} value={imageURL} type="text" placeholder='image url' className='block mb-4 px-3 py-2 rounded-sm border-2 border-gray-400  bg-transparent w-full' />
							<textarea required disabled onChange={(e) => setDescription(e.target.value)} value={description} placeholder='Description' className={`block mb-4 h-44 px-3 py-2 rounded-sm border-2 border-gray-400  bg-transparent w-full ${style.desc}`}></textarea>
							<button disabled className='py-3 w-40 px-2 text-[#eee] bg-[#53c28b]'>Update</button>
						</form>
				</div>
			</div>
		)
	}
	return (
		<div>Error</div>
	)
}

export default MyProduct
