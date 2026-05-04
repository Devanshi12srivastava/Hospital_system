import React, { useContext, useEffect, useState } from "react";
import { cancelAppoint, completeAppoint, doctorAppointments } from "../../api/Allappointment";
import { toast } from "react-toastify";
import { DoctorContext } from "../../context/DoctorContaext";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets_admin/assets";


const DoctorAppointment = () => {

  const { dToken, backendUrl } = useContext(DoctorContext);

  const {calculateAge,slotDateFormat,AppComplete,AppCancel}=useContext(AppContext)

 



  useEffect(() => {
    if (dToken) {
      AppointmentDoctor();
    }
  }, [dToken]);

  return (
    <>
      <div className="w-full max-w-6xl m-5">
  <p className="px-6 py-3 font-semibold text-gray-700 border-b">
    All Appointments
  </p>

  <div className="bg-white rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-auto">

    {/* HEADER */}
    <div className="hidden sm:grid grid-cols-[40px_2fr_1fr_80px_2.5fr_1fr_1fr] px-6 py-3 border-b font-semibold text-gray-600">
      <p>#</p>
      <p>Patient</p>
      <p>Payment</p>
      <p>Age</p>
      <p>Date & Time</p>
      <p>Fees</p>
      <p>Action</p>
    </div>

    {/* ROWS */}
    {docAppointment.reverse().map((item, index) => (
      <div
        key={index}
        className="grid grid-cols-[40px_2fr_1fr_80px_2.5fr_1fr_1fr] items-center gap-3 px-4 py-3 border-b hover:bg-gray-50"
      >
        {/* Index */}
        <p className="text-gray-600">{index + 1}</p>

        {/* Patient */}
        <div className="flex items-center gap-2 min-w-0">
          <img
            className="w-8 h-8 rounded-full object-cover"
            src={item.userData.image}
            alt=""
          />
          <p className="truncate font-medium text-gray-700">
            {item.userData.name}
          </p>
        </div>

        {/* Payment */}
        <p className="text-gray-600">
          {item.payment ? "Online" : "Cash"}
        </p>

        {/* Age */}
        <p className="text-gray-600 max-sm:hidden">
          {calculateAge(item.userData.dob)}
        </p>

        {/* Date & Time */}
        <p className="text-gray-600 whitespace-nowrap">
          {slotDateFormat(item.slotDate)}, {item.slotTime}
        </p>

        {/* Fees */}
        <p className="text-green-600 font-medium">
          ₹{item.amount}
        </p>
         {item.cancelled ? <p className="text-red-600 font-semibold text-sm">Cancelled</p> : item.isCompleted ? <p className="text-green-600 font-semibold text-sm">Completed</p>:<div className="flex gap-2">
          <img onClick={()=>AppCancel(item._id)}
            className="w-10 cursor-pointer hover:scale-110 transition"
            src={assets.cancel_icon}
            alt="cancel"
          />
          <img onClick={()=>AppComplete(item._id)}
            className="w-10 cursor-pointer hover:scale-110 transition"
            src={assets.tick_icon}
            alt="tick"
          />
        </div>}

      
        
      </div>
    ))}
  </div>
</div>
    </>
  );
};

export default DoctorAppointment;
