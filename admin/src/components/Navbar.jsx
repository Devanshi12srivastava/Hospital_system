import React from 'react'
import {assets} from "../assets/assets_admin/assets"
import { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { NavLink, useNavigate } from 'react-router-dom'
import { DoctorContext } from '../context/DoctorContaext'
import { Menu } from 'lucide-react'
import { useState } from 'react'
const Navbar = () => {
const [open, setOpen] = useState(false);
  const {adminToken,setAdminToken}=useContext(AdminContext)
  const {dToken,setDToken} = useContext(DoctorContext)
const navigate= useNavigate()

  const logout = () => {

  navigate("/");

  if (adminToken) {
    setAdminToken("");
    localStorage.removeItem("AdminToken");
  }

  if (dToken) {
    setDToken("");
    localStorage.removeItem("dToken");
  }
};
 return (
 <header className="fixed top-0 left-0 w-full z-50 border-b border-gray-200/80 bg-white/80 backdrop-blur-xl">
    {/* NAVBAR */}
    <div className="flex items-center justify-between px-4 sm:px-6 lg:px-10 h-18">
      
      {/* LEFT */}
      <div className="flex items-center gap-3">
        
        <img
          className="w-32 sm:w-36 lg:w-40 object-contain"
          src={assets.Doc_logo}
          alt=""
        />

        <div className="hidden sm:flex items-center">
          <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-semibold border border-gray-200">
            {dToken ? "Doctor Panel" : adminToken ? "Admin Panel" : ""}
          </span>
        </div>
      </div>

      {/* DESKTOP MENU */}
      <div className="hidden md:flex items-center gap-1 lg:gap-2">
        
        {/* ADMIN MENU */}
        {adminToken && (
          <>
            <NavLink
              to="/admin-dashboard"
              className={({ isActive }) =>
                `px-4 lg:px-5 py-2.5 rounded-xl text-lg font-medium transition-all duration-300 ${
                  isActive
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`
              }
            >
              Dashboard
            </NavLink>

            <NavLink
              to="/all-appointment"
              className={({ isActive }) =>
                `px-4 lg:px-5 py-2.5 rounded-xl text-lg font-medium transition-all duration-300 ${
                  isActive
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`
              }
            >
              Appointments
            </NavLink>

            <NavLink
              to="/add-doctor"
              className={({ isActive }) =>
                `px-4 lg:px-5 py-2.5 rounded-xl text-lg font-medium transition-all duration-300 ${
                  isActive
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`
              }
            >
              Add Doctor
            </NavLink>

            <NavLink
              to="/doctor-list"
              className={({ isActive }) =>
                `px-4 lg:px-5 py-2.5 rounded-xl text-lg font-medium transition-all duration-300 ${
                  isActive
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`
              }
            >
              Doctors List
            </NavLink>
          </>
        )}

        {/* DOCTOR MENU */}
        {dToken && (
          <>
            <NavLink
              to="/doctor-dashboard"
              className={({ isActive }) =>
                `px-4 lg:px-5 py-2.5 rounded-xl text-lg font-medium transition-all duration-300 ${
                  isActive
                    ? "bg-blue-500 text-white shadow-sm"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`
              }
            >
              Dashboard
            </NavLink>

            <NavLink
              to="/doctor-appointment"
              className={({ isActive }) =>
                `px-4 lg:px-5 py-2.5 rounded-xl text-lg font-medium transition-all duration-300 ${
                  isActive
                    ? "bg-blue-500 text-white shadow-sm"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`
              }
            >
              Appointments
            </NavLink>

            <NavLink
              to="/doctor-profile"
              className={({ isActive }) =>
                `px-4 lg:px-5 py-2.5 rounded-xl text-lg font-medium transition-all duration-300 ${
                  isActive
                    ? "bg-blue-500 text-white shadow-sm"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`
              }
            >
              Profile
            </NavLink>
          </>
        )}

        {/* LOGOUT */}
        <div className="ml-3 pl-3 border-l border-gray-200">
          <button
            onClick={logout}
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-lg font-medium transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer"
          >
            Logout
          </button>
        </div>
      </div>

      {/* MOBILE BUTTON */}
      <button
        onClick={() => setOpen(!open)}
        className="md:hidden w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition"
      >
        <Menu size={22} className="text-gray-700" />
      </button>
    </div>

    {/* MOBILE MENU */}
    {open && (
      <div className="md:hidden border-t border-gray-100 bg-white px-4 py-5 space-y-2 shadow-lg">
        
        {/* ADMIN LINKS */}
        {adminToken && (
          <>
            <NavLink
              to="/admin-dashboard"
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `block px-4 py-3 rounded-xl text-sm font-medium transition ${
                  isActive
                    ? "bg-gray-900 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`
              }
            >
              Dashboard
            </NavLink>

            <NavLink
              to="/all-appointment"
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `block px-4 py-3 rounded-xl text-sm font-medium transition ${
                  isActive
                    ? "bg-gray-900 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`
              }
            >
              Appointments
            </NavLink>

            <NavLink
              to="/add-doctor"
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `block px-4 py-3 rounded-xl text-sm font-medium transition ${
                  isActive
                    ? "bg-gray-900 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`
              }
            >
              Add Doctor
            </NavLink>

            <NavLink
              to="/doctor-list"
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `block px-4 py-3 rounded-xl text-sm font-medium transition ${
                  isActive
                    ? "bg-gray-900 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`
              }
            >
              Doctors List
            </NavLink>
          </>
        )}

        {/* DOCTOR LINKS */}
        {dToken && (
          <>
            <NavLink
              to="/doctor-dashboard"
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `block px-4 py-3 rounded-xl text-sm font-medium transition ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`
              }
            >
              Dashboard
            </NavLink>

            <NavLink
              to="/doctor-appointment"
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `block px-4 py-3 rounded-xl text-sm font-medium transition ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`
              }
            >
              Appointments
            </NavLink>

            <NavLink
              to="/doctor-profile"
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `block px-4 py-3 rounded-xl text-sm font-medium transition ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`
              }
            >
              Profile
            </NavLink>
          </>
        )}

        {/* MOBILE LOGOUT */}
        <button
          onClick={logout}
          className="w-full mt-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-3 rounded-xl transition-all duration-300 cursor-pointer"
        >
          Logout
        </button>
      </div>
    )}
  </header>
);
}

export default Navbar
