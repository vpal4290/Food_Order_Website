import jwt from "jsonwebtoken";
const middlware=async (req,res,next)=>{
   const {token}= req.headers;
   if(!token){
    return res.json({success:false,message:"Not authorized login"});

   }
   try{
     const decode_token=jwt.verify(token,process.env.JWT_SECRET);
     req.body.userId=decode_token.id;
     next();
   }catch(error){
    console.log(error);
    res.json({success:false,message:"Error verfying token"});
    
   }
}
export default middlware;