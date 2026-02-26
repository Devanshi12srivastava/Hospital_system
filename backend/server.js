import express from "express"
import cors from "cors"
import dotenv from 'dotenv'
import connectDB from "./config/mongodb.js"
import connectCloudinary from "./config/cloudinary.js"
import adminRouter from "./routes/adminRoute.js"



const app= express()
const PORT=process.env.PORT || 4000
dotenv.config()
connectDB()
connectCloudinary()

// middleware

app.use(express.json())
app.use((cors()))

// api endpoint
app.use('/api/admin',adminRouter)
app.use('/api/admin/login',adminRouter)
//localhost:4000.api/admin/add-doctor




app.get('/',(req,res)=>{
res.send('working fully sucess fine good')})

app.listen(PORT,()=>console.log("server is running",PORT))