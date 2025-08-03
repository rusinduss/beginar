import express from 'express';
import mongoose from 'mongoose';
import products from '../model/products.model.js';
const router = express.Router();
import{updateproduct,createproduct,deleteproduct, getallproduct} from '../controllers/product.controller.js';


router.get("/",getallproduct)
router.post("/",createproduct)
router.delete("/:id",deleteproduct)

router.put("/:id",updateproduct) 

export default router;