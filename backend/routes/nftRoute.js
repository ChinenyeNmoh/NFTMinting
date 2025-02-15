import {createNFT, getNFTById, getNFTByAddress} from '../controllers/nftController.js';
import express from 'express';
const router = express.Router();
import { validateId } from '../middlewares/errorMiddleware.js';

//routes

router.post('/create', createNFT);
router.get('/:id',validateId, getNFTById);
router.get(':address', getNFTByAddress);

export default router;