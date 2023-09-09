import User from "@/models/User"
import connect from "@/utils/db"
import bcrypt from "bcryptjs"
import { NextResponse } from "next/server";

export const POST = async (request) => {
  const { name, email, password } = await request.json()



  // await connect()

  // const hashedPassword = await bcrypt.hash(password, 5)

  // const newUser = new User({
  //   username, email, password: hashedPassword
  // })

  // try {
  //   await newUser.save()

  //   return new NextResponse('User has been Created', {
  //     status: 201
  //   })
  // } catch (err) {
  //   return new NextResponse(err.message, {
  //     status: 500
  //   })
  // }


  try {
    const res = await fetch('http://localhost:4000/api/user/signup', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name, email, password
      })
    })


    if(res.status === 201 ) {
      return new NextResponse(JSON.stringify(await res.json()), {
        status:201
      })
    }

    if (res.status === 200) {
      return new NextResponse(JSON.stringify(await res.json()), {
        status:200
      })
    }




  } catch (err) {

    return new NextResponse(err.message, {
      status: 500
    })
  }

}