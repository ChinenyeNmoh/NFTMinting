import {createNFT, getNFTById, getNFTByAddress} from '../controllers/nftController.js';
import express from 'express';
const router = express.Router();


//routes
router.get('/:id', getNFTById);
router.get('/get/:address', getNFTByAddress);
router.post('/create', createNFT);



export default router;