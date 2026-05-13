import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Doctors = () => {
  const { speciality } = useParams();
  console.log(speciality);
  const [filterDoc, setFilterDoc] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const { doctors } = useContext(AppContext);
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

  return (
    <div>
      <p className="text-gray-700 mx-6 font-medium">
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

  {/* Filter Container */}
  <div
    className={`flex flex-col gap-3 text-sm text-gray-600 
    ${showFilter ? "flex" : "hidden sm:flex"}
    bg-white border border-gray-100 shadow-sm rounded-2xl p-4`}
  >

    {[
      "General physician",
      "Neurologist",
      "Cardiologist",
      "Dermatologist",
      "Gasterologist",
      "Pediatricians",
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
          ${speciality === item ? "bg-blue-600 text-white border-blue-600 shadow-sm" : "bg-white border-gray-200"}
        `}
      >
        {item}
      </p>
    ))}

  </div>


        <div className="w-full  grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 pt-5 gap-y-6 px-4 sm:px-0">
          {filterDoc.map((item, idx) => (
            <div
              onClick={() => navigate(`/appointment/${item._id}`)}
              className="border border-blue-200 my-10 rounded-2xl overflow-hidden cursor-pointer"
              key={idx}
            >
              <img className="bg-blue-100" src={item.image} alt="" />
              <div className="p-4">
                <div className="flex items-center gap-2 text-sm text-center">
                  <p className="w-4 h-4 bg-green-300 rounded-full"></p>
                  <p>Available</p>
                </div>
                <p className="text-gray-900 text-lg font-medium">{item.name}</p>
                <p className="text-gray-800 text-sm font-medium">
                  {item.speciality}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Doctors;
