// api to resiter user
import validator from "validator"
import bcrypt from "bcrypt"
import userModel from "../models/userModel.js"
import jwt from "jsonwebtoken";


const registerUser=async(req,res)=>{
    try {
        const {name,email,password}=req.body
        if(!name||!email || !password){
            return  res.status(500).json({success:false,message:"Missing details"})
        }
        if(!validator.isEmail(email)){
                return res.json({success:false,message:"Incorrect email"})
        }
        if(password.length < 5){
            return res.json({success:false,message:"enter valid paasword"})
        }
        //hash user password
        const SALT= await bcrypt.genSalt(10)
        const hashedPassword=await bcrypt.hash(password,SALT)

        const userData={
            name,email,password:hashedPassword
        }

        const newUser=new userModel(userData)
        const user =await newUser.save()

        const token=jwt.sign({id:user._id},process.env.JWT_SECRET)

        res.status(200).json({success:true,token})

    } catch (error) {
        console.log(error)
        res.status(500).json({success:false,message:error.message})
    }
}


//api for login user
const loginUser=async(req,res)=>{
    try{
        const {email,password}=req.body
        const user=await userModel.findOne({email})
        
        if(!user){
            return res.status(500).json({message:false,message:"user do not exist"})
        }
        const isMatch=await bcrypt.compare(password,user.password)
        if(isMatch){
            const token=jwt.sign({id:user._id},process.env.JWT_SECRET)
            res.json({success:true,token})
        }
        else{
            res.status(500).json({success:false,message:"Invalid Password"})
        }
    }
    catch(error){
         console.log(error)
        res.status(500).json({success:false,message:error.message})
    }
};

export {registerUser,loginUser}