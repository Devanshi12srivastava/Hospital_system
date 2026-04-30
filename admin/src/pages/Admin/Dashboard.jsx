import React, { useContext, useEffect, useState } from 'react'
import { allLatestAppointment } from '../../api/Allappointment'
import { AdminContext } from '../../context/AdminContext';
import { assets } from '../../assets/assets_admin/assets';
import { AppContext } from '../../context/AppContext';

const Dashboard = () => {
    const { backendUrl, adminToken } = useContext(AdminContext);
    const {slotDateFormat} =useContext (AppContext)
  const [dashboardAppointData,setdashboardAppointData]=useState(false)

  const[loading,setLoading]=useState(false)
  const [error,setError]=useState(null)


  const dashboardData=async()=>{
    try {
      const response=await allLatestAppointment(backendUrl,adminToken)
    const data=response.data;
    setdashboardAppointData(data.dashData)
    console.log("data",data.dashData)
    
    } catch (error) {
       console.log(error.message)
    }
    
  }
  useEffect(()=>{
    if(adminToken){
dashboardData()
    }
  },[])

  return dashboardAppointData && (
    <div className="p-6 bg-gray-100 min-h-screen">

  {/* Top Stats Cards */}
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

    {/* Doctors */}
    <div className="flex items-center gap-4 bg-white p-5 rounded-2xl shadow hover:shadow-md transition">
      <img className="w-12 h-12" src={assets.doctor_icon} alt="" />
      <div>
        <p className="text-2xl font-bold text-gray-700">
          {dashboardAppointData.doctors}
        </p>
        <p className="text-gray-400 text-sm">Doctors</p>
      </div>
    </div>

    {/* Appointments */}
    <div className="flex items-center gap-4 bg-white p-5 rounded-2xl shadow hover:shadow-md transition">
      <img className="w-12 h-12" src={assets.appointment_icon} alt="" />
      <div>
        <p className="text-2xl font-bold text-gray-700">
          {dashboardAppointData.appointments}
        </p>
        <p className="text-gray-400 text-sm">Appointments</p>
      </div>
    </div>

    {/* Patients */}
    <div className="flex items-center gap-4 bg-white p-5 rounded-2xl shadow hover:shadow-md transition">
      <img className="w-12 h-12" src={assets.patients_icon} alt="" />
      <div>
        <p className="text-2xl font-bold text-gray-700">
          {dashboardAppointData.patients}
        </p>
        <p className="text-gray-400 text-sm">Patients</p>
      </div>
    </div>

  </div>

  {/* Latest Bookings Section */}
  <div className="mt-8 bg-white rounded-2xl shadow">

    <div className="flex items-center gap-3 px-6 py-4 border-b">
      <img className="w-6" src={assets.list_icon} alt="" />
      <p className="font-semibold text-lg text-gray-700">
        Latest Bookings
      </p>
    </div>

    <div className="divide-y">
      {
        dashboardAppointData?.latestAppointments.map((item, index) => (
          <div key={index} className="flex items-center gap-4 p-4 hover:bg-gray-50 transition">

            <img
              className="w-12 h-12 rounded-full object-cover"
              src={item.docData.image}
              alt=""
            />

            <div className="flex-1">
              <p className="font-medium text-gray-800">
                {item.docData.name}
              </p>
             
              <p className="text-sm text-gray-400">
                {slotDateFormat(item.slotDate)} | {item.slotTime}
              </p>
            </div>
            {item.cancelled===true ? <p className="text-red-500 text-xs font-medium">Cancelled</p> : <img onClick={()=>AppointCancel(item._id)}
                  className="w-6 h-6 hover:scale-110 transition cursor-pointer"
                  src={assets.cancel_icon}
                  alt="cancel"
                />}
            {/* Status */}
           

          </div>
        ))
      }
    </div>

  </div>

</div>
  )
}

export default Dashboard
