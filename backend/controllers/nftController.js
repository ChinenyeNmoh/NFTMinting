import NFT from '../models/nftModel.js';

// Create a new NFT (Minting)
// POST /api/nfts
const createNFT = async (req, res) => {
  try {
    const { nftName, nftDescription, nftLogoUrl, userWalletAddress } = req.body;

    // Validate input
    if (!nftName || !nftDescription || !nftLogoUrl || !userWalletAddress) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Create and save the NFT
    const nft = new NFT({
      nftName,
      nftDescription,
      nftLogoUrl,
      userWalletAddress,
    });

    const createdNFT = await nft.save();

    return res.status(201).json({
      message: 'NFT minted successfully',
      nft: createdNFT,
    });
  } catch (error) {
    console.error('Error creating NFT:', error);
    return res.status(500).json({ message: error.message || 'Internal Server Error' });
  }
};

//get nft with id

const getNFTById = async (req, res) => {
  try {
    const nftId = req.params.id;

    const nft = await NFT.findById(nftId);

    if (!nft) {
      return res.status(404).json({ message: 'NFT not found' });
    }

    return res.json({
        message: 'NFT retrieved successfully',
        nft,
 
     });
  } catch (error) {
    console.error('Error getting NFT:', error);
    return res.status(500).json({ message: error.message || 'Internal Server Error' });
  }
};

//get nft with address

const getNFTByAddress = async (req, res) => {
  try {
    const {address}= req.params;

    const nfts = await NFT.find({ userWalletAddress: address });

    if (!nfts.length) {
      return res.status(404).json({ message: 'No NFTs found for this address' });
    }

    return res.json({
        message: 'NFTs retrieved successfully',
        nfts,
 
     });
  } catch (error) {
    console.error('Error getting NFTs:', error);
    return res.status(500).json({ message: error.message || 'Internal Server Error' });
  }
};

export {createNFT, getNFTById, getNFTByAddress};

