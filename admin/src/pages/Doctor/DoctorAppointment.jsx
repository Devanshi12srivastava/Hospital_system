import React, { useContext, useEffect, useState } from "react";
import { cancelAppoint, completeAppoint, doctorAppointments } from "../../api/Allappointment";
import { toast } from "react-toastify";
import { DoctorContext } from "../../context/DoctorContaext";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets_admin/assets";


const DoctorAppointment = () => {

  const {
  docAppointment,
  AppointmentDoctor,
  dToken,backendUrl,AppComplete,AppCancel
} = useContext(DoctorContext);

  const {calculateAge,slotDateFormat,error,loading,setError,setLoading}=useContext(AppContext)

  useEffect(() => {
    if (dToken) {
      AppointmentDoctor();
    }
  }, [dToken]);


  if (loading ||  Object.keys(docAppointment).length === 0) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-xl font-medium text-blue-600">
        Loading Appointments...
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
  <div className="w-full min-h-screen mt-10  overflow-x-auto p-3 sm:p-5 md:p-8">
    
    {/* TOP HEADER */}
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-8">
      
      {/* LEFT */}
      <div>
        <p className="text-sm font-medium tracking-[3px] uppercase text-blue-600">
          Appointment Management
        </p>

        <h1 className="text-2xl sm:text-3xl font-bold text-blue-900 mt-2">
          All Appointments
        </h1>

        <p className="text-gray-500 mt-3 text-sm sm:text-base">
          Manage patient bookings, payments and appointment status.
        </p>
      </div>

      {/* RIGHT STATS */}
      <div className="flex flex-wrap gap-4">
        
        <div className="bg-white border border-gray-200 mx-5 px-6 py-5 min-w-45 shadow-sm">
          <p className="text-sm text-gray-500 font-medium">
            Total Appointments
          </p>

          <h2 className="text-4xl font-bold text-blue-500 mt-3">
            {docAppointment.length}
          </h2>
        </div>

        <div className="bg-white border border-gray-200 px-6 py-5 min-w-45 shadow-sm">
          <p className="text-sm text-gray-500 font-medium">
            Today's Schedule
          </p>

          <h2 className="text-4xl font-bold text-blue-600 mt-3">
            {
              docAppointment.filter(
                (item) => !item.cancelled && !item.isCompleted
              ).length
            }
          </h2>
        </div>
      </div>
    </div>

    {/* MAIN TABLE CARD */}
    <div className="bg-white border border-gray-200 shadow-sm overflow-hidden">
      
      {/* TABLE TOP */}
      <div className="px-5 sm:px-8 py-5 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-blue-700">
            Appointment Records
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Complete list of patient appointments
          </p>
        </div>

        <button className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-blue-800 text-white text-sm font-medium hover:bg-black transition">
          All Appointment
        </button>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        
        {/* TABLE HEADER */}
        <div className="min-w-275 grid grid-cols-[80px_2.4fr_120px_1.6fr_120px_220px] gap-4 px-6 sm:px-8 py-4 bg-[#f8fafc] border-b border-gray-200">
          
          <p className="text-xs font-bold uppercase tracking-wide text-gray-500">
            Serial No.
          </p>

          <p className="text-xs font-bold uppercase tracking-wide text-gray-500">
            Patient
          </p>

          <p className="text-xs font-bold uppercase tracking-wide text-gray-500">
            Age
          </p>

          <p className="text-xs font-bold uppercase tracking-wide text-gray-500">
            Appointment
          </p>

          <p className="text-xs font-bold uppercase tracking-wide text-gray-500">
            Fees
          </p>

          <p className="text-xs font-bold uppercase tracking-wide text-center text-gray-500">
            Status / Action
          </p>
        </div>

        {/* ROWS */}
        <div className="min-w-275">
          
          {[...docAppointment].reverse().map((item, index) => (
            
            <div
              key={index}
              className="grid grid-cols-[80px_2.4fr_120px_1.6fr_120px_220px] gap-4 items-center px-6 sm:px-8 py-5 border-b border-gray-100 hover:bg-[#fafcff] transition-all duration-300"
            >
              
              {/* SERIAL */}
              <div className="flex items-center">
                <div className="w-11 h-11 rounded-2xl bg-blue-100 text-gray-700 font-bold text-sm flex items-center justify-center">
                  {index + 1}
                </div>
              </div>

              {/* PATIENT */}
              <div className="flex items-center gap-4 min-w-0">
                
                <img
                  className="w-14 h-14 rounded-2xl object-cover border border-gray-200 shrink-0"
                  src={item.userData?.image || assets.patients_icon}
                  alt=""
                />

                <div className="min-w-0">
                  <h2 className="text-[15px] font-semibold text-gray-900 truncate">
                    {item.userData.name}
                  </h2>

                  <p className="text-sm text-gray-400 mt-1 truncate">
                    Patient Appointment
                  </p>
                </div>
              </div>

              {/* AGE */}
              <div>
                <div className="inline-flex px-4 py-2 rounded-xl bg-gray-100 text-gray-700 text-sm font-semibold">
                  {calculateAge(item.userData.dob)} yrs
                </div>
              </div>

              {/* DATE TIME */}
              <div>
                <p className="text-sm font-semibold text-gray-800">
                  {slotDateFormat(item.slotDate)}
                </p>

                <p className="text-sm text-gray-400 mt-1">
                  {item.slotTime}
                </p>
              </div>

              {/* FEES */}
              <div>
                <h2 className="text-xl font-bold text-blue-900">
                  ₹{item.amount}
                </h2>
              </div>

              {/* STATUS / ACTION */}
              <div className="flex items-center justify-center">
                
                {item.cancelled ? (

                  <div className="px-4 py-2 rounded-xl bg-red-50 text-red-600 text-sm font-semibold">
                    Cancelled
                  </div>

                ) : item.isCompleted ? (

                  <div className="px-4 py-2 rounded-xl bg-green-50 text-green-600 text-sm font-semibold">
                    Completed
                  </div>

                ) : (

                  <div className="flex items-center gap-2 flex-wrap justify-center">

                    {item.payment ? (
                      <button
                        onClick={() => AppComplete(item._id)}
                        className="px-4 py-2 rounded-xl bg-gray-900 hover:bg-black text-white text-sm font-medium transition"
                      >
                        Complete
                      </button>
                    ) : (
                      <div className="px-3 py-2 rounded-xl bg-orange-50 text-orange-600 text-xs font-semibold">
                        Payment Pending
                      </div>
                    )}

                    <button
                      onClick={() => AppCancel(item._id)}
                      className="px-4 py-2 rounded-xl border border-red-200 text-red-500 hover:bg-red-50 text-sm font-medium transition"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);
};

export default DoctorAppointment;