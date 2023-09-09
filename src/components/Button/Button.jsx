import React from 'react'
import Link from 'next/link'

const Button = ({ text,url}) => {
  return (
    <div>
      <Link href={url} target='_blank' className='bg-green-700 sm:text-xs  sm:px-3 sm:py-1 md:text-sm lg:px-5 lg:py-3 rounded-s'>
      {text}
      </Link>
    </div>
  )
}

export default Button