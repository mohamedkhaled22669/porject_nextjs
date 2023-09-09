import { NextResponse } from "next/server";
import { cookies } from "next/headers";


// Add New Post
export const POST = async (request , {params}) => {
  const { productName, category, price, contact, imageURL, description } = await request.json()

  const accessToken = params.id
  const token = cookies().get('token')

  try {
    const res = await fetch("http://localhost:4000/api/post/addpost", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `baray ${accessToken}`
      },
      body: JSON.stringify({
        productName,
        category,
        price,
        contact,
        imageURL,
        description
      })
    })
    if (res.status === 200) {
      return new NextResponse(JSON.stringify(await res.json()))
    }
  } catch (error) {
    console.log(error);

  }

}

