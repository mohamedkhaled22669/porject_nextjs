import Image from 'next/image'
import Hero from "public/hero.png";
import Button from '@/components/Button/Button';

export default function Home() {
  return (
    <div className='container  sm:block lg:flex items-center '>
      <div className='flex-col flex-1 sm:px-2 xl:px-4 '>
        <h1 className='sm:text-5xl sm:pt-4 sm:pb-1 lg:text-6xl xl:text-7xl   bg-gradient-to-b from-green-950 to-slate-400 bg-clip-text text-transparent'>
          Better design for your digital products.
        </h1>
        <p className='sm:text-xs sm:py-4 lg:text-sm lg:py-8'>
          Turning your Idea into Reality. We bring together the teams from the
          global tech industry.
        </p>
        <Button url="https://mohamedkhaled22669.github.io/Portfolio-Website/" text="See Out Works" />
      </div>
      <div className='flex-col sm:w-3/5 md:w-1/2 lg:px-10 xl:w-3/4 xl:px-16 2xl:w-full 2xl:px-20  m-auto flex-1 '>
        <Image src={Hero} alt=''   className='w-full' />
      </div>
    </div>
  )
}
