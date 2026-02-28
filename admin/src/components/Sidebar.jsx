import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets_admin/assets'

const Sidebar = () => {


const {adminToken} = useContext(AdminContext)

  return (
    <>
    <div className='min-h-screen w-72 bg-white py-9'>
   {
    adminToken && <ul className='text-zinc-800 mt-5'>
      <NavLink className={({isActive})=>`flex items-center gap-3 py-3 px-7  md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-blue-400 px-5 border-r-4 border-blue-400':""}`} to={'/admin-dashboard'} >
        <img src={assets.home_icon} alt=""/>
        <p>Dashboard</p>
      </NavLink>

       <NavLink className={({isActive})=>`flex items-center gap-3 py-3 px-7 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-blue-400 border-r-4 border-blue-400':""}`} to={'/all-appointment'}>
        <img src={assets.appointment_icon} alt=""/>
        <p>Appointments</p>
      </NavLink>

       <NavLink className={({isActive})=>`flex items-center gap-3 py-3 px-7 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-blue-400 border-r-4 border-blue-400':""}`} to={"/add-doctor"}>
        <img src={assets.add_icon} alt=""/>
        <p>Add Doctor</p>
      </NavLink>

       <NavLink  className={({isActive})=>`flex items-center gap-3 py-3 px-7 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-blue-400 border-r-4 border-blue-500':""}`}to={'/doctor-list'} >
        <img src={assets.people_icon} alt=""/>
        <p>Doctors List</p>
      </NavLink>

    </ul>
   }
    </div>
      </>
  )

}

export default Sidebar
