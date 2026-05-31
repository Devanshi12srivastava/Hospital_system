import React, { useContext, useEffect, useState } from "react";
import { allLatestAppointment } from "../../api/Allappointment";
import { AdminContext } from "../../context/AdminContext";
import { assets } from "../../assets/assets_admin/assets";
import { AppContext } from "../../context/AppContext";
import { appointmentCancelApi } from "../../api/CancelApp";
import { DoctorContext } from "../../context/DoctorContaext";

const Dashboard = () => {
  const { backendUrl, adminToken } = useContext(AdminContext);
  const { slotDateFormat,error,loading,setError,setLoading} = useContext(AppContext);
  const [dashboardAppointData, setdashboardAppointData] = useState(false);
const {AppCancel} = useContext(DoctorContext)
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(null);

  const dashboardData = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await allLatestAppointment(backendUrl, adminToken);
      const data = response.data;
      setdashboardAppointData(data.dashData);
      console.log("data", data.dashData);
    } catch (error) {
      console.log(error.message);
    }
    finally{
      setLoading(false)
    }
  };

  useEffect(() => {
    if (adminToken) {
      dashboardData();
    }
  }, []);
  
if (loading ||  Object.keys(dashboardAppointData).length === 0) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-lg font-medium text-blue-600">
        Loading Doctors...
      </p>
    </div>
  );
}

if (error) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-red-500">
         {error?.message || "Something went wrong"}
      </p>
    </div>
  );
}
 return (
  dashboardAppointData && (
    <div className="min-h-screen mt-10 not-[]:bg-[#f4f7fb] p-4 md:p-8">
      
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-linear-to-r from-blue-600 via-blue-500 to-cyan-400 p-8 md:p-10 shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          
          <div>
            <p className="text-blue-100 text-sm tracking-wide uppercase">
              Admin Dashboard
            </p>

            <h1 className="text-3xl md:text-5xl font-bold text-white mt-2">
              Welcome Back 👋
            </h1>

            <p className="text-blue-100 mt-3 max-w-xl text-sm md:text-base">
              Manage doctors, appointments and patients efficiently with
              real-time updates and modern analytics.
            </p>
          </div>

          {/* Quick Overview */}
          <div className="flex gap-4 flex-wrap">
            <div className="backdrop-blur-lg bg-white/20 border border-white/20 px-6 py-4 min-w-32.5">
              <p className="text-white text-2xl font-bold">
                {dashboardAppointData.doctors}
              </p>
              <p className="text-blue-100 text-sm">Doctors</p>
            </div>

            <div className="backdrop-blur-lg bg-white/20 border border-white/20 px-6 py-4 min-w-32.5">
              <p className="text-white text-2xl font-bold">
                {dashboardAppointData.appointments}
              </p>
              <p className="text-blue-100 text-sm">Appointments</p>
            </div>

            <div className="backdrop-blur-lg bg-white/20 border border-white/20 px-6 py-4 min-w-32.5">
              <p className="text-white text-2xl font-bold">
                {dashboardAppointData.patients}
              </p>
              <p className="text-blue-100 text-sm">Patients</p>
            </div>
          </div>
        </div>

        {/* Decorative Blur */}
        <div className="absolute -top-10 -right-10 w-56 h-56 bg-white/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-cyan-300/20 rounded-full blur-2xl"></div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        
        {/* Doctors */}
        <div className="group bg-white  p-6 shadow-sm hover:shadow-xl transition duration-300 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Doctors</p>

              <h2 className="text-3xl font-bold text-gray-800 mt-2">
                {dashboardAppointData.doctors}
              </h2>
            </div>

            <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center group-hover:scale-110 transition">
              <img className="w-9" src={assets.doctor_icon} alt="" />
            </div>
          </div>
        </div>

        {/* Appointments */}
        <div className="group bg-white p-6 shadow-sm hover:shadow-xl transition duration-300 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Appointments</p>

              <h2 className="text-3xl font-bold text-gray-800 mt-2">
                {dashboardAppointData.appointments}
              </h2>
            </div>

            <div className="w-16 h-16 rounded-2xl bg-green-100 flex items-center justify-center group-hover:scale-110 transition">
              <img className="w-9" src={assets.appointment_icon} alt="" />
            </div>
          </div>
        </div>

        {/* Patients */}
        <div className="group bg-white p-6 shadow-sm hover:shadow-xl transition duration-300 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Patients</p>

              <h2 className="text-3xl font-bold text-gray-800 mt-2">
                {dashboardAppointData.patients}
              </h2>
            </div>

            <div className="w-16 h-16 rounded-2xl bg-pink-100 flex items-center justify-center group-hover:scale-110 transition">
              <img className="w-9" src={assets.patients_icon} alt="" />
            </div>
          </div>
        </div>
      </div>

      {/* Latest Bookings */}
      <div className="mt-10 bg-white shadow-sm border border-gray-100 overflow-hidden">
        
        {/* Heading */}
        <div className="flex items-center justify-between px-6 py-5 border-b bg-gray-50">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-blue-100 flex items-center justify-center">
              <img className="w-5" src={assets.list_icon} alt="" />
            </div>

            <div>
              <h2 className="font-semibold text-lg text-gray-800">
                Latest Bookings
              </h2>

              <p className="text-sm text-gray-400">
                Recent appointment activities
              </p>
            </div>
          </div>
        </div>

        {/* Appointment List */}
        <div className="divide-y">
          {dashboardAppointData?.latestAppointments.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between gap-4 px-6 py-4 hover:bg-gray-50 transition"
            >
              
              <div className="flex items-center gap-4">
                <img
                  className="w-14 h-14 rounded-2xl object-cover border"
                  src={item.docData.image}
                  alt=""
                />

                <div>
                  <p className="font-semibold text-gray-800">
                    {item.docData.name}
                  </p>

                  <p className="text-sm text-gray-400 mt-1">
                    {slotDateFormat(item.slotDate)} • {item.slotTime}
                  </p>
                </div>
              </div>

              {/* Status */}
              <div>
                {item.cancelled === true ? (
                  <span className="px-4 py-1.5 rounded-full text-xs font-semibold bg-red-100 text-red-600">
                    Cancelled
                  </span>
                ) : item.isCompleted ? (
                  <span className="px-4 py-1.5 rounded-full text-xs font-semibold bg-green-100 text-green-600">
                    Completed
                  </span>
                ) : (
                  <button
                    onClick={() => AppCancel(item._id)}
                    className="w-10 h-10 rounded-full bg-red-50 hover:bg-red-100 flex items-center justify-center transition"
                  >
                    <img
                      className="w-5 h-5"
                      src={assets.cancel_icon}
                      alt="cancel"
                    />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
);
};

export default Dashboard;