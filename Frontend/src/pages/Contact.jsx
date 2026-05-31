import React from 'react'
import { assets } from '../assets/assets/assets'
import { useNavigate } from 'react-router-dom'

const Contact = () => {
const navigate=useNavigate()
  return (
    <div className="px-4 mt-10 md:px-10 lg:px-20 py-16">

  {/* Heading */}
  <div className="text-center mb-12">
    <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 tracking-tight">
      CONTACT US
    </h2>
    <div className="w-16 h-1 bg-blue-500 mx-auto mt-2 rounded-full"></div>
  </div>

  {/* Content */}
  <div className="flex flex-col md:flex-row items-stretch gap-10">

    {/* Image (smaller now) */}
    <div className="w-full md:w-2/5">
      <img
        className="w-full h-full object-cover rounded-2xl shadow-md"
        src={assets.contact_image}
        alt=""
      />
    </div>

    {/* Info (bigger now) */}
    <div className="w-full md:w-3/5 bg-white border border-gray-100 shadow-lg rounded-2xl p-6 md:p-10 flex flex-col justify-between">

      <div>

        <h3 className="font-semibold text-2xl text-gray-800 mb-6">
          OUR OFFICE
        </h3>

        <div className="text-gray-600 text-sm md:text-base leading-relaxed space-y-5">

          <div className="flex gap-3">
            <span className="text-blue-600">📍</span>
            <p>
              Noida Sector - 63, D Block, Uttar Pradesh, India  
              <br />
              Near Tech Park & Metro Station
            </p>
          </div>

          <div className="flex gap-3">
            <span className="text-blue-600">📞</span>
            <p>+91 87677 86786 (Appointment & Support)</p>
          </div>

          <div className="flex gap-3">
            <span className="text-blue-600">✉️</span>
            <p>support@careconnect.com</p>
          </div>

          <div className="flex gap-3">
            <span className="text-blue-600">⏰</span>
            <p>Monday - Saturday: 9:00 AM - 8:00 PM</p>
          </div>

          <p className="text-gray-500 pt-4">
            We are always available to assist you with appointments, doctor consultations, and medical support. Our goal is to provide fast, reliable and patient-friendly healthcare services anytime you need.
          </p>

        </div>

      </div>

      <button onClick={() => {
              navigate('/');
              scrollTo(0, 0);
            }}className="mt-8 bg-linear-to-r from-blue-500 to-indigo-600 text-white px-7 py-3 rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200 w-fit cursor-pointer">
        Explore More
      </button>

    </div>

  </div>

</div>
  )
}

export default Contact
