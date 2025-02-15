'use client'
import {useEffect, useState} from 'react'
import Image from 'next/image'

const MintForm = () => {
    const [nftName, setNftName] = useState('')
    const [nftDescription, setNftDescription] = useState('')
    const [nftLogoUrl, setNftLogoUrl] = useState('')
    const [userWalletAddress, setUserWalletAddress] = useState('')
    const [showSuccessMessage, setShowSuccessMessage] = useState(false)


    
  return (
    <div className=' flex  h-auto justify-center  items-center mt-28'>
      {!showSuccessMessage ? (
        <form 
        
        className='rounded-[16px] lg:w-[576px] md:w-[576px] w-[436px] mx-4 lg:mx-0 md:mx-0 h-[506px]  bg-[#1F293780] border border-solid border-[#374151]'>
        <p className='text-[#FFFFFF] font-bold text-[24px] py-4 px-6'>Mint Your NFT</p>
        
        <div className='font-normal text-[14px] text-[#ADAEBC] px-6 mb-4'>
            <label className=' font-medium text-[16px] py-2 mb-2' htmlFor='nft-name'>NFT Name</label>
            <input 
            type='text' 
            value={nftName} 
            onChange={(e) => setNftName(e.target.value)} 
            placeholder='Enter your NFT name'
            className='rounded-[8px] lg:w-[510px] md:w-[510px] w-full mt-2 h-[50px] bg-[#1F2937] border border-solid border-[#374151] px-6 py-2' />
        </div>

        <div className="font-normal text-[14px] text-[#ADAEBC] px-6 mb-4">
  <label className="font-medium text-[16px] py-2" htmlFor="nft-description">
    Description
  </label>
  <textarea
    id="nft-description"
    value={nftDescription}
    onChange={(e) => setNftDescription(e.target.value)}
    placeholder="Describe your NFT"
    className="rounded-[8px] lg:w-[510px] md:w-[510px] w-full mt-2 h-[96px] bg-[#1F2937] border border-solid border-[#374151] px-6 py-2 resize-none"
  />
</div>
<div className='font-normal text-[14px] text-[#ADAEBC] px-6 mb-4'>
            <label className=' font-medium text-[16px] py-2 mb-2' htmlFor='nftLogoUrl'>Image URL</label>
            <input 
            type='text' 
            value={nftLogoUrl} 
            onChange={(e) => nftLogoUrl(e.target.value)} 
            placeholder='Enter image URL'
            className='rounded-[8px] lg:w-[510px] md:w-[510px] w-full mt-2 h-[50px] bg-[#1F2937] border border-solid border-[#374151] px-6 py-2' />
        </div>

       <button
       type='submit' 
       className='bg-gradient2 text-[16px] lg:mx-6 md:mx-6 mx-auto  mb-8 text-[#FFFFFF] font-bold mt-4 flex justify-center items-center gap-2 rounded-[8px] h-[58px] lg:w-[510px] md:w-[510px] w-11/12'>
             <Image src='/images/whiteLogo.png' width={16} height={16} />
             <p>Mint NFT</p>
       </button>
        </form>

      ) : (
        <div  className='rounded-[16px] lg:w-[576px] md:w-[576px] w-[456px] mx-auto lg:mx-0 md:mx-0 min-h-[506px] h-auto  bg-[#1F293780] border border-solid border-[#374151]'>
          <div className='flex justify-center items-center flex-col mt-8'>
          <Image src='/images/good.png' width={80} height={80} />
          <p className='text-[#10B981] font-bold text-[24px]'>NFT Minted Successfully!</p>
          <p className='text-[#9CA3AF] font-normal text-[16px]'>Your NFT has been created and added to your collection</p>
          <div className='lg:w-[510px] w-[406px] mt-8 min-h-[476px] h-auto bg-[#1F293780] rounded-[12px]  mb-6'>
          <div className="relative w-11/12 mx-auto h-[256px] mt-6">
            <Image 
              src='https://res.cloudinary.com/dlgdeun8l/image/upload/v1721573917/z2fivrtojco9aiwhjbct.jpg'
              alt="nft" 
              fill
              className="object-cover rounded-t-[12px]" 
            />
          </div>
          
          <div className='px-6 py-3'>
              <p className='text-[#9CA3AF] font-normal text-[14px]'>NFT Name</p>
              <p className='text-[#FFFFFF] text-[16px] fold-bold '>Celestial Harmony #004</p>
          </div>
          <div className='px-6 py-3'>
              <p className='text-[#9CA3AF] font-normal text-[14px]'>Description</p>
              <p className='text-[#FFFFFF] text-[16px] fold-bold'>Celestial Harmony #004</p>
          </div>
          <div className='px-6 py-3'>
              <p className='text-[#9CA3AF] font-normal text-[14px]'>NFT ID</p>
              <p className='text-[#8B5CF6] text-[16px] fold-bold'>#004uoou</p>
          </div>
         
              </div>
              <div className='flex  justify-center items-center gap-4 mb-4'>
                     
                     <button 
                     className='bg-[#1F293780]   text-white font-bold  flex justify-center items-center gap-2 rounded-[12px] h-[48px] lg:w-[247px] md:w-[247px] w-[195px]'>
                         <Image src='/images/share.png' width={16} height={16} />
                         <p className='text-[16px] font-normal'>Share</p>
                     </button>
                     <button 
                     className='bg-gradient2 text-white font-bold  flex justify-center items-center gap-2 rounded-[12px] h-[48px] lg:w-[247px] md:w-[247px] w-[195px]'>
                         <Image src='/images/whiteLogo.png' width={16} height={16} />
                         <p className='text-[16px] font-bold'>Mint another</p>
                     </button>
                 </div>
          </div>
          
        </div>
      )}
        
    </div>
  )
}

export default MintForm