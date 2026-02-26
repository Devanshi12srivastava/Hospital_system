import jwt from "jsonwebtoken"

//admin auth middleware

const authAdmin=async(req,res,next)=>{
    try {
        
    const {admintoken}= req.headers
    if(!admintoken){
        return res.json({success:false,message:"Not Authorized"})
    }
    const tokenDecode=jwt.verify(admintoken,process.env.JWT_SECRET)

    if(tokenDecode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD){
        return res.json({success:false,message:"Not Authorized"})
    }
    next()
    
    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
}
export default authAdmin