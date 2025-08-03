import products from "../model/products.model.js";
import mongoose from 'mongoose';


export const createproduct = async(req,res)=>{
    const product = req.body;

    if(!product.name||!product.price||!product.image){
        return res.status(400).json({success:false, message:"please provide all details"});

    }
    const newProduct= new products(product)

    try {
        await newProduct.save();
        res.status(201).json({success:true, message:"product added", data:newProduct})
    } catch (error) {
        console.error("error creating product",error.message);
        res.status(500).json({success:false, message:"server error"});
    }
};

export const deleteproduct =  async(req,res)=>{
   const {id}=req.params;
     if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(404).json({success:false,message:"product not found"})
    }
   try {
    await products.findByIdAndDelete(id);
    res.status(200).json({success:true,message:"product deleted"});
    
   } catch (error) {
    console.error("error deleteing product",error.message);
    res.status(500).json({success:false, message:"server error"});
   }
};

export const updateproduct = async(req,res)=>{
    const{id}=req.params;
    const product =req.body;
    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(404).json({success:false,message:"id not found"})
    }
    try {
      const updatedproduct = await products.findByIdAndUpdate(id,product,{new:true});
      res.status(200).json({success:true, message: "product updated",data: updatedproduct});
    } catch (error) {
    res.status(500).json({success:false,message:"server error"})
    }
};

export const getallproduct = async (req,res)=>{

try {
    const product= await products.find({})
    res.status(200).json({success:true, data:product})
} catch (error) {
    console.log("error fetching data",error.message);
    res.status(500).json({success:false,message:"server error"})
}

};