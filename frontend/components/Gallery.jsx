'use client'
import { toast } from 'react-toastify';
import React, { useEffect, useState } from 'react';
import NftCards from './NftCards';
import axios from 'axios';

const Gallery = () => {
    // Check if `window` is defined before accessing `localStorage`
    const address = typeof window !== "undefined" ? localStorage.getItem('nftaddress') || null : null;
    const [nfts, setNfts] = useState([]);

    const defaultNfts = [
        {
            _id: 1,
            nftLogoUrl: '/images/defaultImage1.png',
            nftName: 'Cosmic Dreams #001',
            nftDescription: 'A journey through digital dimensions',
        },
        {
            _id: 2,
            nftLogoUrl: '/images/defaultImage2.png', // Fixed property name
            nftName: 'Neo Genesis #002',
            nftDescription: 'Digital evolution manifested',
        },
        {
            _id: 3,
            nftLogoUrl: '/images/defaultImage3.png', // Added missing property
            nftName: 'Digital Horizon #003',
            nftDescription: 'Where reality meets digital art',
        },
    ];
    console.log(address);

    useEffect(() => {
        const fetchNFTs = async () => {

            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/get/${address}`);
                console.log(res.data);
                setNfts(res.data.nfts);
               
            } catch (error) {
                console.error('Error fetching NFTs:', error);
                toast.error('Error fetching NFTs: Could not find NFTs for this address.');
                setNfts(defaultNfts); // Show default NFTs in case of error
            }
        };
        if(address){
            fetchNFTs();
        }

       
    }, [address]); // Re-run when `address` changes
    console.log(nfts);

    const dataToDisplay = nfts?.length > 0 ? nfts : defaultNfts;

    return (
        <div className='w-full mt-24 mb-10'>
            <p className='text-[24px] text-[#FFFFFF] lg:px-[160px] md:px-10 px-6 font-bold'>Your NFT Gallery</p>
            <div className='grid lg:grid-cols-3 w-full md:grid-cols-2 grid-cols-1 gap-4 mt-8 lg:px-[160px] md:px-10 px-6'>
                {dataToDisplay.map((nft) => (
                    <NftCards key={nft._id} images={nft} />
                ))}
            </div>
        </div>
    );
}

export default Gallery;
