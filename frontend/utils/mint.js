import abi from './abi.json';
import { createPublicClient, createWalletClient, http } from "viem";
import { sepolia } from "viem/chains";
import { toast } from 'react-toastify';
import axios from 'axios';



// Smart contract address on Sepolia
export const contractAddress = "0x743f49311a82fe72eb474c44e78da2a6e0ae951c";

// Create a Viem client to interact with the smart contract (for reading)
const client = createPublicClient({
  chain: sepolia,
  transport: http(),
});

// Function to check if an NFT ID exists
export async function checkNftId(tokenId) {
  try {
    // Convert tokenId to BigInt to match uint256 in Solidity
    const id = BigInt(tokenId);

    // Call the smart contract function
    const exists = await client.readContract({
      address: contractAddress,
      abi,
      functionName: "checkId",
      args: [id], // Pass tokenId as BigInt
    });

    console.log("NFT ID exists:", exists);
    return exists;
  } catch (error) {
    console.error("Error checking NFT ID:", error);
    toast.error("Error checking NFT ID: " + error.message);
    return false; // Assume not exists if there's an error
  }
}


//fetch nft by address
export async function fetchNftByAddress(address) {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/nfts/get/${address}`);
    return res.data.nft;
  } catch (error) {
    console.error("Error fetching NFTs by address:", error);
    toast.error("Error fetching NFTs by address: " + error.message);
    return [];
  }
}

//fetch nft by id

export async function fetchNftById(id) {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/nfts/${id}`);
    
    return res?.data?.nft;
  } catch (error) {
    console.error("Error fetching NFT by ID:", error);
    
    return null;
  }
}