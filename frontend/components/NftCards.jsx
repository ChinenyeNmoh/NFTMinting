import React from 'react'
import Image from 'next/image'


const NftCards = ({images}) => {
  return (
<div className='w-full h-[278px] bg-[#11182780] rounded-[12px] border border-solid border-[#374151] mb-6'>
<div className="relative w-full h-[192px]">
  <Image 
    src={images?.nftLogoUrl} 
    alt="nft" 
    fill
    className="object-cover rounded-t-[12px]" 
  />
</div>

<div className='p-4'>
    <p className='text-[#FFFFFF] font-bold text-[16px]'>{images?.nftName}</p>
    <p className='text-[#9CA3AF] text-[14px] fold-medium'>{images?.nftDescription}</p>
</div>
    </div>
  )
}

export default NftCards