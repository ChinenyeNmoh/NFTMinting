import React from 'react'
import Image from 'next/image'

const Hero = () => {
  return (
    <div className='w-full flex flex-col justify-center  items-center mt-24'>
        <p className='font-bold  lg:text-[60px] md:text[60px] text-[40px] text-[#FFFFFF] text-center '>Discover & Collect  </p>
        <p className='font-bold  lg:text-[60px] md:text[60px] text-[40px] text-[#FFFFFF] leading-8 text-center'> Extraordinary NFTs</p>
        <p className='font-normal mt-14 text-[#D1D5DB] text-[20px] text-center md:w-10/12 lg:w-[800px]  w-10/12'>Enter the world of digital art and collectibles. Explore unique NFTs created by artists worldwide</p>
        

        <div className='flex mt-8 justify-center items-center gap-4'>
            <button 
            className='bg-gradient2 text-white font-bold mt-4 flex justify-center items-center gap-2 rounded-[12px] h-[58px] w-[194px]'>
                <Image src='/images/rocket.png' width={16} height={16} alt="rocket"/>
                <p className='text-[16px] font-bold'>Start Creating</p>
            </button>
            <button 
            className='bg-[#1F293780] border border-solid border-[#374151] text-white font-bold mt-4 flex justify-center items-center gap-2 rounded-[12px] h-[58px] w-[194px]'>
                <Image src='/images/play.png' width={16} height={16} alt="play"/>
                <p className='text-[16px] font-medium'>Watch Demo</p>
            </button>
        </div>
    </div>
  )
}

export default Hero