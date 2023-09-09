"use client"
import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'
import React, { useState } from 'react'
import DarkModeToggle from "../DarkModeToggle/DarkModeToggle";
import style from './page.module.css'


const links = [
  {
    id: 1,
    title: "Home",
    url: '/',
    classStyle: "home"
  },
  {
    id: 2,
    title: "Products",
    url: '/products',
    classStyle: "product"
  },
  {
    id: 3,
    title: "MyProducts",
    url: '/myproducts',
    classStyle: "myproduct"

  },
  {
    id: 4,
    title: "Dashboard",
    url: '/dashboard',
    classStyle: "dashboard"

  },

]


const Navbar = () => {


  const [nav, setNave ] = useState('home')


  const session = useSession()
  return (
    <div className='flex justify-between px-4 py-6'>
      <Link href='/'>
        SnJcZ
      </Link>
      <div className={`navbar flex ${style.navbar}`}>
        <DarkModeToggle />
        {links.map((link) => (
          <Link href={link.url} key={link.id} onClick={() => {setNave(link.classStyle)}} className={`ml-3 px-px transition-all  ${nav === link.classStyle ? style.active : ""} ${style.link} `}>
            {link.title}
          </Link>
        ))}
        {session.status === "authenticated" && (
          <button className='ml-3  bg-green-500 text-[#fff] px-1' onClick={signOut}>Logout</button>
        )}
      </div>
    </div>
  )
}


export default Navbar