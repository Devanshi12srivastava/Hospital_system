import React, { useState, useContext, useEffect } from "react";
import { allAppointmentApi } from "../../api/Allappointment";
import { toast } from "react-toastify";
import { AdminContext } from "../../context/AdminContext";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets_admin/assets";
import { appointmentCancelApi } from "../../api/CancelApp";

const AllApointment = () => {
  const { backendUrl, adminToken } = useContext(AdminContext);
  const { calculateAge, slotDateFormat,error,loading,setError,setLoading } = useContext(AppContext);

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


  if (loading ||  Object.keys(appointments).length === 0) {
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
<div className="w-full px-4  sm:px-6 lg:px-8 py-6 min-h-screen">

  {/* HEADER */}
  <div className="flex flex-col mt-20 xl:flex-row xl:items-center xl:justify-between gap-6 mb-8">

    <div>
      <h1 className="text-2xl sm:text-2xl font-bold text-blue-700 tracking-tight">
        Appointment Dashboard
      </h1>

      <p className="text-gray-500 mt-2 text-sm sm:text-base">
        Monitor appointments, patient activity and doctor schedules.
      </p>
    </div>

    <div className="flex items-center gap-3 flex-wrap">

    </div>
  </div>

  {/* STATS */}
<div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">

  {/* TOTAL */}
  <div className="group bg-white p-5 border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
    
    <div className="flex items-center justify-between">

      <div>
        <p className="text-sm font-medium text-gray-500">
          Total Appointments
        </p>

        <h2 className="text-3xl font-bold text-gray-900 mt-2">
          {appointments.length}
        </h2>

        <p className="text-xs text-gray-400 mt-2">
          Overall appointments
        </p>
      </div>

      <div className="w-10 h-10 rounded-2xl bg-linear-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-md shadow-blue-200">
        <img
          src={assets.appointments_icon}
          alt=""
          className="w-5 brightness-0 invert"
        />
      </div>
    </div>
  </div>

  {/* APPROVED */}
  <div className="group bg-white p-5 border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">

    <div className="flex items-center justify-between">

      <div>
        <p className="text-sm font-medium text-gray-500">
          Approved
        </p>

        <h2 className="text-3xl font-bold text-gray-900 mt-2">
          {
            appointments.filter(
              (item) => !item.cancelled && !item.isCompleted
            ).length
          }
        </h2>

        <p className="text-xs text-emerald-500 mt-2 font-medium">
          Active bookings
        </p>
      </div>

      <div className="w-10 h-10 rounded-2xl bg-linear-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-md shadow-emerald-200">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-7 h-7 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>
    </div>
  </div>

  {/* COMPLETED */}
  <div className="group bg-white p-5 border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">

    <div className="flex items-center justify-between">

      <div>
        <p className="text-sm font-medium text-gray-500">
          Completed
        </p>

        <h2 className="text-3xl font-bold text-gray-900 mt-2">
          {
            appointments.filter(
              (item) => item.isCompleted
            ).length
          }
        </h2>

        <p className="text-xs text-violet-500 mt-2 font-medium">
          Successfully finished
        </p>
      </div>

      <div className="w-10 h-10 rounded-2xl bg-linear-to-br from-violet-500 to-violet-600 flex items-center justify-center shadow-md shadow-violet-200">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-7 h-7 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12l2 2 4-4"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 12c0 1.66-.67 3.16-1.76 4.24A5.98 5.98 0 0112 21a5.98 5.98 0 01-7.24-4.76A6 6 0 1112 6"
          />
        </svg>
      </div>
    </div>
  </div>

  {/* CANCELLED */}
  <div className="group bg-white p-5 border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">

    <div className="flex items-center justify-between">

      <div>
        <p className="text-sm font-medium text-gray-500">
          Cancelled
        </p>

        <h2 className="text-3xl font-bold text-gray-900 mt-2">
          {
            appointments.filter(
              (item) => item.cancelled
            ).length
          }
        </h2>

        <p className="text-xs text-red-500 mt-2 font-medium">
          Cancelled bookings
        </p>
      </div>

      <div className="w-10 h-10 rounded-2xl bg-linear-to-br from-red-500 to-red-600 flex items-center justify-center shadow-md shadow-red-200">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-7 h-7 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </div>
    </div>
  </div>
</div>

  {/* TABLE SECTION */}
  <div className="bg-white border border-gray-200 overflow-hidden shadow-sm">

    {/* TOP BAR */}
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 px-6 py-5 border-b border-gray-200 bg-white">

      <div>
        <h2 className="text-xl font-bold text-gray-900">
          Recent Appointments
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          Detailed list of all patient appointments.
        </p>
      </div>
{/* 
      <div className="flex items-center gap-3">

        <input
          type="text"
          placeholder="Search patient..."
          className="h-11 px-4 rounded-2xl border border-gray-200 outline-none focus:border-blue-500 text-sm w-full sm:w-65"
        />

        <button className="h-11 px-5 rounded-2xl bg-gray-900 text-white text-sm font-medium hover:bg-black transition">
          Filter
        </button>
      </div> */}
    </div>

    {/* TABLE HEADER */}
    <div className="hidden lg:grid grid-cols-[70px_2.5fr_100px_2fr_2fr_120px_130px] items-center px-6 py-4 bg-gray-50 border-b border-gray-200 text-xs font-bold uppercase tracking-wider text-gray-500">

      <p>ID</p>
      <p>Patient</p>
      <p>Age</p>
      <p>Date</p>
      <p>Doctor</p>
      <p>Fees</p>
      <p className="text-center">Status</p>
    </div>

    {/* LIST */}
    <div className="divide-y divide-gray-100">

      {appointments.map((item, idx) => (
        <div
          key={idx}
          className="hover:bg-blue-50/40 transition-all duration-200"
        >

          {/* DESKTOP */}
          <div className="hidden lg:grid grid-cols-[70px_2.5fr_100px_2fr_2fr_120px_130px] items-center gap-4 px-6 py-5">

            <p className="font-semibold text-gray-500">
              {idx + 1}
            </p>

            {/* PATIENT */}
            <div className="flex items-center gap-4 min-w-0">

              <img
                src={item.userData.image}
                alt=""
                className="w-14 h-14 rounded-2xl object-cover border border-gray-200"
              />

              <div className="min-w-0">
                <h3 className="font-semibold text-gray-900 truncate">
                  {item.userData.name}
                </h3>

                <p className="text-sm text-gray-500">
                  Patient
                </p>
              </div>
            </div>

            {/* AGE */}
            <p className="font-medium text-gray-700">
              {calculateAge(item.userData.dob)} yrs
            </p>

            {/* DATE */}
            <div>
              <p className="font-semibold text-gray-900">
                {slotDateFormat(item.slotDate)}
              </p>

              <p className="text-sm text-blue-600 mt-1">
                {item.slotTime}
              </p>
            </div>

            {/* DOCTOR */}
            <div className="flex items-center gap-4 min-w-0">

              <img
                src={item.docData.image}
                alt=""
                className="w-14 h-14 rounded-2xl object-cover border border-gray-200"
              />

              <div className="min-w-0">
                <h3 className="font-semibold text-gray-900 truncate">
                  {item.docData.name}
                </h3>

                <p className="text-sm text-gray-500">
                  Doctor
                </p>
              </div>
            </div>

            {/* FEES */}
            <p className="text-lg font-bold text-emerald-600">
              ₹{item.docData.fees}
            </p>

            {/* STATUS */}
            <div className="flex justify-center">

              {item.cancelled ? (
                <span className="bg-red-50 text-red-600 border border-red-100 px-4 py-2 rounded-xl text-xs font-semibold">
                  Cancelled
                </span>
              ) : item.isCompleted ? (
                <span className="bg-emerald-50 text-emerald-600 border border-emerald-100 px-4 py-2 rounded-xl text-xs font-semibold">
                  Completed
                </span>
              ) : (
                <button
                  onClick={() => AppointCancel(item._id)}
                  className= "hover:bg-red-100 p-3 transition cursor-pointer"
                >
                  <img
                    src={assets.cancel_icon}
                    alt=""
                    className="w-10 h-10"
                  />
                </button>
              )}
            </div>
          </div>

          {/* MOBILE CARD */}
          <div className="lg:hidden p-4">

            <div className="bg-white border border-gray-200 rounded-3xl p-4">

              {/* TOP */}
              <div className="flex items-start justify-between gap-3">

                <div className="flex items-center gap-3 min-w-0">

                  <img
                    src={item.userData.image}
                    alt=""
                    className="w-14 h-14 rounded-2xl object-cover border border-gray-200"
                  />

                  <div className="min-w-0">
                    <h3 className="font-semibold text-gray-900 truncate">
                      {item.userData.name}
                    </h3>

                    <p className="text-sm text-gray-500 mt-1">
                      {calculateAge(item.userData.dob)} yrs
                    </p>
                  </div>
                </div>

                <span className="bg-gray-100 text-gray-600 text-xs font-semibold px-3 py-1 rounded-full">
                  #{idx + 1}
                </span>
              </div>

              {/* DETAILS */}
              <div className="grid grid-cols-2 gap-3 mt-5">

                <div className="bg-gray-50 rounded-2xl p-4">
                  <p className="text-xs text-gray-500 uppercase">
                    Schedule
                  </p>

                  <p className="text-sm font-semibold text-gray-900 mt-2">
                    {slotDateFormat(item.slotDate)}
                  </p>

                  <p className="text-xs text-blue-600 mt-1">
                    {item.slotTime}
                  </p>
                </div>

                <div className="bg-gray-50 rounded-2xl p-4">
                  <p className="text-xs text-gray-500 uppercase">
                    Fees
                  </p>

                  <p className="text-2xl font-bold text-emerald-600 mt-2">
                    ₹{item.docData.fees}
                  </p>
                </div>
              </div>

              {/* DOCTOR */}
              <div className="mt-4 flex items-center justify-between bg-gray-50 rounded-2xl p-4 gap-3">

                <div className="flex items-center gap-3 min-w-0">

                  <img
                    src={item.docData.image}
                    alt=""
                    className="w-12 h-12 rounded-xl object-cover border border-gray-200"
                  />

                  <div className="min-w-0">
                    <p className="text-xs text-gray-500 uppercase">
                      Doctor
                    </p>

                    <h3 className="font-semibold text-gray-900 truncate">
                      {item.docData.name}
                    </h3>
                  </div>
                </div>

                {item.cancelled ? (
                  <span className="bg-red-50 text-red-600 border border-red-100 px-3 py-2 rounded-xl text-xs font-semibold">
                    Cancelled
                  </span>
                ) : item.isCompleted ? (
                  <span className="bg-emerald-50 text-emerald-600 border border-emerald-100 px-3 py-2 rounded-xl text-xs font-semibold">
                    Completed
                  </span>
                ) : (
                  <button
                    onClick={() => AppointCancel(item._id)}
                    className="bg-red-50 hover:bg-red-100 border border-red-100 p-3 rounded-xl transition"
                  >
                    <img
                      src={assets.cancel_icon}
                      alt=""
                      className="w-5 h-5"
                    />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>
  );
};

export default AllApointment;
