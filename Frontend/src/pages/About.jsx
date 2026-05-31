import React from "react";
import { assets } from "../assets/assets/assets";

const About = () => {
  return (
    <div className="px-6 mt-15 md:px-10 lg:px-20">
      {/* Heading */}
      <div className="text-center pt-12">
        <p className="text-3xl font-semibold text-gray-800">
          ABOUT <span className="text-blue-600">US</span>
        </p>
      </div>

      {/* About Section */}
      <div className="my-12 flex flex-col md:flex-row gap-10 items-center">
        {/* Image */}
        <img
          className="w-full md:w-1/2 rounded-2xl shadow-md"
          src={assets.about_image}
          alt="about"
        />

        {/* Content */}
        <div className="md:w-1/2 flex flex-col gap-5 text-gray-600 leading-7">
          CareConnect is a modern healthcare platform dedicated to making
          medical services more accessible, organized, and convenient for
          everyone. We understand how difficult and time-consuming it can be to
          find the right doctor and manage appointments efficiently.
          <p>
            {" "}
            That’s why we created a smart online solution where patients can
            easily discover specialists, book appointments, and manage their
            healthcare journey from anywhere.
          </p>
          Our platform focuses on delivering a seamless experience for both
          patients and doctors by combining technology with trust. From secure
          appointment booking to real-time availability and smooth
          communication.
          <p>
            CareConnect simplifies the healthcare process while maintaining
            reliability and professionalism. We are committed to improving
            digital healthcare experiences and helping people access quality
            medical care with confidence and ease
          </p>
          <p>
            Our mission is to bridge the gap between patients and healthcare
            professionals by creating a secure and efficient online medical
            appointment system. Whether it’s finding the right specialist,
            scheduling consultations, or managing medical appointments,
            CareConnect is designed to provide convenience, transparency, and
            better healthcare experiences for both patients and doctors.
          </p>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="text-center mb-10">
        <p className="text-2xl font-semibold text-gray-800">
          Why Choose <span className="text-blue-600">Us</span>
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
        <div className="bg-white border rounded-xl p-6 shadow-sm hover:shadow-lg transition">
          <b className="text-lg text-gray-800">Efficiency</b>
          <p className="text-sm text-gray-600 mt-2">
            Our platform streamlines the entire appointment process, allowing
            patients to quickly find doctors, check availability, and book
            consultations in just a few clicks
          </p>
        </div>

        <div className="bg-white border rounded-xl p-6 shadow-sm hover:shadow-lg transition">
          <b className="text-lg text-gray-800">Convenience</b>
          <p className="text-sm text-gray-600 mt-2">
            Manage your healthcare needs anytime, anywhere. From booking
            appointments to viewing schedules, everything is accessible from a
            single easy-to-use platform.
          </p>
        </div>

        <div className="bg-white border rounded-xl p-6 shadow-sm hover:shadow-lg transition">
          <b className="text-lg text-gray-800">Personalization</b>
          <p className="text-sm text-gray-600 mt-2">
            Get tailored healthcare experiences based on your needs, with access
            to the right specialists and customized appointment management for
            better care.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
