import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import product from './model/products.model.js';
import productsroutes from './routes/products.routes.js'
import path from "path";

dotenv.config();
const app= express();
const PORT=process.env.PORT || 5000;



app.use(express.json());//allows us to accept json data to req.body

app.use("/api/products",productsroutes);

//configuration for the deployment
const __dirname = path.resolve();
if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "/frontend/dist")));//to make dist folder as static assest
    
    app.get("*", (req,res)=>{
         console.log("Catch-all route triggered: ", req.url);
        res.sendFile(path.resolve(__dirname,"frontend","dist","index.html"));
    });
}
console.log(process.env.MONGO_URI)
connectDB();
app.listen(PORT,()=>{
    

    console.log("server started at http://localhost:" +PORT);
}
);

