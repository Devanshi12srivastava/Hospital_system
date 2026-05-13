import dotenv from 'dotenv'
dotenv.config()
import express from "express"
import cors from "cors"
import connectDB from "./config/mongodb.js"
import connectCloudinary from "./config/cloudinary.js"
import adminRouter from "./routes/adminRoute.js"
import doctorRouter from './routes/doctorRoute.js'
import userRouter from './routes/userRoutes.js'
import chatRouter from './routes/chatRoute.js'
import appointmentRouter from './routes/apointmentRoute.js'
 

const app= express()
const PORT=process.env.PORT || 4000

connectDB()
connectCloudinary()

// middleware
console.log("=== ENV DEBUG START ===");
console.log("API KEY LOADED:", process.env.GEMINI_API_KEY ? "YES" : "NO");
// console.log("RAZORPAY_KEY_ID:", process.env.RAZORPAY_KEY_ID);
// console.log("RAZORPAY_KEY_SECRET:", process.env.RAZORPAY_KEY_SECRET);
// console.log("CURRENCY:", process.env.CURRENCY);
// console.log("JWT_SECRET:", process.env.JWT_SECRET);
// console.log("DB:", process.env.MONGODB_URL);

console.log("=== ENV DEBUG END ===");
app.use(express.json())
app.use((cors()))

// api endpoint
app.use('/api/admin',adminRouter)
app.use('/api/admin/login',adminRouter)
app.use('/api/doctor',doctorRouter)
app.use('/api/user',userRouter)
app.use("/api/chat", chatRouter);
app.use("/api/appointment",appointmentRouter)

app.get('/',(req,res)=>{
res.send('working fully sucess fine good')})
app.get("/models", async (req, res) => {
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1/models?key=${process.env.GEMINI_API_KEY}`
  );

  const data = await response.json();
  res.json(data);
});
app.listen(PORT,()=>console.log("server is running",PORT))