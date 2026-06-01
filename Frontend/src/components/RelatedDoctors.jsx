import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const RelatedDoctors = ({ docId, speciality }) => {
  const { doctors } = useContext(AppContext);
  const [relDoc, setrelDoc] = useState([]);
  const navigate = useNavigate();
  console.log(doctors);
console.log("spec",speciality);
console.log(docId);

useEffect(() => {

  if (doctors.length > 0 && speciality) {

    const doctorsData = doctors.filter((doc) => {

      console.log(
        doc.name,
        doc.speciality,
        speciality,
        doc._id,
        docId
      );

      return (
        doc.speciality?.trim().toLowerCase() ===
          speciality?.trim().toLowerCase() &&
        doc._id !== docId
      );
    });

    console.log("Filtered:", doctorsData);

    setrelDoc(doctorsData);
  }

}, [doctors, speciality, docId]);


  return (
   <div className="flex flex-col items-center gap-4 my-16 text-gray-800 py-12 px-4">
  
  {/* Heading */}
  <span className="px-4 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium">
    Expert Doctors
  </span>

  <h1 className="text-4xl font-semibold text-blue-700 text-center">
    Your Top Doctors
  </h1>

  <p className="max-w-2xl text-center text-gray-500">
    Connect with experienced healthcare professionals dedicated to
    providing exceptional medical care and personalized treatment.
  </p>

  {/* Doctors Grid */}
  <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-6">
    
    {relDoc.length === 0 ? (
      <p className="text-gray-600 font-semibold text-center col-span-full">
        No Related Doctors Found
      </p>
    ) : (
      relDoc.slice(0, 5).map((item, idx) => (
        <div
          key={idx}
          onClick={() => {
            navigate(`/appointment/${item._id}`);
            scrollTo(0, 0);
          }}
          className="bg-white shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden border border-gray-100"
        >
          
          {/* Image */}
          <div className="relative bg-linear-to-b from-blue-50 to-white flex justify-center pt-6">
            <img
              src={item.image}
              alt={item.name}
              className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md"
            />
          </div>

          {/* Content */}
          <div className="p-4 text-center">

            {/* Availability */}
            <div className="flex justify-center items-center gap-2 text-xs mb-2">
              <span
                className={`w-2.5 h-2.5 rounded-full ${
                  item.available ? "bg-green-400" : "bg-red-400"
                }`}
              ></span>

              <span className="text-gray-500">
                {item.available ? "Available" : "Unavailable"}
              </span>
            </div>

            {/* Name */}
            <h3 className="text-gray-900 font-semibold text-base">
              {item.name}
            </h3>

            {/* Speciality */}
            <p className="text-gray-500 text-sm mt-1">
              {item.speciality}
            </p>

            {/* Button */}
            <button className="mt-4 w-40 py-2 text-sm font-semibold bg-blue-700 text-white hover:bg-blue-600 transition cursor-pointer">
              Book Appointment
            </button>
          </div>
        </div>
      ))
    )}
  </div>

  {/* More Button */}
  <button
    className="mt-8 px-8 py-3 bg-blue-600 text-white font-medium rounded-full hover:bg-blue-700 transition cursor-pointer"
    onClick={() => {
      navigate("/doctors");
      scrollTo(0, 0);
    }}
  >
    More Doctors
  </button>

</div>
  );
};

export default RelatedDoctors;
