import PDFDocument from "pdfkit";
import appointmentModel from "../models/appointementModel.js";

export const downloadAppointmentPDF = async (req, res) => {
  try {
    const appointment = await appointmentModel.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ message: "Not found" });
    }

    // 🔒 Payment check
    if (!appointment.payment) {
      return res.status(403).json({ message: "Payment required" });
    }

    const doc = new PDFDocument();

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=appointment.pdf",
    );

    doc.pipe(res);

    // 🧾 HEADER
// HEADER
// HEADER
doc
  .fillColor("#2563eb")
  .fontSize(26)
  .font("Helvetica-Bold")
  .text("CareConnect", {
    align: "center",
  });

doc.moveDown(0.3);

doc
  .fillColor("#6b7280")
  .fontSize(14)
  .font("Helvetica")
  .text("Appointment Receipt", {
    align: "center",
  });

doc.moveDown(1.5);

// DIVIDER
doc
  .strokeColor("#dbeafe")
  .lineWidth(2)
  .moveTo(50, 125)
  .lineTo(550, 125)
  .stroke();

doc.moveDown(2);

// SECTION TITLE
doc
  .fillColor("#111827")
  .fontSize(17)
  .font("Helvetica-Bold")
  .text("Patient Information");

doc.moveDown(1);

// PATIENT BOX
doc
  .roundedRect(50, 170, 500, 120, 12)
  .fillAndStroke("#f9fafb", "#e5e7eb");

// PATIENT INFO
doc
  .fillColor("#374151")
  .fontSize(13)
  .font("Helvetica");

doc.text(
  `Patient Name: ${appointment.userData.name}`,
  70,
  190
);

doc.moveDown(1.2);

doc.text(
  `Doctor Name: ${appointment.docData.name}`,
  70,
  220
);

doc.moveDown(1.2);

doc.text(
  `Specialization: ${appointment.docData.speciality}`,
  70,
  250
);

// DATE FORMAT
const parts = appointment.slotDate.split("_");

const formattedDate = new Date(
  `${parts[2]}-${parts[1]}-${parts[0]}`
).toLocaleDateString("en-IN", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

doc.moveDown(5);

// APPOINTMENT SECTION
doc
  .fillColor("#111827")
  .fontSize(17)
  .font("Helvetica-Bold")
  .text("Appointment Details");

doc.moveDown(1);

// APPOINTMENT BOX
doc
  .roundedRect(50, 360, 500, 90, 12)
  .fillAndStroke("#f9fafb", "#e5e7eb");

doc
  .fillColor("#374151")
  .fontSize(13)
  .font("Helvetica")
  .text(`Date: ${formattedDate}`, 70, 385);

doc.text(
  `Time: ${appointment.slotTime}`,
  70,
  415
);

doc.moveDown(4);

// PAYMENT BOX
doc
  .roundedRect(50, 490, 500, 90, 12)
  .fillAndStroke("#eff6ff", "#bfdbfe");

doc
  .fillColor("#1d4ed8")
  .fontSize(15)
  .font("Helvetica-Bold")
  .text(
    `Amount Paid: ₹${appointment.amount}`,
    70,
    515
  );

doc.moveDown(1.2);

doc
  .fillColor("#16a34a")
  .fontSize(13)
  .font("Helvetica-Bold")
  .text("Payment Status: PAID", 70, 545);

// FOOTER
doc.moveDown(8);

doc
  .fillColor("#6b7280")
  .fontSize(11)
  .font("Helvetica")
  .text(
    "Thank you for booking your appointment!",
    {
      align: "center",
    }
  );

doc.moveDown(0.8);

doc.text(
  "Please arrive 15 minutes early with all the necessary documents.",
  {
    align: "center",
  }
);

doc.end();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
