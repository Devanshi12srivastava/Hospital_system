import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets/assets";
import RelatedDoctors from "../components/RelatedDoctors";

const Appointmnet = () => {
  const { docId } = useParams();
  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");

  const { doctors } = useContext(AppContext);
  const daysOfweek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

  const fetchDocInfo = async () => {
    const docInfo = doctors.find((doc) => doc._id === docId);
    setDocInfo(docInfo);
    console.log(docInfo);
  };

  const getAvailableSlots = async () => {
    console.log("Function called ✅");
    let slotsData = []; // ✅ temp storage
    let today = new Date(); // current date/time

    for (let i = 0; i < 10; i++) {
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

        timeSlot.push({
          datetime: new Date(currentDate),
          time: formattedTime,
        });

        // ✅ VERY IMPORTANT → increment
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      slotsData.push(timeSlot); // ✅ store day's slots
    }

    console.log("Generated Slots →", slotsData);

    setDocSlots(slotsData); // ✅ single state update
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

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-4">
        <div>
          <img
            className="bg-blue-600 w-full sm:max-w-72 rounded-lg"
            src={docInfo?.image}
            alt=""
          />
        </div>
        <div className="flex-1 border border-gray-400 rounded-lg shadow-sm px-4 py-7 bg-white mx-2 sm:mx-0 -mt-20 sm:mt-0 ">
          {/* doc info */}
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
      <div className="sm:ml-72 sm:pl-4 mt-4 font-medium text-lg text-gray-700">
        <p>Booking slot</p>
        <div className="flex gap-3 items-center w-full overflow-x-auto mt-5">
          {docSlots.length !== 0 ? (
            docSlots.map((item, idx) => (
              <div
                onClick={() => setSlotIndex(idx)}
                className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex === idx ? "bg-blue-300 text-white border border-gray-400" : ""}`}
                key={idx}
              >
                <p>{item[0] && daysOfweek[item[0].datetime.getDay()]}</p>
                <p>{item[0] && item[0].datetime.getDate()}</p>
              </div>
            ))
          ) : (
            <p>No slot</p>
          )}
        </div>
        <div className="flex items-center gap-3 overflow-x-scroll mt-4">
          {docSlots.length &&
            docSlots[slotIndex].map((el, idx) => (
              <p onClick={()=>setSlotTime(el.time)}className={`text-sm font-light shrink-0 px-5 py-2 rounded-full cursor-pointer ${el.time===slotTime ? 'bg-blue-300 text-white':"text-gray-800"}`} key={idx}>{el.time.toLowerCase()}</p>
            ))}
        </div>
        <button className="border border-blue-400 bg-blue-400 rounded-full px-5 py-2 mt-4 font-medium text-white text-lg">Book Appointment</button>
      </div>
      <RelatedDoctors docId={docId} speciality={docInfo?.speciality}/>
    </div>
  );
};

export default Appointmnet;
