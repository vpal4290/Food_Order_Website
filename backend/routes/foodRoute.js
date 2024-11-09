import express from 'express';
import { addFood, listfood, removefood } from '../controllers/foodController.js';
import multer from 'multer';
const foodRoute=express.Router();

const storage=multer.diskStorage({
    destination:"uploads",
    filename:(req,file,cb)=>{
        return cb(null,`${Date.now()}${file.originalname}`);

    }
})
const upload=multer({
    storage:storage
})

foodRoute.post("/add",upload.single("image"),addFood)
foodRoute.get("/list",listfood)
foodRoute.post("/remove",removefood);

export default foodRoute;

