import React from "react";
import { specialityData } from "../assets/assets/assets";
import { Link } from "react-router-dom";

const Speciality = () => {
  return (
    <div
      className="flex flex-col items-center gap-4 py-16 text-gray-800"
      id="speciality"
    >
      <h1 className="text-3xl font-medium text-blue-800">Find By Specialty</h1>
      <p className="sm-1/3 text-center">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nihil quod
        omnis iure, quasi eaque numquam consequuntur nobis inventore aspernatur
        ipsum pariatur. Dolorem mollitia iusto quas saepe estn
      </p>
      <div className="flex sm:justify-center gap-8 pt-4">
        {specialityData.map((item, idx) => (
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
            <p>{item.speciality}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Speciality;
