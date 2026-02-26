import React from 'react'
import { assets } from '../assets/assets/assets'
import { useNavigate } from 'react-router-dom'

const Banner = () => {
    const navigate=useNavigate()
  return (
    <>
    <div className='flex bg-[#9E1C60] rounded px-6 sm:px-10 md:px-10 lg:px-10 my-20 md:mx-12'>
    <div className='flex-1 py-8 sm:py-10 md:py-16 lg:py-24 lg:pl:5'>
      <div className='text-xl sm:text-2xl md:text-3xl lg:text-5xl'>
        <h1 className='text-white font-medium text-xl'>Book Appointment</h1>
        <h1 className='mt-4 text-white font-medium'>With 150+ Trusted doctors</h1>
      </div>
      <button onClick={()=>{navigate("/login");scrollTo(0,0)}} className='bg-white text-lg sm:text-base text-gray-400 px-8 py-3 rounded-full mt-6 cursor-pointer'>Create Account</button>
    </div>

    <div className='hidden md:block md:w-1/2 lg:w-92.5 relative'>
        <img className='w-full absolute bottom-0 right-0 max-w-md' src={assets.appointment_img} alt=""/>
        
    </div>
    </div>
    </>
  )
}

export default Banner
