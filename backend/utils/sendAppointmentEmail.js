import nodemailer from "nodemailer";

import fs from "fs";

import path from "path";

import handlebars from "handlebars";

import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

export const sendAppointmentEmail = async (data) => {

  try {

    // Template Path
    const templatePath = path.join(
      __dirname,
      "../emails/appointment.hbs"
    );

    // Read Template
    const source = fs.readFileSync(
      templatePath,
      "utf8"
    );

    // Compile Template
    const template = handlebars.compile(source);

    // Final HTML
    const html = template(data);

    // Transporter
    const transporter = nodemailer.createTransport({

      service: "gmail",

      auth: {

        user: process.env.EMAIL_USER,

        pass: process.env.EMAIL_PASS,

      },

    });

    // Send Email
    await transporter.sendMail({

      from:
        `"CareConnect" <${process.env.EMAIL_USER}>`,

      to: data.email,

      subject: "Appointment Booked",

      html,

    });

    console.log("Email Sent");

  } catch (error) {

    console.log(error);

  }

};


export const sendPaymentSuccessEmail = async (data) => {
  try {
    const templatePath = path.join(
      __dirname,
      "../emails/payment.hbs"
    );

    const source = fs.readFileSync(templatePath, "utf8");

    const template = handlebars.compile(source);

    const html = template(data);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"CareConnect" <${process.env.EMAIL_USER}>`,
      to: data.email,
      subject: "Payment Successful - Appointment Confirmed",
      html,
    });

    console.log("Payment Success Email Sent");
  } catch (error) {
    console.log(error);
  }
};

