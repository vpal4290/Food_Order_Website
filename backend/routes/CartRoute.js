import express from 'express';
import { addtoCart,removefromCart,getCart } from '../controllers/CartController.js';
import middlware from '../middlewares/auth.js';
const carRouter=express.Router();
carRouter.post("/add",middlware,addtoCart);
carRouter.post("/remove",middlware,removefromCart);
carRouter.get("/getcart",middlware,getCart);
export default carRouter;


