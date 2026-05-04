import React, { useContext, useEffect, useState } from "react";
import { doctorDashboardApi } from "../../api/DoctorDashboardApi";
import { DoctorContext } from "../../context/DoctorContaext";
import { assets } from "../../assets/assets_admin/assets";
import { AppContext } from "../../context/AppContext";

const DoctorDashboard = () => {
  const { backendUrl, dToken } = useContext(DoctorContext);
  console.log("Backend URL:", backendUrl);
  const [dashData, setDashData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { slotDateFormat } = useContext(AppContext);

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

  useEffect(() => {
    console.log("useEffect run");
    console.log("dToken:", dToken);

    if (dToken) {
      console.log("Calling API...");
      getDashBoardData();
    }
  }, [dToken]);
  return (
    dashData && (
      <div className="m-5">
        <div className="p-6 bg-gray-100 min-h-screen">
          {/* Top Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {/* Doctors */}
            <div className="flex items-center gap-4 bg-white p-5 rounded-2xl shadow hover:shadow-md transition">
              <img className="w-12 h-12" src={assets.earning_icon} alt="" />
              <div>
                <p className="text-2xl font-bold text-gray-700">
                  {dashData.earnings}
                </p>
                <p className="text-gray-400 text-sm">Earnings</p>
              </div>
            </div>

            {/* Appointments */}
            <div className="flex items-center gap-4 bg-white p-5 rounded-2xl shadow hover:shadow-md transition">
              <img className="w-12 h-12" src={assets.appointment_icon} alt="" />
              <div>
                <p className="text-2xl font-bold text-gray-700">
                  {dashData.appointments}
                </p>
                <p className="text-gray-400 text-sm">Appointments</p>
              </div>
            </div>

            {/* Patients */}
            <div className="flex items-center gap-4 bg-white p-5 rounded-2xl shadow hover:shadow-md transition">
              <img className="w-12 h-12" src={assets.patients_icon} alt="" />
              <div>
                <p className="text-2xl font-bold text-gray-700">
                  {dashData.patients}
                </p>
                <p className="text-gray-400 text-sm">Patients</p>
              </div>
            </div>
          </div>
          <div className="pt-4 border border-t-0">
            {dashData?.latestAppointments?.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-4 hover:bg-gray-50 transition"
              >
                <img
                  className="w-12 h-12 rounded-full object-cover"
                  src={item.userData.image}
                  alt=""
                />

                <div className="flex-1">
                  <p className="font-medium text-gray-800">{item.name}</p>

                  <p className="text-sm text-gray-400">
                    {slotDateFormat(item.slotDate)} | {item.slotTime}
                  </p>
                </div>
                {item.cancelled ? (
                  <p className="text-red-600 font-semibold text-sm">
                    Cancelled
                  </p>
                ) : item.isCompleted ? (
                  <p className="text-green-600 font-semibold text-sm">
                    Completed
                  </p>
                ) : (
                  <div className="flex gap-2">
                    {/* ✅ Tick only if payment done */}
                    {item.payment ? (
                      <img
                        onClick={() => AppComplete(item._id)}
                        className="w-10 cursor-pointer hover:scale-110 transition"
                        src={assets.tick_icon}
                        alt="complete"
                      />
                    ) : (
                      <p className="text-xs text-orange-500">Payment Pending</p>
                    )}

                    {/* Cancel always allowed */}
                    <img
                      onClick={() => AppCancel(item._id)}
                      className="w-10 cursor-pointer hover:scale-110 transition"
                      src={assets.cancel_icon}
                      alt="cancel"
                    />
                  </div>
                )}
                {/* Status */}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  );
};
export default DoctorDashboard;
