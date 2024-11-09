import express from "express";
import cors from "cors";
import { connectDb } from "./config/db.js";
 import foodRoute from "./routes/foodRoute.js";
import foodModel from "./models/foodModel.js";
import userRouter from "./routes/userRoute.js";
import 'dotenv/config';
import carRouter from "./routes/CartRoute.js";
import orderRoute from "./routes/OrderRoute.js";

const app=express();
const port=4000
app.use(express.json());
app.use(cors());
//db connection
connectDb();
//api endpoints
app.use("/food",foodRoute);
app.use("/images",express.static('uploads'))
app.use("/user",userRouter)
app.use("/cart",carRouter);
app.use("/order",orderRoute);
app.get("/",(req,res)=>{
    res.send("Welcome");
})
app.listen(port,()=>{console.log("Listening on port 4000")});
