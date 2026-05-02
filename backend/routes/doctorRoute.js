import express from "express"
import { appointmentCancel, appointmentComplete, appointmentDoctor, doctorDashboard, doctorList, doctorProfile, loginDoctor, updateDoctorProfile } from "../controllers/doctorController.js";
import authDoctor from "../middleware/authDoctor.js";


const doctorRouter=express.Router()

doctorRouter.get('/list',doctorList)
doctorRouter.post('/doctor-login',loginDoctor)
doctorRouter.get('/doctor-appointments',authDoctor,appointmentDoctor)
doctorRouter.post('/appointment-complete',authDoctor,appointmentComplete)
doctorRouter.post('/cancel-appointment',authDoctor,appointmentCancel)
doctorRouter.get('/doctor-dashboard',authDoctor,doctorDashboard)
doctorRouter.get('/doctor-profile',authDoctor,doctorProfile)
doctorRouter.post('/update-profile',authDoctor,updateDoctorProfile)

export default doctorRouter;