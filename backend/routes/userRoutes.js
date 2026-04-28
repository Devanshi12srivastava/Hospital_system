import express from "express"
import { bookAppointment, cancelappointments, getProfileData, loginUser, myAppointement, paymentRazorpay, registerUser, userProfileUpdate } from "../controllers/userController.js"
import authuser from "../middleware/authuser.js"
import upload from "../middleware/multer.js"
import { verifyPayment } from "../controllers/userController.js"


const userRouter=express.Router()
userRouter.post('/register-user',registerUser)
userRouter.post('/login-user',loginUser)
userRouter.get('/get-profile',authuser,getProfileData)
userRouter.post('/update-profile',upload.single('image'),authuser,userProfileUpdate)
userRouter.post('/book-appointment',authuser,bookAppointment)
userRouter.get('/appointments',authuser,myAppointement)
userRouter.post('/cancel-appointment',authuser,cancelappointments)
userRouter.post('/payment-razorpay',authuser,paymentRazorpay)
userRouter.post('/verifyRazorpay',authuser,verifyPayment)
export default userRouter