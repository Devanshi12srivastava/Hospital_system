import React, { useContext, useState } from 'react'
import { AdminContext } from '../context/AdminContext'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets_admin/assets'
import { DoctorContext } from '../context/DoctorContaext'
import { Menu, X } from "lucide-react";


const Sidebar = () => {

 const [open, setOpen] = useState(false);
const {adminToken} = useContext(AdminContext)
const {dToken} =useContext(DoctorContext)

  return (

  <div className="flex min-h-screen">
    {/* OVERLAY */}
    {open && (
      <div
        onClick={() => setOpen(false)}
        className="fixed inset-0 bg-black/40 z-40 md:hidden"
      />
    )}

    {/* SIDEBAR */}
    <aside
      className={`
        fixed md:static top-0 left-0 z-50
        h-screen bg-white border-r
        transition-all duration-300 ease-in-out

        ${open ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0

        w-64 md:w-20 lg:w-64
      `}
    >
      {/* MOBILE HEADER */}
      <div className="flex items-center justify-between px-5 py-4 border-b md:hidden">
        <h1 className="text-xl font-semibold text-blue-600">
          Menu
        </h1>

        <button
          onClick={() => setOpen(false)}
          className="p-2 rounded-lg hover:bg-gray-100"
        >
          <X size={22} />
        </button>
      </div>

      {/* ADMIN SIDEBAR */}
      {adminToken && (
        <ul className="mt-5 space-y-2 px-3">
          <NavLink
            to="/admin-dashboard"
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-4 py-3 px-4 rounded-xl transition-all duration-200 ${
                isActive
                  ? "bg-blue-500 text-white shadow-md"
                  : "hover:bg-blue-50 text-zinc-700"
              }`
            }
          >
            <img
              src={assets.home_icon}
              alt=""
              className="w-5 min-w-5"
            />

            <span className="hidden lg:block">
              Dashboard
            </span>
          </NavLink>

          <NavLink
            to="/all-appointment"
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-4 py-3 px-4 rounded-xl transition-all duration-200 ${
                isActive
                  ? "bg-blue-500 text-white shadow-md"
                  : "hover:bg-blue-50 text-zinc-700"
              }`
            }
          >
            <img
              src={assets.appointment_icon}
              alt=""
              className="w-5 min-w-5"
            />

            <span className="hidden lg:block">
              Appointments
            </span>
          </NavLink>

          <NavLink
            to="/add-doctor"
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-4 py-3 px-4 rounded-xl transition-all duration-200 ${
                isActive
                  ? "bg-blue-500 text-white shadow-md"
                  : "hover:bg-blue-50 text-zinc-700"
              }`
            }
          >
            <img
              src={assets.add_icon}
              alt=""
              className="w-5 min-w-5"
            />

            <span className="hidden lg:block">
              Add Doctor
            </span>
          </NavLink>

          <NavLink
            to="/doctor-list"
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-4 py-3 px-4 rounded-xl transition-all duration-200 ${
                isActive
                  ? "bg-blue-500 text-white shadow-md"
                  : "hover:bg-blue-50 text-zinc-700"
              }`
            }
          >
            <img
              src={assets.people_icon}
              alt=""
              className="w-5 min-w-5"
            />

            <span className="hidden lg:block">
              Doctors List
            </span>
          </NavLink>
        </ul>
      )}

      {/* DOCTOR SIDEBAR */}
      {dToken && (
        <ul className="mt-5 space-y-2 px-3">
          <NavLink
            to="/doctor-dashboard"
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-4 py-3 px-4 rounded-xl transition-all duration-200 ${
                isActive
                  ? "bg-blue-500 text-white shadow-md"
                  : "hover:bg-blue-50 text-zinc-700"
              }`
            }
          >
            <img
              src={assets.home_icon}
              alt=""
              className="w-5 min-w-5"
            />

            <span className="hidden lg:block">
              Dashboard
            </span>
          </NavLink>

          <NavLink
            to="/doctor-appointment"
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-4 py-3 px-4 rounded-xl transition-all duration-200 ${
                isActive
                  ? "bg-blue-500 text-white shadow-md"
                  : "hover:bg-blue-50 text-zinc-700"
              }`
            }
          >
            <img
              src={assets.appointment_icon}
              alt=""
              className="w-5 min-w-5"
            />

            <span className="hidden lg:block">
              Appointments
            </span>
          </NavLink>

          <NavLink
            to="/doctor-profile"
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-4 py-3 px-4 rounded-xl transition-all duration-200 ${
                isActive
                  ? "bg-blue-500 text-white shadow-md"
                  : "hover:bg-blue-50 text-zinc-700"
              }`
            }
          >
            <img
              src={assets.people_icon}
              alt=""
              className="w-5 min-w-5"
            />

            <span className="hidden lg:block">
              Profile
            </span>
          </NavLink>
        </ul>
      )}
    </aside>

    {/* MAIN CONTENT */}
    <div className="flex-1 flex flex-col">
      {/* MOBILE TOPBAR */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 bg-white border-b sticky top-0 z-30">
        <h1 className="text-lg font-semibold text-blue-600">
          Dashboard
        </h1>

        <button
          onClick={() => setOpen(true)}
          className="p-2 rounded-lg hover:bg-gray-100"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* PAGE CONTENT */}
      <div className="flex-1 p-4">
        {/* Your Content */}
      </div>
    </div>
  </div>

  );
};

export default Sidebar
