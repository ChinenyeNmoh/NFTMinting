import React from 'react'
import NftCards from './NftCards'
const DummyData = [
    {
      id: 1,
      image: 'https://res.cloudinary.com/dlgdeun8l/image/upload/v1721573917/z2fivrtojco9aiwhjbct.jpg',
      name: 'NFT 1',
      description: 'Cosmic Dreams #001',
      
    },
    {
      id: 2,
      image: 'https://res.cloudinary.com/dlgdeun8l/image/upload/v1721573917/z2fivrtojco9aiwhjbct.jpg',
      name: 'NFT 2',
      description: 'Cosmic Dreams #001',
      
    },
    {
        id: 3,
      image: 'https://res.cloudinary.com/dlgdeun8l/image/upload/v1721573917/z2fivrtojco9aiwhjbct.jpg',
        name: 'NFT 3',
        description: 'Cosmic Dreams #001',
        
        
    }
  
]


const Gallery = () => {
  return (
    <div className='w-full  mt-24 mb-10'>
        <p className='text-[24px] text-[#FFFFFF] lg:px-[160px] md:px-10 px-6 font-bold'>Your NFT Gallery</p>
        <div className='grid lg:grid-cols-3 w-full md:grid-cols-2 grid-cols-1 gap-4 mt-8 lg:px-[160px] md:px-10 px-6'>
            {/* NFTs will be displayed here */}
            {/* <NFTCard /> */}
            {DummyData.map((nft) => (
                <NftCards key={nft.id} images={nft} />
            ))}

        </div>
    </div>
  )
}

export default Gallery