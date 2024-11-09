import { deserialize } from "v8";
import foodModel from "../models/foodModel.js";
import fs from 'fs';
//add food item
const addFood=async(req,res)=>{
 let image_filename=`${req.file.filename}`;
 const food=new foodModel({
    name:req.body.name,
    description:req.body.description,
    price:req.body.price,
    category:req.body.category,
    image:image_filename
 })
 try{
    await food.save();
    res.json({success:true,message:"food added"})
 }catch(error){
   console.log({success:false,message:"failed to add food"})
 }
}
//all food list
const listfood=async(req,res)=>{
    try{
      const foods=await foodModel.find({});
      res.json({success:true,data:foods});
    }
    catch(error){
      console.log(error);
      res.json({success:false,message:"food not found"})
    }
}
//remove food
const removefood=async(req,res)=>{
   try{
     const food=await foodModel.findById(req.body.id)
     fs.unlink(`uploads/${food.image}`,()=>{
     })
     await foodModel.findByIdAndDelete(req.body.id)
     res.json({success:true,message:"food removed"})

   }
   catch(error){
    res.json({success:false,message:"error removing food"})
  

   }
}
export {addFood,listfood,removefood};
