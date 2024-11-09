import express from 'express';
import middlware from '../middlewares/auth.js';
import { placeOrder, userOrders, verifyOrder,listOrders, updateStatus } from '../controllers/OrderController.js';
const orderRoute=express.Router();
orderRoute.post("/place",middlware,placeOrder);
orderRoute.post("/verify",verifyOrder)
orderRoute.post("/userorders",middlware,userOrders)
orderRoute.get("/list",listOrders)
orderRoute.post("/status",updateStatus)

export default orderRoute;