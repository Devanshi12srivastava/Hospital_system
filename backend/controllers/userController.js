// api to resiter user
import validator from "validator";
import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctorModel.js";
import appointmentModel from "../models/appointementModel.js";
import getRazorpayInstance from "../config/razorpay.js";

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res
        .status(500)
        .json({ success: false, message: "Missing details" });
    }
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Incorrect email" });
    }
    if (password.length < 5) {
      return res.json({ success: false, message: "enter valid paasword" });
    }
    //hash user password
    const SALT = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, SALT);

    const userData = {
      name,
      email,
      password: hashedPassword,
    };

    const newUser = new userModel(userData);
    const user = await newUser.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.status(200).json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

//api for login user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
      return res
        .status(500)
        .json({ message: false, message: "user do not exist" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.status(500).json({ success: false, message: "Invalid Password" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

//api to get userProfileData

const getProfileData = async (req, res) => {
  try {
    const userData = await userModel.findById(req.userId).select("-password");

    res.json({
      success: true,
      userData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

//api for update
const userProfileUpdate = async (req, res) => {
  try {
    const userId = req.userId;
    const { name, phone, address, dob } = req.body;
    const user = await userModel.findById(userId);
    console.log("user", user);
    const imageFile = req.file;
    console.log("body", req.body);
    if (!name || !phone || !dob || !address) {
      return res.json({ success: false, messag: "Data missing" });
    }
    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      { name, phone, address, dob },
      { new: true },
    );
    console.log("updates", updatedUser);
    if (imageFile) {
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image",
      });
      const imageURL = imageUpload.secure_url;

      await userModel.findByIdAndUpdate(userId, { image: imageURL });
    }
    res.json({ success: true, message: "profile updated" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
//book appointemnet api

const bookAppointment = async (req, res) => {
  try {
    const { docId, slotDate, slotTime } = req.body;
    const userId = req.userId;
    console.log(slotTime);
    console.log(req.body.slotTime);
    if (!userId)
      return res
        .status(401)
        .json({ success: false, message: "User not found" });

    const docData = await doctorModel.findById(docId).select("-password");
    if (!docData.available) {
      return res.json({ success: false, message: "doctor not available" });
    }
    let slots_booked = docData.slots_booked;
    //slots availablity
    if (slots_booked[slotDate]) {
      if (slots_booked[slotDate].includes(slotTime)) {
        return res.json({ success: false, message: "slot not available" });
      } else {
        slots_booked[slotDate].push(slotTime);
      }
    } else {
      slots_booked[slotDate] = [];
      slots_booked[slotDate].push(slotTime);
    }
    const userData = await userModel.findById(userId).select("-password");
    delete docData.slots_booked;

    const appointmentData = {
      userId,
      docId,
      userData,
      docData,
      amount: docData.fees,
      slotTime,
      slotDate,
      date: Date.now(),
    };

    const newAppointment = new appointmentModel(appointmentData);
    const saved = await newAppointment.save();
    console.log("SAVED DOC:", saved);
    //save new slot data in docData

    await doctorModel.findByIdAndUpdate(docId, { slots_booked });
    res.json({ success: true, message: "appointmnet booked" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

//api to get user apointment for frontend

const myAppointement = async (req, res) => {
  try {
    const userId = req.userId;
    const appointmentList = await appointmentModel.find({ userId });
    res.json({ success: true, appointmentList });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// cancel sppointments
const cancelappointments = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    const userId = req.userId;
    const appointmentsData = await appointmentModel.findById(appointmentId);
    if (appointmentsData.userId !== userId) {
      return res.json({ success: false, message: "not authorized" });
    }
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

console.log("KEY_ID:", process.env.RAZORPAY_KEY_ID);
console.log("SECRET:", process.env.RAZORPAY_KEY_SECRET);

//payment


const paymentRazorpay = async (req, res) => {
  try {
    const { appointmentId } = req.body;

    const appointmentData = await appointmentModel.findById(appointmentId);

    if (!appointmentData || appointmentData.cancelled) {
      return res.json({
        success: false,
        message: "Appointment Cancelled or not found",
      });
    }
 const razorpayInstance = getRazorpayInstance();
    const options = {
      amount: appointmentData.amount * 100,
      currency: process.env.CURRENCY,
      receipt: appointmentId,
    };

  const order = await razorpayInstance.orders.create(options);

    res.json({ success: true, order });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
//apit o verify payment

const verifyPayment = async (req, res) => {
  console.log("BODY:", req.body);
  try {
    const razorpayInstance = getRazorpayInstance(); 
    const { razorpay_order_id } = req.body;

    if (!razorpay_order_id) {
      return res.json({ success: false, message: "order id missing" });
    }

    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);

    console.log(orderInfo)
  if (orderInfo.status === "paid") {
      await appointmentModel.findByIdAndUpdate(orderInfo.receipt, {
        payment: true,
      });

      return res.status(200).json({
        success: true,
        message: "Payment Successful",
      });
    }

    return res.status(200).json({
      success: false,
      message: "Payment Failed",
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
export {
  registerUser,
  loginUser,
  getProfileData,
  userProfileUpdate,
  bookAppointment,
  myAppointement,
  cancelappointments,paymentRazorpay,verifyPayment
};
