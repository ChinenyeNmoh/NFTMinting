
import { Schema, model } from 'mongoose';

const nftSchema = new Schema(
  {
    nftId:{
      type: String,
      required: true
    },
    nftName: {
      type: String,
      required: true
    },
    nftDescription: {
      type: String,
      required: true
    },
    nftLogoUrl: {
      type: String,
      required: true
    },
    userWalletAddress: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

export default model('NFT', nftSchema);
