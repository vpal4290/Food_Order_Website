import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";
const stripe=new Stripe(process.env.STRIPE_SECRET_KEY)

const placeOrder=async (req,res)=>{
    const frontend_url="http://localhost:5173"
    try{
      const newOrder=new orderModel({
        userId:req.body.userId,
        items:req.body.items,
        amount:req.body.amount,
        address:req.body.address
      })
      await newOrder.save();
      await userModel.findByIdAndUpdate(req.body.userId,{cartData:{}});
      const line_item=req.body.items.map((item)=>({
         price_data:{
            currency:"INR",
            product_data:{
                name:item.name
            },
            unit_amount:item.price*100

         },
         quantity:item.quantity
      }))
      line_item.push({
        price_data:{
            currency:"INR",
            product_data:{
                name:"Delivery charges",
            },
            unit_amount:1
        },
        quantity:1
      })
      const session=await stripe.checkout.sessions.create({
        line_items:line_item,
        mode:'payment',
        success_url:`${frontend_url}/verify?success=true&order_id=${newOrder._id}`,
        cancel_url:`${frontend_url}/verify?success=false&order_id=${newOrder._id}`,
      })
      res.json({success:true,session_url:session.url})
    }catch(error){
     console.log(error);
     res.json({success:false,message:"Payment Error"})
    }
}
const verifyOrder=async (req,res)=>{
   const {orderId,success}=req.body;
   try{
    if(success=="true"){
        await orderModel.findByIdAndUpdate(orderId,{payment:true});
        res.json({success:true,message:"Paid"})
    }
    else{
        await orderModel.findByIdAndDelete(orderId);
        res.json({success:false,message:"Not Paid"})
    }
   }catch(error){
    console.log(error);
    res.json({success:false,message:"Error"})
   }
}
const userOrders=async (req,res)=>{
 try{
   const orders=await orderModel.find({userId:req.body.userId});
   res.json({success:true,data:orders})
 }
 catch(error){
  console.log(error);
  res.json({success:false,message:"Error"})
 }
}
//list orders for admin panel
const listOrders=async(req,res)=>{
try{
   const orders=await orderModel.find({});
   res.json({success:true,data:orders})
}catch(error){
  console.log(error);
  res.json({success:false,message:"Error"})
}
}
const updateStatus=async(req,res)=>{
   try{
     await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status})
     res.json({success:true,message:"Status Updated"})

   }catch(error){
    console.log(error);
    res.json({success:false,message:"Error"})

   }
}

export {placeOrder,verifyOrder,userOrders,listOrders,updateStatus}