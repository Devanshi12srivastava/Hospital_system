import doctorModel from "../models/doctorModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import appointmentModel from "../models/appointementModel.js";
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

const doctorList = async (req, res) => {
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

const loginDoctor = async (req, res) => {
  try {
    const { email, password } = req.body;
    const doctor = await doctorModel.findOne({ email });
    if (!doctor) {
      return res.status(500).json({
        success: false,
        message: "Doctor doesnot exist with this mail Id",
      });
    }
    const isMatch = await bcrypt.compare(password, doctor.password);
    if (isMatch) {
      const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.status(500).json({
        success: false,
        message: "Doctor email doesnot exist with this password",
      });
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
};

//api for appointment for doctor page

const appointmentDoctor = async (req, res) => {
  try {
    const docId = req.docId;
    const appointments = await appointmentModel.find({ docId });
    if (!appointments) {
      res
        .status(500)
        .json({ success: false, message: "Not any appointment with this id" });
    }
    res.status(200).json({ success: true, appointments });
  } catch (error) {
    {
      console.log(error);
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
};

//api to mark apapointment compaleted for doctor panel

const appointmentComplete = async (req, res) => {
  try {
    const docId = req.docId;
    const { appointmentId } = req.body || {};

    const appointmentData = await appointmentModel.findById(appointmentId);

    // ✅ BAS YE ADD KARO
    if (!appointmentData) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    if (appointmentData.docId.toString() === docId) {
      await appointmentModel.findByIdAndUpdate(appointmentId, {
        isCompleted: true,
      });
      return res.status(200).json({
        success: true,
        message: "Appointment completed",
      });
    } else {
      return res.status(403).json({
        success: false,
        message: "Appointment mark failed",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
//cancel
const appointmentCancel = async (req, res) => {
  try {
    console.log("CANCEL API HIT");

    const docId = req.docId;
    const { appointmentId } = req.body || {};
    console.log("BODY:", req.body);
    console.log("APPOINTMENT ID:", appointmentId);
    const appointmentData = await appointmentModel.findById(appointmentId);

    if (!appointmentData) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }
    if (appointmentData.docId.toString() === docId) {
      await appointmentModel.findByIdAndUpdate(appointmentId, {
        cancelled: true,
      });
      return res
        .status(200)
        .json({ success: true, message: "Appointment cancelled" });
    } else {
      return res.status(403).json({ success: false, message: "cancel fail" });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// api to get dashboard data for doctor panel
const doctorDashboard = async (req, res) => {
  try {
    const docId = req.docId;

    const appointments = await appointmentModel.find({ docId });
    console.log("docId:", docId);
    console.log("appointments:", appointments);
    let earnings = 0;
    appointments.map((item) => {
      if (item.isCompleted || item.payment) {
        earnings += item.amount;
      }
    });
    let patients = [];
    appointments.map((item) => {
      if (!patients.includes(item.userId)) {
        patients.push(item.userId);
      }
    });
    const dashData = {
      earnings,
      appointments: appointments.length,
      patients: patients.length,
      latestAppointments: appointments.reverse().slice(0, 7),
    };
    res.status(200).json({ success: true, dashData });
  } catch (error) {
    {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
};

//api to get doctor profile for doctor panel

const doctorProfile = async (req, res) => {
  try {
    const docId = req.docId;
    const profileData=await doctorModel.findById((docId)).select('-password')

    res.status(200).json({success:true,profileData})
  } catch (error) {
    {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
};

//api to get update doctor profile for doctor panel

const updateDoctorProfile = async(req,res)=>{
  try {
    const docId=req.docId;
    const {fees,address,available} = req.body
    const updateProfile= await doctorModel.findByIdAndUpdate(docId,{fees,address,available})
    res.status(200).json({success:true,updateProfile})
  } catch (error) {
    {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
}
export {
  changeAvailability,
  doctorList,
  loginDoctor,
  appointmentDoctor,
  appointmentComplete,
  appointmentCancel,
  doctorDashboard,
  doctorProfile,
  updateDoctorProfile
};
