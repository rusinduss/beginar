// import mongoose from "mongoose";
// import express from "express";

// export const connectDB = async ()=>{
//     try {
//         const conn= await mongoose.connect(process.env.MONGO_URI);
//         console.log(`MongoDB connected: ${conn.connection.host}`);
//     } catch (error) {
//         console.error(`error:${error.message}`);
//         process.exit(1);
//     }
// };

import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err);
    throw err; // Let server.js handle it
  }
};
