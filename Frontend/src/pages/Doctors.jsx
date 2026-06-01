import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Doctors = () => {
  const { speciality } = useParams();
  console.log(speciality);
  const [filterDoc, setFilterDoc] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const { doctors,doctorerror,pageLoading } = useContext(AppContext);
  const navigate = useNavigate();

  
  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(doctors.filter((doc) => doc.speciality === speciality));
    } else {
      setFilterDoc(doctors);
    }
  };

  useEffect(() => {
    applyFilter();
  }, [doctors, speciality]);


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
 return (
  <div className="mt-10">
    <p className="text-gray-700 mx-6 font-medium text-lg">
      Doctors Speciality
    </p>

    <div className="flex flex-col sm:flex-row items-start gap-6 mt-6 mx-6">

      {/* Mobile Filter Button */}
      <button
        className={`sm:hidden px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200
        ${showFilter ? "bg-blue-600 text-white shadow-md" : "bg-white text-gray-700"}`}
        onClick={() => setShowFilter((prev) => !prev)}
      >
        Filters
      </button>

      {/* FILTER BOX (same as yours) */}
      <div
        className={`flex flex-col gap-3 text-sm text-gray-600 
        ${showFilter ? "flex" : "hidden sm:flex"}
        bg-white border border-gray-100 shadow-sm rounded-2xl p-4`}
      >
        {[
          "General Physician",
          "Neurologist",
          "Cardiologist",
          "Dermatologist",
          "Gastroenterologist",
          "Pediatrician",
          "Gynecologist",
          "Endocrinologist",
          "Anesthesiologist",
          "Pulmonologist",
          "ENT Specialist",
          "Psychiatrist",
          "Rheumatologist",
          "Ophthalmologist"
        ].map((item, idx) => (
          <p
            key={idx}
            onClick={() =>
              speciality === item
                ? navigate("/doctors")
                : navigate(`/doctors/${item}`)
            }
            className={`
              px-4 py-2 rounded-full cursor-pointer transition-all duration-200 border
              hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600
              ${speciality === item
                ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                : "bg-white border-gray-200"}
            `}
          >
            {item}
          </p>
        ))}
      </div>

      {/* DOCTOR GRID (UPDATED UI LIKE IMAGE) */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

        {filterDoc.map((item, idx) => (
          <div
            key={idx}
            onClick={() => navigate(`/appointment/${item._id}`)}
            className="bg-white shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden border border-gray-100"
          >

            {/* IMAGE */}
            <div className="relative bg-linear-to-b from-blue-50 to-white flex justify-center pt-6">
              <img
                src={item.image}
                alt=""
                className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md"
              />
            </div>

            {/* CONTENT */}
            <div className="p-4 text-center">
              
              {/* availability */}
              <div className="flex justify-center items-center gap-2 text-xs mb-2">
                <span className="w-2.5 h-2.5 bg-green-400 rounded-full"></span>
                <span className="text-gray-500">Available</span>
              </div>

              {/* name */}
              <h3 className="text-gray-900 font-semibold text-base">
                {item.name}
              </h3>

              {/* speciality */}
              <p className="text-gray-500 text-sm mt-1">
                {item.speciality}
              </p>

              {/* button */}
              <button className="mt-4 w-40 py-2 text-sm font-semibold bg-blue-700 text-white hover:bg-blue-600 transition cursor-pointer">
               Book Appointment
              </button>
            </div>
          </div>
        ))}

      </div>
    </div>
  </div>
);
};

export default Doctors;
