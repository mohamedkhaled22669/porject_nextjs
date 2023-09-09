"use client"
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useSession } from 'next-auth/react'

const Regitser = () => {


  const [error, setError] = useState("")

  const session = useSession()

  const router = useRouter()



  if (session.status === "authenticated") {
    router?.push("/dashboard");
  }



  const handleSubmit = async (e) => {
    e.preventDefault()

    const name = e.target[0].value
    const email = e.target[1].value
    const password = e.target[2].value


    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name, email, password
        })
      })

      res.status === 201 && router.push('/dashboard/login?success=Account has beed created')

      setError("email or username is exist")

      // const data = await res.json()

      // console.log(data);

      // if (res.status === 201) {

      //   router.push('/dashboard/login?success=Account has beed created')
      // }
      // if (res.status === 200) {

      //   setError(data.error)
      // }

    } catch (err) {
      setError(err)
      console.log(err);

    }
  }


  if (session.status === "unauthenticated") {
    return (
      <div className=''>
        <div className='m-auto text-center mb-6'><h2 className='text-4xl'>Register</h2></div>
        <div className='container sm:w-3/4 sm:m-auto md:w-2/3 lg:w-2/8 xl:w-5/12'>
          <form onSubmit={handleSubmit} className='  flex flex-col mb-4 '>
            <div className='text-white'>{error ? error : ""}</div>
            <input type="text" required placeholder='username' className='py-2 px-3 mb-4 rounded-sm  bg-transparent border border-gray-400' />
            <input type="email" required placeholder='email' className='py-2 px-3 mb-4 rounded-sm  bg-transparent border border-gray-400' />
            <input type="password" required placeholder='password' className='py-2 px-3 mb-4 rounded-sm  bg-transparent border border-gray-400' />
            <button className='border border-gray-400 w-52 py-2 bg-green-500 text-white mt-2 hover:bg-green-700 rounded-md'> Register</button>
          </form>
          <Link href="/dashboard/login">
            Login with an existing account
          </Link>
        </div>
      </div>
    )
  }
}

export default Regitser