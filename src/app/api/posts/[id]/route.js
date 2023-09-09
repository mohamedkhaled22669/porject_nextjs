import { NextResponse } from "next/server";
import { cookies } from 'next/headers'

export const GET = async (require , {params}) => {

  const accessToken = params.id

  try {
    const res = await fetch("http://localhost:4000/api/post/getposts", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `breary ${accessToken}`
      }
    })
    return new NextResponse(JSON.stringify(await res.json()), {status:200})
  } catch (error) {
    console.log(error);
    return new NextResponse("Database Error", { status: 400 });
  }
}

