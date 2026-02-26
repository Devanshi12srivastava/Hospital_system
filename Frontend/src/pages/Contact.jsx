import React from 'react'
import { assets } from '../assets/assets/assets'

const Contact = () => {

  return (
    <div>
     <div className='text-center text-2xl text-gray-700 mt-12 font-medium'>
      <p>CONTACT US</p>
     </div>
     <div className='my-11 flex flex-col justify-center md:flex-row gap-10 mb-25 text-sm'>
      <img className="w-full md:w-90" src={assets.contact_image} alt=""/>
      <div className='felx felx-col justify-center items-start gap-6'>
       
        <p className='font-semibold text-lg text-gray-700'>OUR OFFICE</p>
        <p className='text-gray-600 mt-2'>noida sector -63 D-block</p>
        <p className='text-gray-600 mt-2'>8767786786786</p>
         <p className='text-gray-600 mt-2'>yhuhjn@gmail.com</p>
         <p className='text-gray-600 mt-2'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla eaque error atque rem sequi dicta quibusdam delectus modi doloremque quia, laboriosam officia ea dolorem nihil aperiam</p>
         <button className='bg-blue-400 px-5 py-3 mt-10 text-white border border-gray-600 text-sm font-medium'>Explore</button>
      </div>
     </div>
    </div>
  )
}

export default Contact
