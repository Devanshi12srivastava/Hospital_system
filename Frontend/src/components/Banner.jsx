import React from 'react'
import { assets } from '../assets/assets/assets'
import { useNavigate } from 'react-router-dom'

const Banner = () => {
    const navigate=useNavigate()
  return (
    <>
  <div className="my-20 mx-4 md:mx-12">

  <div className="relative flex flex-col md:flex-row items-center justify-between rounded-3xl overflow-hidden border border-gray-100 shadow-xl bg-gradient-to-br from-white via-blue-50 to-indigo-50 px-6 sm:px-10 md:px-14 lg:px-16">

    {/* soft background blur blobs */}
    <div className="absolute -top-20 -left-20 w-72 h-72 bg-blue-200 opacity-30 blur-3xl rounded-full"></div>
    <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-indigo-200 opacity-30 blur-3xl rounded-full"></div>

    {/* Left Content */}
    <div className="flex-1 py-12 md:py-20 relative z-10">

      <h1 className="text-gray-900 font-semibold text-3xl sm:text-4xl lg:text-5xl leading-tight">
        Book Your <span className="text-blue-600">Appointment</span>
      </h1>

      <p className="mt-4 text-gray-600 text-base sm:text-lg max-w-md">
        Connect with 150+ trusted doctors and get instant consultation anytime, anywhere.
      </p>

      <button
        onClick={() => { navigate("/login"); scrollTo(0, 0); }}
        className="mt-8 bg-linear-to-r from-blue-500 to-indigo-600 text-white px-8 py-3 rounded-full shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300"
      >
        Get Started
      </button>

    </div>

    {/* Right Image */}
    <div className="hidden md:flex flex-1 justify-end relative z-10">

      <div className="relative max-w-md">

        <img
          src={assets.appointment_img}
          alt="doctor"
          className="w-full object-contain drop-shadow-2xl transition-transform duration-500 hover:scale-105"
        />

      </div>

    </div>

  </div>

</div>
    </>
  )
}

export default Banner
