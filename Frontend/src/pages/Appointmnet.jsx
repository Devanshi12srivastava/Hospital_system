import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets/assets";
import RelatedDoctors from "../components/RelatedDoctors";
import { toast } from "react-toastify";
import { appointmentBook } from "../api/appointmentBookApi";

const Appointmnet = () => {
  const { docId } = useParams();
  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { doctors, backendUrl, token, getDoctorsData ,doctorerror,pageLoading} = useContext(AppContext);
  const daysOfweek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

  const navigate = useNavigate();

  const fetchDocInfo = async () => {
    const docInfo = doctors.find((doc) => doc._id === docId);
    setDocInfo(docInfo);
    console.log(docInfo);
  };

  const getAvailableSlots = async () => {
    console.log("Function called ✅");
    let slotsData = [];
    let today = new Date();

    for (let i = 0; i < 30; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      // End time (9 PM)
      let endTime = new Date(today);
      endTime.setDate(today.getDate() + i);
      endTime.setHours(22, 0, 0, 0);

      // ✅ If TODAY → start from next valid slot
      if (i === 0) {
        currentDate.setHours(
          today.getHours() >= 10 ? today.getHours() + 1 : 10,
        );

        currentDate.setMinutes(today.getMinutes() > 30 ? 30 : 0);
      } else {
        // ✅ Future days → start 10 AM
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      let timeSlot = [];

      // ✅ Generate 30-min slots
      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
        let day = currentDate.getDate();
        let month = currentDate.getMonth() + 1;
        let year = currentDate.getFullYear();

        const slotDate = day + "_" + month + "_" + year;
        const slotTime = formattedTime;

        const isSlotAvailable =
          docInfo.slots_booked[slotDate] &&
          docInfo.slots_booked[slotDate].includes(slotTime)
            ? false
            : true;

        if (isSlotAvailable) {
          timeSlot.push({
            datetime: new Date(currentDate),
            time: formattedTime,
          });
        }

        // ✅ VERY IMPORTANT → increment
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      slotsData.push(timeSlot);
    }

    console.log("Generated Slots", slotsData);

    setDocSlots(slotsData);
  };

  const bookAppointment = async () => {
    if (!token) {
      toast.warn("login to book appointment");
      return naviagte("/login");
    }
    try {
      setLoading(true);
      setError(null);
      const date = docSlots[slotIndex][0].datetime;
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
      const slotDate = day + "_" + month + "_" + year;
      console.log(slotDate);

      const response = await appointmentBook(
        backendUrl,
        docId,
        slotDate,
        slotTime,
        token,
      );
      const data = response.data;
      if (data.success) {
        toast.success(data.message);
        getDoctorsData();
        navigate("/my-appointments");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      setError(
        error.response?.data?.message || error.message || "something wrong",
      );
      toast.error(
        error.response?.data?.message || error.message || "something wrong",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (docInfo) {
      getAvailableSlots();
    }
  }, [docInfo]);

  useEffect(() => {
    console.log(docSlots);
  }, [docSlots]);

  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);



  if (pageLoading) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-lg font-medium text-blue-600">
        Loading Doctors...
      </p>
    </div>
  );
}

if (doctorerror) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-red-500">
        {doctorError}
      </p>
    </div>
  );
}
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="bg-white border border-red-200 shadow-lg rounded-2xl p-8 max-w-md w-full text-center">
          <h1 className="text-2xl font-bold text-red-500">Error</h1>

          <p className="text-gray-700 mt-4 wrap-break-word">{error}</p>
        </div>
      </div>
    );
  }
  return (
    <div>
      <div className="flex flex-col mt-25 sm:flex-row gap-4 ">
        <div>
          <img
            className="bg-blue-400 w-full sm:max-w-72 rounded-lg mx-2"
            src={docInfo?.image}
            alt=""
          />
        </div>
        <div className="flex-1 border border-gray-400 rounded-lg shadow-sm px-4 py-7 bg-white mx-2 sm:mx-0 -mt-20 sm:mt-0 ">
         
          <p className="flex items-center gap-2 text-2xl font-medium text-gray-900 ">
            {docInfo?.name}{" "}
            <img className="w-5" src={assets.verified_icon} alt="" />
          </p>
          <div className="flex items-center gap-2 text-sm mt-1 text-gray-700">
            <p>
              {docInfo?.degree}-{docInfo?.speciality}
            </p>
            <button className="border border-blue-900 rounded-4xl px-5 py-1 text-xs">
              {docInfo?.experience}
            </button>
          </div>
          <div>
            <p className="flex items-center gap-1 text-sm font-medium text-gray-700 mt-3">
              About <img src={assets.info_icon} alt="" />
            </p>
            <p className="text-sm text-gray-600 mt-4">{docInfo?.about}</p>
          </div>
          <p className="font-medium mt-3">
            Fee: <span>${docInfo?.fees}</span>
          </p>
        </div>
      </div>
      {/* SLOTS */}
      <div className="sm:ml-72 sm:pl-4 mt-6 max-w-3xl">
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5">
          {/* Heading */}
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-lg font-semibold text-gray-800">
                Book Appointment
              </h2>
              <p className="text-sm text-gray-500">Select date & time</p>
            </div>

            <div className="bg-blue-50 p-2 rounded-xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.8}
                stroke="currentColor"
                className="w-5 h-5 text-blue-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 6.75V4.5m7.5 2.25V4.5M3.75 9.75h16.5M4.5 6h15A1.5 1.5 0 0121 7.5v11.25A1.5 1.5 0 0119.5 20.25h-15A1.5 1.5 0 013 18.75V7.5A1.5 1.5 0 014.5 6z"
                />
              </svg>
            </div>
          </div>

          {/* Date Selection */}
          <div>
            <p className="text-sm font-medium text-gray-700 mb-3">
              Available Dates
            </p>

            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
              {docSlots.length !== 0 ? (
                docSlots.map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => setSlotIndex(idx)}
                    className={`min-w-18 rounded-2xl border cursor-pointer text-center py-3 transition-all duration-200
              
              ${
                slotIndex === idx
                  ? "bg-blue-600 border-blue-600 text-white shadow-md"
                  : "bg-white border-gray-200 hover:border-blue-300 hover:bg-blue-50"
              }
            `}
                  >
                    <p
                      className={`text-xs font-medium ${
                        slotIndex === idx ? "text-blue-100" : "text-gray-500"
                      }`}
                    >
                      {item[0] && daysOfweek[item[0].datetime.getDay()]}
                    </p>

                    <h3 className="text-xl font-bold mt-1">
                      {item[0] && item[0].datetime.getDate()}
                    </h3>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">No slots available</p>
              )}
            </div>
          </div>

          {/* Time Slots */}
          <div className="mt-6">
            <p className="text-sm font-medium text-gray-700 mb-3">
              Available Time
            </p>

            <div className="flex flex-wrap gap-3">
              {docSlots.length !== 0 &&
                docSlots[slotIndex].map((el, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSlotTime(el.time)}
                    className={`px-4 py-2 rounded-full text-sm border transition-all duration-200 cursor-pointer
              
              ${
                el.time === slotTime
                  ? "bg-blue-400 text-white border-blue-500 shadow-sm"
                  : "bg-gray-50 text-gray-700 border-gray-200 hover:border-blue-300 hover:bg-blue-50"
              }
            `}
                  >
                    {el.time.toLowerCase()}
                  </button>
                ))}
            </div>
          </div>

          {/* Selected Slot */}
          {slotTime && (
            <div className="mt-5 flex items-center justify-between bg-blue-50 border border-blue-100 rounded-xl px-4 py-3">
              <div>
                <p className="text-xs text-gray-500">Selected Slot</p>

                <p className="text-sm font-semibold text-gray-800">
                  {docSlots[slotIndex][0]?.datetime.toDateString()} •{" "}
                  {slotTime.toLowerCase()}
                </p>
              </div>

              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
          )}

          {/* Button */}
          <button
            disabled={loading}
            onClick={bookAppointment}
            className="w-full mt-6 bg-blue-500 hover:bg-blue-700 cursor-pointer disabled:bg-blue-400 disabled:cursor-not-allowed text-white py-3 rounded-xl font-medium transition-all duration-300 shadow-sm flex items-center justify-center gap-2"
          >
            {loading && (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            )}

            {loading ? "Booking Please Wait..." : "Confirm Appointment"}
          </button>
        </div>
      </div>
      <RelatedDoctors docId={docId} speciality={docInfo?.speciality} />
    </div>
  );
};

export default Appointmnet;
