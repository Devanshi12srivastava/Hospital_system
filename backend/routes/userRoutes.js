import express from "express"
import { getProfileData, loginUser, registerUser, userProfileUpdate } from "../controllers/userController.js"
import authuser from "../middleware/authuser.js"
import upload from "../middleware/multer.js"



const userRouter=express.Router()
userRouter.post('/register-user',registerUser)
userRouter.post('/login-user',loginUser)
userRouter.get('/get-profile',authuser,getProfileData)
userRouter.post('/update-profile',upload.single('image'),authuser,userProfileUpdate)
export default userRouter