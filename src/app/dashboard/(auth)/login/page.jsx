"use client"
import { signIn, useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'


const Login = () => {
  const [error, setError] = useState(null)

  
  const session = useSession()

  const router = useRouter()
  
  const searchParams = useSearchParams()
  
  
  useEffect(() => {
    const search = searchParams.get('error')
    if (search) {
      console.log("have error");
      setError('Error')
    }else {
      setError(null)
    }
  },[]) 


  if (session.status === "loading") {
    return <p>Loading</p>
  }

  if (session.status === "authenticated") {
    router?.push("/");
  }





  const handleSubmit = (e) => {
    e.preventDefault()

    const name = e.target[0].value
    const password = e.target[1].value

    signIn('credentials', {
      name,
      password
    })


  }

  if (session.status === "unauthenticated") {
    
    return (
      <div className=''>
        <div className='m-auto text-center mb-6'><h2 className='text-4xl'>Login</h2></div>
        <div className='container sm:w-3/4 sm:m-auto md:w-2/3 lg:w-2/8 xl:w-5/12'>
          {!error ? "" : <div className='text-red-600 text-sm mb-2'>The Username or Password is Not correct</div> }
          <form onSubmit={handleSubmit} className='flex flex-col mb-4'>
            <input type='text' placeholder='Username' required className='py-2 px-3 mb-4 rounded-sm  bg-transparent border border-gray-400' />
            <input type='password' placeholder='password' required className='py-2 px-3 mb-4 rounded-sm  bg-transparent border border-gray-400' />
            <button className='border border-gray-400 w-52 py-2 bg-green-500 text-white hover:bg-green-700 rounded-md'>Login</button>
          </form>
          <Link href="/dashboard/register">
            Register to Create A neww account
          </Link>
          {/* <button onClick={() => signIn('google')}>login with google</button> */}
        </div>
      </div>
    )
  }
}

export default Login