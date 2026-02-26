import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

const MyAppointment = () => {
  const { doctors } = useContext(AppContext);
  return (
    <div>
      <p className="font-medium text-gray-700 px-5 py-6 border-b border-b-gray-300">
        My Appointment
      </p>
      <div>
        {doctors.slice(0, 3).map((item, idx) => (
          <div
            className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2  border-b border-b-gray-200"
            key={idx}
          >
            <div>
              <img className="w-32 bg-blue-200" src={item.image} alt="" />
            </div>
            <div className="flex-2 text-sm text-zinc-600">
              <p className="text-neutral-800 font-semibold">{item.name}</p>
              <p className="text-zinc-700 font-medim mt-1">{item.speciality}</p>
              <p className="font-medium mt-2">Address</p>
              <p className="etxt-xs">{item.address.line1}</p>
              <p className="text-sm">{item.address.line2}</p>
              <p className="text-sm mt-2">
                <sapn className="text-sm text-neutral-700 font-medium">
                  Date and Time:{" "}
                </sapn>
                24,feb,2028
              </p>
            </div>
            <div></div>
            <div className="flex flex-col gap-2 justify-end">
              <button className="text-sm text-center sm:min-w-48  text-zinc-800 font-medium px-2 py-2 rounded-4xl border  border-blue-400 bg-white hover:bg-blue-500 hover:text-white transition-duration-200 cursor-pointer ">Pay Online</button>

              <button className="text-sm text-center sm:min-w-48 text-zinc-800 font-medium px-2 py-2 rounded-4xl border  border-red-500 bg-white hover:bg-red-500 hover:text-white transition-duration-200 cursor-pointer ">Cancel Appointment</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAppointment;
