// api for adding doctors
import validator from "validator";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctorModel.js";
import jwt from "jsonwebtoken";
import appointmentModel from "../models/appointementModel.js";
import userModel from "../models/userModel.js";

const addDoctors = async (req, res) => {
  console.log("BODY:", req.body);
  console.log("FILE:", req.file);

  try {
    //console.log(req.body)
    const {
      name,
      email,
      password,
      speciality,
      degree,
      experience,
      about,
      fees,
      address,
      available,
    } = req.body;

    const imageFile = req.file;

    if (
      !name ||
      !email ||
      !password ||
      !speciality ||
      !degree ||
      !experience ||
      !about ||
      !fees
    ) {
      return res.json({
        success: false,
        message: "missing some details",
      });
    }
    //validating
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "enter validate email",
      });
    }
    if (password.length < 5) {
      return res.json({
        success: false,
        message: "please enter a valid password",
      });
    }
    const existingDoctor = await doctorModel.findOne({ email });

    if (existingDoctor) {
      return res.json({
        success: false,
        message: "Doctor already exists",
      });
    }
    //hash password
    const SALT = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, SALT);

    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });
    const imageUrl = imageUpload.secure_url;

    const doctorData = {
      name,
      email,
      image: imageUrl,
      password: hashedPass,
      speciality,
      degree,
      experience,
      about,
      fees,
      address,
     available: JSON.parse(available),
      date: Date.now(),
    };

    const newDoctor = new doctorModel(doctorData); // or await doctorModel.create(doctorData);
    await newDoctor.save();

    console.log(
      {
        name,
        email,
        password,
        speciality,
        degree,
        experience,
        about,
        fees,
        address,
      },
      imageFile,
    );

    res.status(200).json({ success: true, message: "Doctor Added" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "failed to add" });
  }
};

//api  for admin login
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign({ email: email }, process.env.JWT_SECRET, {
        expiresIn: "2d",
      });
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//api for all doctors list
const allDoctors = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select("-password");
    res.status(200).json({ success: true, doctors });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

//API to get appointments list
const appointmentAdmin=async(req,res)=>{
try{
const appointment=await appointmentModel.find({})
res.json({success:true,appointment})
}
catch(error){
 console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }

}

// api for cancel appointment

const appointmentsCancel = async (req, res) => {
  try {
    const { appointmentId } = req.body;
   
    const appointmentsData = await appointmentModel.findById(appointmentId);
    
    await appointmentModel.findByIdAndUpdate(appointmentId, {
      cancelled: true,
    });

    //freeing docter slot
    const { docId, slotDate, slotTime } = appointmentsData;
    const doctorData = await doctorModel.findById(docId);
    let slots_booked = doctorData.slots_booked;
    slots_booked[slotDate] = slots_booked[slotDate].filter(
      (e) => e !== slotTime,
    );

    await doctorModel.findByIdAndUpdate(docId, { slots_booked });

    res.json({ success: true, message: "appointment cancelled" });
    {
      userId;
    }
    req.userId;
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
//apt to get dashboard data for admin

const adminDashboard=async(req,res)=>{
  try {
    const doctors=await doctorModel.find({})
    const users=await userModel.find({})
    const appointments=await appointmentModel.find({})
    const dashData={
      doctors:doctors.length,
      appointments:appointments.length,
      patients:users.length,
      latestAppointments:appointments.reverse().slice(0,7)
    }
    res.status(200).json({success:true,dashData})
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
  
}

export { addDoctors, loginAdmin, allDoctors,appointmentAdmin,appointmentsCancel,adminDashboard };
