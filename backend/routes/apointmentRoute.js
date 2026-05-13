import express from "express";
import { downloadAppointmentPDF } from "../controllers/appointmentPdfController.js";

const appointmentRouter = express.Router();

appointmentRouter.get("/pdf/:id", downloadAppointmentPDF);

export default appointmentRouter;