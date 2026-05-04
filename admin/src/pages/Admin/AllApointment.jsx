import React, { useState, useContext, useEffect } from "react";
import { allAppointmentApi } from "../../api/Allappointment";
import { toast } from "react-toastify";
import { AdminContext } from "../../context/AdminContext";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets_admin/assets";
import { appointmentCancelApi } from "../../api/CancelApp";

const AllApointment = () => {
  const { backendUrl, adminToken } = useContext(AdminContext);
  const { calculateAge, slotDateFormat } = useContext(AppContext);

  const [appointments, setAppoinment] = useState([]);

  const getAllAppointments = async () => {
    try {
      const response = await allAppointmentApi(backendUrl, adminToken);
      const data = response.data;

      if (data.success) {
        setAppoinment(data.appointment);
        console.log(data.appointment);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const AppointCancel = async (appointmentId) => {
    const response = await appointmentCancelApi(
      backendUrl,
      appointmentId,
      adminToken,
    );
    const data = response?.data;
    console.log("data", data);
    if (data.success) {
    
      getAllAppointments();
    } else {
      toast.error(data.message);
    }
  };

  useEffect(() => {
    if (adminToken) {
      getAllAppointments();
    }
  }, [adminToken]);

  return (
    <div>
      <p>All Appointments</p>
      <div className="bg-white border border-white rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll">
        {/* HEADER */}
        <div className="hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] py-3 px-6 border-b border-gray-300 font-semibold text-gray-600">
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor Name</p>
          <p>Fees</p>
          <p>Action</p>
        </div>

        {/* ROWS */}
        {appointments.map((item, idx) => (
          <div
            key={idx}
            className="grid grid-cols-[40px_2fr_80px_2.5fr_2fr_1fr_1fr_40px] items-center gap-3 py-3 px-4 border-b hover:bg-gray-100 text-sm"
          >
            {/* Index */}
            <p className="text-gray-600">{idx + 1}</p>

            {/* User */}
            <div className="flex items-center gap-2 min-w-0">
              <img
                className="w-8 h-8 rounded-full object-cover shrink-0"
                src={item.userData.image}
                alt="user"
              />
              <p className="text-gray-700 font-medium truncate">
                {item.userData.name}
              </p>
            </div>

            {/* Age */}
            <p className="text-gray-600 max-sm:hidden">
              {calculateAge(item.userData.dob)}
            </p>

            {/* Date & Time */}
            <p className="text-gray-600 whitespace-nowrap">
              {slotDateFormat(item.slotDate)}, {item.slotTime}
            </p>

            {/* Doctor Image */}
            <div className="flex justify-center">
              <img
                className="w-8 h-8 rounded-full object-cover bg-gray-200"
                src={item.docData.image}
                alt="doctor"
              />
            </div>

            {/* Doctor Name */}
            <p className="text-gray-700 truncate">{item.docData.name}</p>

            {/* Fees */}
            <p className="text-green-600 font-medium">₹{item.docData.fees}</p>
            {item.cancelled === true ? (
              <p className="text-rose-800 text-xs font-medium">Cancelled</p>
            ) : item.isCompleted ? <p className="text-green-600 text-xs font-medium">Completed</p>:(
              <img
                onClick={() => AppointCancel(item._id)}
                className="w-6 h-6 hover:scale-110 transition cursor-pointer"
                src={assets.cancel_icon}
                alt="cancel"
              />
            )}
            {/* Cancel (RIGHT END) */}
            {/* <div className="flex justify-end">
    
  </div> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllApointment;
