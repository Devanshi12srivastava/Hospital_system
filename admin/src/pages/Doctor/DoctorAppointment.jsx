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
  <div className="w-full min-h-screen mt-10 p-3 sm:p-5 md:p-8">

    {/* TOP HEADER */}
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-6 sm:mb-8">

      {/* LEFT */}
      <div>
        <p className="text-xs sm:text-sm font-medium tracking-[2px] sm:tracking-[3px] uppercase text-blue-600">
          Appointment Management
        </p>
        <h1 className="text-2xl sm:text-3xl font-bold text-blue-900 mt-2">
          All Appointments
        </h1>
        <p className="text-gray-500 mt-2 text-sm sm:text-base">
          Manage patient bookings, payments and appointment status.
        </p>
      </div>

      {/* RIGHT STATS */}
      <div className="flex gap-3 sm:gap-4">
        <div className="bg-white border border-gray-200 px-4 sm:px-6 py-4 sm:py-5 flex-1 lg:flex-none lg:min-w-40 shadow-sm">
          <p className="text-xs sm:text-sm text-gray-500 font-medium">
            Total Appointments
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-blue-500 mt-2 sm:mt-3">
            {docAppointment.length}
          </h2>
        </div>

        <div className="bg-white border border-gray-200 px-4 sm:px-6 py-4 sm:py-5 flex-1 lg:flex-none lg:min-w-40 shadow-sm">
          <p className="text-xs sm:text-sm text-gray-500 font-medium">
            Today's Schedule
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-blue-600 mt-2 sm:mt-3">
            {
              docAppointment.filter(
                (item) => !item.cancelled && !item.isCompleted
              ).length
            }
          </h2>
        </div>
      </div>
    </div>

    {/* MAIN CARD */}
    <div className="bg-white border border-gray-200 shadow-sm overflow-hidden">

      {/* TABLE TOP */}
      <div className="px-4 sm:px-8 py-4 sm:py-5 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-lg sm:text-2xl font-bold text-blue-700">
            Appointment Records
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Complete list of patient appointments
          </p>
        </div>
        
      </div>

      {/* DESKTOP TABLE — md aur upar */}
      <div className="hidden md:block overflow-x-auto">

        {/* HEADER */}
        <div className="min-w-200 grid grid-cols-[60px_2fr_100px_1.5fr_100px_1fr] gap-4 px-6 sm:px-8 py-4 bg-[#f8fafc] border-b border-gray-200">
          <p className="text-xs font-bold uppercase tracking-wide text-gray-500">#</p>
          <p className="text-xs font-bold uppercase tracking-wide text-gray-500">Patient</p>
          <p className="text-xs font-bold uppercase tracking-wide text-gray-500">Age</p>
          <p className="text-xs font-bold uppercase tracking-wide text-gray-500">Appointment</p>
          <p className="text-xs font-bold uppercase tracking-wide text-gray-500">Fees</p>
          <p className="text-xs font-bold uppercase tracking-wide text-center text-gray-500">Status</p>
        </div>

        {/* ROWS */}
        <div className="min-w-200">
          {[...docAppointment].reverse().map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-[60px_2fr_100px_1.5fr_100px_1fr] gap-4 items-center px-6 sm:px-8 py-4 border-b border-gray-100 hover:bg-[#fafcff] transition-all duration-300"
            >
              {/* SERIAL */}
              <div className="w-9 h-9 rounded-xl bg-blue-100 text-gray-700 font-bold text-sm flex items-center justify-center">
                {index + 1}
              </div>

              {/* PATIENT */}
              <div className="flex items-center gap-3 min-w-0">
                <img
                  className="w-11 h-11 rounded-xl object-cover border border-gray-200 shrink-0"
                  src={item.userData?.image || assets.patients_icon}
                  alt=""
                />
                <div className="min-w-0">
                  <h2 className="text-sm font-semibold text-gray-900 truncate">
                    {item.userData.name}
                  </h2>
                  <p className="text-xs text-gray-400 mt-0.5">Patient</p>
                </div>
              </div>

              {/* AGE */}
              <div>
                <span className="inline-flex px-3 py-1.5 rounded-xl bg-gray-100 text-gray-700 text-sm font-semibold">
                  {calculateAge(item.userData.dob)} yrs
                </span>
              </div>

              {/* DATE TIME */}
              <div>
                <p className="text-sm font-semibold text-gray-800">
                  {slotDateFormat(item.slotDate)}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">{item.slotTime}</p>
              </div>

              {/* FEES */}
              <div>
                <h2 className="text-lg font-bold text-blue-900">₹{item.amount}</h2>
              </div>

              {/* STATUS / ACTION */}
              <div className="flex items-center justify-center">
                {item.cancelled ? (
                  <span className="px-3 py-1.5 rounded-xl bg-red-50 text-red-600 text-xs font-semibold">
                    Cancelled
                  </span>
                ) : item.isCompleted ? (
                  <span className="px-3 py-1.5 rounded-xl bg-green-50 text-green-600 text-xs font-semibold">
                    Completed
                  </span>
                ) : (
                  <div className="flex items-center gap-2 flex-wrap justify-center">
                    {item.payment ? (
                      <button
                        onClick={() => AppComplete(item._id)}
                        className="px-3 py-1.5 rounded-xl bg-gray-900 hover:bg-black text-white text-xs font-medium transition"
                      >
                        Complete
                      </button>
                    ) : (
                      <span className="px-3 py-1.5 rounded-xl bg-orange-50 text-orange-600 text-xs font-semibold">
                        Pending
                      </span>
                    )}
                    <button
                      onClick={() => AppCancel(item._id)}
                      className="px-3 py-1.5 rounded-xl border border-red-200 text-red-500 hover:bg-red-50 text-xs font-medium transition"
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

      {/* MOBILE CARDS — sirf md se neeche */}
      <div className="md:hidden divide-y divide-gray-100">
        {[...docAppointment].reverse().map((item, index) => (
          <div key={index} className="p-4 hover:bg-[#fafcff] transition-all duration-300">

            {/* CARD TOP: image + name + serial + status */}
            <div className="flex items-start gap-3">
              <img
                className="w-12 h-12 rounded-xl object-cover border border-gray-200 shrink-0"
                src={item.userData?.image || assets.patients_icon}
                alt=""
              />

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h2 className="text-sm font-semibold text-gray-900 truncate">
                    {item.userData.name}
                  </h2>
                  <span className="text-xs text-gray-400 font-medium shrink-0">
                    #{index + 1}
                  </span>
                </div>

                {/* STATUS BADGE */}
                <div className="mt-1.5">
                  {item.cancelled ? (
                    <span className="inline-flex px-2.5 py-1 rounded-lg bg-red-50 text-red-600 text-xs font-semibold">
                      Cancelled
                    </span>
                  ) : item.isCompleted ? (
                    <span className="inline-flex px-2.5 py-1 rounded-lg bg-green-50 text-green-600 text-xs font-semibold">
                      Completed
                    </span>
                  ) : item.payment ? (
                    <span className="inline-flex px-2.5 py-1 rounded-lg bg-blue-50 text-blue-600 text-xs font-semibold">
                      Payment Done
                    </span>
                  ) : (
                    <span className="inline-flex px-2.5 py-1 rounded-lg bg-orange-50 text-orange-600 text-xs font-semibold">
                      Payment Pending
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* CARD DETAILS GRID */}
            <div className="mt-3 grid grid-cols-3 gap-2">
              <div className="bg-gray-50 rounded-xl px-3 py-2">
                <p className="text-[10px] uppercase tracking-wide text-gray-400 font-semibold">Age</p>
                <p className="text-sm font-semibold text-gray-800 mt-0.5">
                  {calculateAge(item.userData.dob)} yrs
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl px-3 py-2">
                <p className="text-[10px] uppercase tracking-wide text-gray-400 font-semibold">Date</p>
                <p className="text-xs font-semibold text-gray-800 mt-0.5 leading-tight">
                  {slotDateFormat(item.slotDate)}
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl px-3 py-2">
                <p className="text-[10px] uppercase tracking-wide text-gray-400 font-semibold">Fees</p>
                <p className="text-sm font-bold text-blue-900 mt-0.5">₹{item.amount}</p>
              </div>
            </div>

            {/* TIME + ACTIONS ROW */}
            <div className="mt-3 flex items-center justify-between gap-3">
              <p className="text-xs text-gray-500">
                <span className="font-medium text-gray-700">{item.slotTime}</span>
              </p>

              {/* ACTION BUTTONS — sirf active appointments ke liye */}
              {!item.cancelled && !item.isCompleted && (
                <div className="flex gap-2">
                  {item.payment && (
                    <button
                      onClick={() => AppComplete(item._id)}
                      className="px-3 py-1.5 rounded-xl bg-gray-900 hover:bg-black text-white text-xs font-medium transition"
                    >
                      Complete
                    </button>
                  )}
                  <button
                    onClick={() => AppCancel(item._id)}
                    className="px-3 py-1.5 rounded-xl border border-red-200 text-red-500 hover:bg-red-50 text-xs font-medium transition"
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
);
};

export default DoctorAppointment;