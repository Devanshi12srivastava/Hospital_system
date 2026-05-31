import React, { useContext, useEffect, useState } from "react";
import { doctorDashboardApi } from "../../api/DoctorDashboardApi";
import { DoctorContext } from "../../context/DoctorContaext";
import { assets } from "../../assets/assets_admin/assets";
import { AppContext } from "../../context/AppContext";

const DoctorDashboard = () => {
  const { backendUrl, dToken } = useContext(DoctorContext);
  console.log("Backend URL:", backendUrl);
  const [dashData, setDashData] = useState(null);

  const { slotDateFormat,error,loading,setError,setLoading } = useContext(AppContext);

  const { AppCancel, AppComplete ,AppointmentDoctor} = useContext(DoctorContext);

  const getDashBoardData = async () => {
    try {
      setLoading(true);
      console.log("api calling");
      const response = await doctorDashboardApi(backendUrl, dToken);
      console.log("FULL RESPONSE:", response);
      const data = response.data;
      console.log("DATA:", data);
      if (data.success) {
        setDashData(data.dashData);
        console.log(data);
      } else {
        console.log("API FAILED:", data.message);
        toast.error(data.message);
      }
    } catch (error) {
      console.log("ERROR:", error.response || error.message);
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  console.log("DoctorDashboard rendered");
console.log("loading:", loading);
console.log("dashData:", dashData);
  useEffect(() => {
    console.log("useEffect run");
    console.log("dToken:", dToken);

    if (dToken) {
      console.log("Calling API...");
      getDashBoardData();
    }
  }, [dToken]);

if (loading ) {
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
  dashData && (
    <div className="min-h-screen p-3 mt-10 sm:p-4 md:p-6 xl:p-8">
      
      {/* HERO */}
      <div className="relative overflow-hidden bg-linear-to-br from-[#2563eb] via-[#3b82f6] to-[#06b6d4] p-5 sm:p-7 md:p-10 shadow-2xl">
        
        <div className="relative z-10 flex flex-col xl:flex-row xl:items-center xl:justify-between gap-8">
          
          {/* LEFT */}
          <div className="max-w-3xl">
            <p className="text-blue-100 text-xs sm:text-sm tracking-[3px] uppercase">
              Dashboard Overview
            </p>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-3 leading-tight">
              Welcome Back Doctor 👨‍⚕️
            </h1>

            <p className="text-blue-100 mt-4 text-sm md:text-base leading-7 max-w-2xl">
              Manage appointments, track earnings, and monitor patient
              activities with a modern healthcare dashboard.
            </p>
          </div>

          {/* MINI STATS */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            
            <div className="backdrop-blur-xl bg-white/15 border border-white/20 rounded-2xl sm:rounded-3xl px-4 sm:px-6 py-4 sm:py-5 min-w-32.5 sm:min-w-37.5">
              <p className="text-blue-100 text-xs sm:text-sm">
                Appointments
              </p>

              <h2 className="text-2xl sm:text-3xl font-bold text-white mt-2">
                {dashData.appointments}
              </h2>
            </div>

            <div className="backdrop-blur-xl bg-white/15 border border-white/20 rounded-2xl sm:rounded-3xl px-4 sm:px-6 py-4 sm:py-5 min-w-32.5 sm:min-w-37.5">
              <p className="text-blue-100 text-xs sm:text-sm">
                Patients
              </p>

              <h2 className="text-2xl sm:text-3xl font-bold text-white mt-2">
                {dashData.patients}
              </h2>
            </div>
          </div>
        </div>

        {/* BLUR */}
        <div className="absolute top-0 right-0 w-60 sm:w-72 h-60 sm:h-72 bg-white/20 rounded-full blur-3xl"></div>

        <div className="absolute bottom-0 left-10 sm:left-20 w-44 sm:w-60 h-44 sm:h-60 bg-cyan-300/20 rounded-full blur-3xl"></div>
      </div>

      {/* STAT CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 mt-10 sm:mt-8">
        
        {/* CARD */}
     <div className="group bg-white px-5 pt-5 pb-2 mb-5 shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:-translate-y-1">
          
          <div className="flex items-start justify-between gap-4">
            
            <div>
              <p className="text-gray-400 text-lg font-medium">
                Total Earnings
              </p>

              <h2 className="text-2xl sm:text-3xl font-bold text-green-600 mt-4">
                ₹{dashData.earnings}
              </h2>

              
            </div>

            <div className="w-11 h-11 sm:w-11 sm:h-11 rounded-2xl sm:rounded-3xl bg-linear-to-br from-green-400 to-emerald-500 flex items-center justify-center shadow-lg shadow-green-200 shrink-0">
              <img
                className="w-5 h-5 sm:w-6 sm:h-6 brightness-0 invert"
                src={assets.earning_icon}
                alt=""
              />
            </div>
          </div>
        </div>

        {/* APPOINTMENT */}
        <div className="group bg-white p-5 mb-5 sm:p-7 shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:-translate-y-1">
          
          <div className="flex items-start justify-between gap-4">
            
            <div>
              <p className="text-gray-400 text-lg font-medium">
                Appointments
              </p>

              <h2 className="text-3xl sm:text-4xl font-bold text-blue-600 mt-4">
                {dashData.appointments}
              </h2>

            
            </div>

            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl sm:rounded-3xl bg-linear-to-br from-blue-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-200 shrink-0">
              <img
                className="w-5 h-5 sm:w-6 sm:h-6 brightness-0 invert"
                src={assets.appointment_icon}
                alt=""
              />
            </div>
          </div>
        </div>

        {/* PATIENT */}
        <div className="group bg-white p-5 mb-5 sm:p-7 shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:-translate-y-1 sm:col-span-2 xl:col-span-1">
          
          <div className="flex items-start justify-between gap-4">
            
            <div>
              <p className="text-gray-400 text-lg font-medium">
                Active Patients
              </p>

              <h2 className="text-3xl sm:text-4xl font-bold text-orange-500 mt-4">
                {dashData.patients}
              </h2>

             
            </div>

            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl sm:rounded-3xl bg-linear-to-br from-pink-500 to-rose-400 flex items-center justify-center shadow-lg shadow-pink-200 shrink-0">
              <img
                className="w-5 h-5 sm:w-6 sm:h-6 brightness-0 invert"
                src={assets.patients_icon}
                alt=""
              />
            </div>
          </div>
        </div>
      </div>

      {/* APPOINTMENTS */}
      <div className="mt-8 sm:mt-5 bg-white shadow-sm border border-gray-100 overflow-hidden">
        
        {/* HEADER */}
        <div className="px-4 sm:px-6 md:px-8 py-5 sm:py-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-blue-800">
              Recent Appointments
            </h2>

            <p className="text-gray-400 text-sm mt-1">
              Patient appointment management
            </p>
          </div>

        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          
          {/* TABLE HEADER */}
          <div className="min-w-225 grid grid-cols-[70px_2fr_1.2fr_1fr_1fr_1.3fr] gap-8 mr-10 px-4 sm:px-10 md:px-8 py-4 bg-gray-50 border-b border-gray-200">
            
            <p className="text-xs font-bold uppercase tracking-wide text-gray-500">
              Serial No.
            </p>

            <p className="text-xs font-bold uppercase tracking-wide text-gray-500">
              Patient
            </p>

            <p className="text-xs font-bold uppercase tracking-wide text-gray-500">
              Date
            </p>

            <p className="text-xs font-bold uppercase tracking-wide text-gray-500">
              Time
            </p>

            <p className="text-xs font-bold uppercase tracking-wide text-gray-500">
              Payment
            </p>

            <p className="text-xs font-bold uppercase tracking-wide text-gray-500 text-right mr-25">
              Action
            </p>
          </div>

          {/* TABLE BODY */}
          <div className="min-w-225">
            {dashData?.latestAppointments?.map((item, index) => (
              
              <div
                key={index}
                className="grid grid-cols-[70px_2fr_1.2fr_1fr_1fr_1.3fr] gap-4 items-center px-4 sm:px-6 md:px-8 py-4 sm:py-5 border-b border-gray-100 hover:bg-gray-50 transition"
              >
                
                {/* SERIAL */}
                <div className="flex items-center">
                <div className="w-11 h-11 rounded-2xl bg-blue-100 text-gray-700 font-bold text-sm flex items-center justify-center">
                  {index + 1}
                </div>
              </div>

                {/* PATIENT */}
                <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                  
                  <img
                    className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl object-cover border border-gray-200 shrink-0"
                    src={item.userData?.image || assets.patients_icon}
                    alt=""
                  />

                  <div className="min-w-0">
                    <h3 className="text-sm font-semibold text-gray-800 truncate">
                      {item.userData.name}
                    </h3>

                    <p className="text-xs text-gray-400 mt-1 truncate">
                      Patient Appointment
                    </p>
                  </div>
                </div>

                {/* DATE */}
                <div>
                  <p className="text-sm font-medium text-gray-700">
                    {slotDateFormat(item.slotDate)}
                  </p>
                </div>

                {/* TIME */}
                <div>
                  <p className="text-sm font-medium text-gray-700">
                    {item.slotTime}
                  </p>
                </div>

                {/* PAYMENT */}
                <div>
                  {item.payment ? (
                    <span className="px-3 py-1.5 rounded-full bg-green-50 text-green-700 text-xs font-semibold whitespace-nowrap">
                      Paid
                    </span>
                  ) : (
                    <span className="px-3 py-1.5 rounded-full bg-orange-50 text-orange-600 text-xs font-semibold whitespace-nowrap">
                      Pending
                    </span>
                  )}
                </div>

                {/* ACTION */}
                <div className="flex justify-center gap-2 flex-wrap">
                  
                  {item.cancelled ? (
                    <span className="text-red-500 text-sm font-semibold">
                      Cancelled
                    </span>
                  ) : item.isCompleted ? (
                    <span className="text-green-600 text-sm font-semibold">
                      Completed
                    </span>
                  ) : (
                    <>
                      {item.payment && (
                        <button
                          onClick={() => AppComplete(item._id)}
                          className="px-3 py-2 rounded-lg bg-gray-900 text-white text-xs font-medium hover:bg-black transition whitespace-nowrap"
                        >
                          Complete
                        </button>
                      )}

                      <button
                        onClick={() => AppCancel(item._id)}
                        className="px-3 py-2 rounded-lg border border-red-200 text-red-600 text-xs font-medium hover:bg-red-50 transition whitespace-nowrap"
                      >
                        Cancel
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
);
};
export default DoctorDashboard;
