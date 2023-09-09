import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {headers } from 'next/headers'

// Get My Posts
export const GET = async(require, {params}) => {
  const accessToken = params.id


  try {
    const res = await fetch("http://localhost:4000/api/post/getmyposts", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `brary ${accessToken}`
      }
    })
    return new NextResponse(JSON.stringify(await res.json()), {status:200})
  } catch (error) {
    console.log(error);
    return new NextResponse("Database Error", { status: 400 });
  }
}

// Delete My Post
export const DELETE = async (request, { params }) => {
  const { id } = params
  const headersInstance = headers()
  const accessToken = headersInstance.get('authorization')
  try {
    const res = await fetch(`http://localhost:4000/api/post/deletepost/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `bearay ${accessToken}`
      },
    })

    return new NextResponse(await res.json(), {status:200})
  } catch (error) {
    return new NextResponse(await res.json() , {status: 500})
  }
}


// Update Post
export const PATCH = async(request , {params} ) => {

  const {id} = params
  const headersInstance = headers()
  const accessToken = headersInstance.get('authorization')

  const { productName, category , price, contact, imageURL, description } = await request.json()

  try {
    const res = await fetch(`http://localhost:4000/api/post/updatepost/${id}`,{
      method:"PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `baray ${accessToken}`
      },
      body:JSON.stringify({
        productName,
        category,
        price,
        contact,
        imageURL,
        description})
    })
    return new NextResponse(await res.json(), {status:200})
  } catch (error) {
    console.log(error);
    return new NextResponse(await res.json(), {status:400})
  }
}

