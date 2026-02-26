// api for adding doctors
import validator from "validator";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctorModel.js";
import jwt from "jsonwebtoken";

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
      available: available == "true",
      date: Date.now(),
    };

    const newDoctor = new doctorModel(doctorData);
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
      password === process.env.ADMIN_PASSWORD){

     const token = jwt.sign(email+password,process.env.JWT_SECRET)
     res.json({sucess:true,token})
   
    } else {
      res.json({ sucess: false, message: "Invalid credentials" });
    }
  } catch (error) {
    consoel.log(error);
    res.json({ success: false, message: error.message });
  }
};
export { addDoctors,loginAdmin };
