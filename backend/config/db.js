import mongoose, { connect } from "mongoose";
export const connectDb=async()=>{
    await mongoose.connect('mongodb+srv://akash12:root@cluster0.sesrgla.mongodb.net/foodwebsite').then(()=>{console.log("Db connected")});

}