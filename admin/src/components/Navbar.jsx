import React from 'react'
import {assets} from "../assets/assets_admin/assets"
import { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { useNavigate } from 'react-router-dom'
const Navbar = () => {

  const {adminToken,setAdminToken}=useContext(AdminContext)
const navigate= useNavigate()

  const logout =()=>{
    navigate('/')
    adminToken && setAdminToken('')
    adminToken && localStorage.getItem('AdminToken')
  }

  return (
    <div className="flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white">
      <div className='flex items-center gap-2 text-sm'>
        <img src={assets.admin_logo} alt=""/> 
        <p>{adminToken ? 'Admin':'Doctor'}</p>
      </div>
      <button onClick={logout} className='bg-blue-600 text-white text-sm px-10 py-2 rounded-2xl'>Logout</button>
    </div>
  )
}

export default Navbar
