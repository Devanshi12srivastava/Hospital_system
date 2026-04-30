import React from 'react'
import { assets } from '../assets/assets/assets'

const Header = () => {
  return (
    <div className='flex flex-col md:flex-row flex-wrap bg-blue-900'>
      {/*....left...*/}
      <div className='md:w-1/3 flex flex-col items-start justify-center gap-4 py-10 px-8 m-auto'>
        <p className='text-3xl md:text-4xl lg-text-5xl font-semibold text-white -mx-60'>Book Appointment<br/>
        With Trusted Doctors</p>
      
      <div className='flex flex-col md:flex-row items-center gap-3 text-white font-semibold'>
        <img className="w-28" src={assets.group_profiles}/>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Optio quisquam voluptatem <br className='hidden sm:block'/>
        fuga minima illum! Nihil ducimus vel quaerat. Exercitationem autem nihil adipisci nobis velit hic quae consequuntur illo dolore necessitatibus!</p>
      </div>
      <a href="#speciality " className='flex items-center gap-2 px-6 py-3 rounded-4xl shadow-lg  bg-white text-gray-700 text-sm font-medium m-auto md:0 hover:scale-105 transition-all duration-300'>Book Appoinment <img className='w-3' src={assets.arrow_icon} alt=""/></a>
    </div>
     {/*....right...*/}
    <div className='md:w-1/3 relative'>
        <img className="w-md md:absolute bottom-0 rounded-lg" src={assets.header_img} alt=""/>
    </div>
    </div>
  )
}

export default Header
