import doctorModel from "../models/doctorModel.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
const changeAvailability = async (req, res) => {
  try {
    const { docId } = req.body; // ✅ match frontend

    const docData = await doctorModel.findById(docId);

    if (!docData) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    await doctorModel.findByIdAndUpdate(docId, {
      available: !docData.available,
    });

    res.status(200).json({
      success: true,
      message: "Availability Changed",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//all doctor list for frontend

const doctorList = async (req,res) => {
  try {
    const doctors = await doctorModel.find({}).select(["-password", "-email"]);
    res.status(200).json({ success: true, doctors });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//doctor login

const loginDoctor=async(req,res)=>{
try {
  const {email,password} = req.body
  const doctor = await doctorModel.findOne({email})
  if(!doctor){
    return res.status(500).json({success:false,message:"Doctor doesnot exist with this mail Id"})
  }
  const isMatch= await bcrypt.compare(password,doctor.password)
  if(isMatch){
    const token= jwt.sign({id:doctor._id},process.env.JWT_SECRET)
    res.json({success:true,token})
  }
  else{
     res.status(500).json({success:false,message:"Doctor email doesnot exist with this password"})
  }
} catch (error) {
   {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
}
export { changeAvailability, doctorList,loginDoctor };
