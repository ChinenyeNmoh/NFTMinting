import React from 'react'
import Image from 'next/image'
import { ConnectButton } from "@rainbow-me/rainbowkit";

const Header = () => {
  return (
    <div className='w-full h-[73px] overflow-x-hidden bg-[#000000] flex justify-between items-center lg:px-[160px] px-6 md:px-10'>
        <Image src='/icon.png' width={24} height={24} alt="logo"/>
        <ConnectButton /> {/* Connect Button */}


    </div>
  )
}

export default Header