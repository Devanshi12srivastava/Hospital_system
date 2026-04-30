import express from 'express';
import { addDoctors, adminDashboard, allDoctors, appointmentAdmin, appointmentsCancel, loginAdmin } from '../controllers/adminController.js'
import upload from '../middleware/multer.js';
import authAdmin from '../middleware/authmiddleware..js';
import { changeAvailability } from '../controllers/doctorController.js';


const adminRouter = express.Router()

adminRouter.post('/add-doctor',authAdmin,upload.single('single'),addDoctors)
adminRouter.post('/login',loginAdmin)
adminRouter.get('/all-doctors',authAdmin,allDoctors)

adminRouter.post('/change-available',authAdmin,changeAvailability)
adminRouter.get('/all-appointments',authAdmin,appointmentAdmin)
adminRouter.post('/cancel-appointment',authAdmin,appointmentsCancel)
adminRouter.get('/dashboard',authAdmin,adminDashboard)
export default adminRouter;