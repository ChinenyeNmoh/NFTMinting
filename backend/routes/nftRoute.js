import {createNFT, getNFTById, getNFTByAddress} from '../controllers/nftController.js';
import express from 'express';
const router = express.Router();


//routes

router.post('/create', createNFT);
router.get('/:address', getNFTByAddress);
router.get('/:id', getNFTById);


export default router;