'use client';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAccount } from 'wagmi';
import { useContractWrite } from 'wagmi';
import { toast } from 'react-toastify';
import { checkNftId } from '../utils/mint';
import abi from '../utils/abi.json';
import { contractAddress } from '../utils/mint';
import LoadingPage from '../app/loading';
import { ethers } from 'ethers';
import {fetchNftById} from '../utils/mint';
import {useRouter} from 'next/navigation';

const MintForm = () => {
  const [nftID, setNftID] = useState('');
  const [nftName, setNftName] = useState('');
  const [nftDescription, setNftDescription] = useState('');
  const [nftLogoUrl, setNftLogoUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [userWalletAddress, setUserWalletAddress] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [createdNft, setCreatedNft] = useState(null);
  const router = useRouter();

  const { address, isConnected } = useAccount();

  useEffect(() => {
    if (isConnected && address) {
      setUserWalletAddress(address);
      localStorage.setItem('nftaddress', address);
    }else{
      localStorage.removeItem('nftaddress');
    }
  }, [address, isConnected]);

  const contractConfig = {
    addressOrName: contractAddress,
    contractInterface: abi,
  };

  const { writeAsync: mint, error: mintError } = useContractWrite({
    ...contractConfig,
    functionName: 'mint',
  });

  const mintNft = async (e) => {
    e.preventDefault();
  
    if (!isConnected || !address) {
      toast.error("Please connect your wallet to mint NFTs.");
      return;
    }
  
    try {
      setLoading(true);
      setShowSuccessMessage(false);
  
      // Generate a unique NFT ID
      let tokenId = Math.floor(Math.random() * 1000000);
      while (await checkNftId(tokenId)) {
        tokenId = Math.floor(Math.random() * 1000000);
      }
  
      setNftID(tokenId);
      console.log("Unique NFT ID generated:", tokenId);
  
      // Construct metadata URL
      const metadataUrl = `https://nftminting-vbec.onrender.com/api/nfts/${tokenId}`;
  
      // Send NFT metadata to backend
      const res = await axios.post("https://nftminting-vbec.onrender.com/api/create", {
        nftId: tokenId,
        nftName,
        nftDescription,
        nftLogoUrl,
        userWalletAddress: address,
      });
  
      if (res.status !== 201) {
        throw new Error("Failed to save NFT metadata on the backend.");
      }
  
      // Ensure Ethereum provider is available
      if (!window.ethereum) {
        toast.error("MetaMask not detected. Please install MetaMask.");
        return;
      }
  
      // Use window.ethereum directly without Web3Provider
      const provider = new ethers.BrowserProvider(window.ethereum); 
      await window.ethereum.request({ method: "eth_requestAccounts" }); // Request user permission
      const signer = await provider.getSigner();
  
      const contract = new ethers.Contract(contractAddress, abi, signer); // Use signer directly
  
      const tx = await contract.mint(tokenId, metadataUrl);
      const receipt = await tx.wait();
      console.log("Transaction Receipt", receipt);
  

      // Validate receipt logs instead of events
if (!receipt.logs || receipt.logs.length === 0) {
  throw new Error("Minting event not found in transaction receipt.");
}
const mintedTokenId = ethers.toBigInt(receipt.logs[0].topics[3]).toString();

const data = await fetchNftById(tokenId);
console.log("Created NFT:", data);
setCreatedNft(data);

      toast.success("NFT minted successfully!");
      setShowSuccessMessage(true);
    } catch (error) {
      console.error("Error minting NFT:", error);
      toast.error(error?.response?.data?.message || "An error occurred while minting NFT");
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className=' flex  h-auto justify-center  items-center mt-28'>
      {!showSuccessMessage ? (
        <form 
        onSubmit={mintNft}
        className='rounded-[16px] lg:w-[576px] md:w-[576px] w-[436px] mx-4 lg:mx-0 md:mx-0 h-[506px]  bg-[#1F293780] border border-solid border-[#374151]'>
        <p className='text-[#FFFFFF] font-bold text-[24px] py-4 px-6'>Mint Your NFT</p>
        
        <div className='font-normal text-[14px] text-[#ADAEBC] px-6 mb-4'>
            <label className=' font-medium text-[16px] py-2 mb-2' htmlFor='nft-name'>NFT Name</label>
            <input 
            type='text' 
            value={nftName} 
            onChange={(e) => setNftName(e.target.value)} 
            required
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
    required
    placeholder="Describe your NFT"
    className="rounded-[8px] lg:w-[510px] md:w-[510px] w-full mt-2 h-[96px] bg-[#1F2937] border border-solid border-[#374151] px-6 py-2 resize-none"
  />
</div>
<div className='font-normal text-[14px] text-[#ADAEBC] px-6 mb-4'>
            <label className=' font-medium text-[16px] py-2 mb-2' htmlFor='nftLogoUrl'>Image URL</label>
            <input 
            type='text' 
            value={nftLogoUrl} 
            onChange={(e) => setNftLogoUrl(e.target.value)} 
            required
            placeholder='Enter image URL'
            className='rounded-[8px] lg:w-[510px] md:w-[510px] w-full mt-2 h-[50px] bg-[#1F2937] border border-solid border-[#374151] px-6 py-2' />
        </div>
        {loading && <LoadingPage />}
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
          <Image src='/images/good.png' width={80} height={80} alt='good'/>
          <p className='text-[#10B981] font-bold text-[24px]'>NFT Minted Successfully!</p>
          <p className='text-[#9CA3AF] font-normal text-[16px]'>Your NFT has been created and added to your collection</p>
          <div className='lg:w-[510px] w-[406px] mt-8 min-h-[476px] h-auto bg-[#1F293780] rounded-[12px]  mb-6'>
          <div className="relative w-11/12 mx-auto h-[256px] mt-6">
            <Image 
              src={createdNft?.nftLogoUrl}
              alt="nft" 
              fill
              className="object-cover rounded-t-[12px]" 
            />
          </div>
          
          <div className='px-6 py-3'>
              <p className='text-[#9CA3AF] font-normal text-[14px]'>NFT Name</p>
              <p className='text-[#FFFFFF] text-[16px] fold-bold '>{createdNft?.nftName}</p>
          </div>
          <div className='px-6 py-3'>
              <p className='text-[#9CA3AF] font-normal text-[14px]'>Description</p>
              <p className='text-[#FFFFFF] text-[16px] fold-bold'>{createdNft?.nftDescription}</p>
          </div>
          <div className='px-6 py-3'>
              <p className='text-[#9CA3AF] font-normal text-[14px]'>NFT ID</p>
              <p className='text-[#8B5CF6] text-[16px] fold-bold'>{createdNft?.nftId}</p>
          </div>
         
              </div>
              <div className='flex  justify-center items-center gap-4 mb-4'>
               
                     
                     <button 
                     className='bg-[#1F293780]   text-white font-bold  flex justify-center items-center gap-2 rounded-[12px] h-[48px] lg:w-[247px] md:w-[247px] w-[195px]'>
                         <Image src='/images/share.png' width={16} height={16} />
                         <p className='text-[16px] font-normal'>Share</p>
                     </button>
                     <button 
                     onClick={() => {
                      setShowSuccessMessage(false)
                      setNftName('');
                      setNftDescription('');
                      setNftLogoUrl('');
                      
                     }
                    }
                     className='bg-gradient2 text-white font-bold  flex justify-center items-center gap-2 rounded-[12px] h-[48px] lg:w-[247px] md:w-[247px] w-[195px]'>
                         <Image src='/images/whiteLogo.png' width={16} height={16} alt="white" />
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