import React, { useState } from "react";
import { specialityData } from "../assets/assets/assets";
import { Link } from "react-router-dom";

const Speciality = () => {

  return (
    
    <div
  className="flex flex-col items-center gap-4 py-16 px-4 text-gray-800"
  id="speciality"
>
  <h1 className="text-3xl font-medium text-blue-600 text-center">
    Find By Specialty
  </h1>

  <p className="w-full sm:w-1/2 text-center text-sm sm:text-base text-gray-600">
 Find your best doctor according to specialist.
  </p>

  {/* Responsive Scroll */}
  <div className="w-full overflow-x-auto">
    
    <div className="flex sm:justify-center gap-8 pt-4 min-w-max sm:min-w-0">

      {specialityData.length===0 ? <p className="text-red-500 font-semibold mt-10">Sorry doctor does not available</p>:(specialityData.map((item, idx) => (
        <Link
          onClick={() => scrollTo(0, 0)}
          className="flex flex-col items-center text-xs shrink-0 hover:-translate-y-2.5 transition-all duration-500"
          key={idx}
          to={`/doctors/${item.speciality}`}
        >
          <img
            className="w-16 sm:w-24 mb-2 border border-blue-500 rounded-full shadow-lg"
            src={item.image}
            alt=""
          />

          <p className="text-lg text-gray-500">{item.speciality}</p>
        </Link>
      )))}

    </div>
  </div>
</div>
  );
};

export default Speciality;
