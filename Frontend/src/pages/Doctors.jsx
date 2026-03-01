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
      <p className="text-gray-700 mx-6">Doctors specialist</p>
      <div className="flex flex-col sm:flex-row items-start gap-5 mt-5 mx-6">
        <button
          className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${showFilter ? "bg-blue-500 text-white" : ""}`}
          onClick={() => setShowFilter((prev) => !prev)}
        >
          Filters
        </button>
        <div className={`flex-col gap-4 text-sm text-gray-600 ${showFilter?'flex':'hidden sm:flex'}`}>
          <p
            onClick={() =>
              speciality === "General physician"
                ? navigate("/doctors")
                : navigate("/doctors/General physician")
            }
            className={`w-[94vm] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded tarnsition-all cursor-pointer ${speciality === "General physician" ? "bg-blue-300 text-black" : ""}`}
          >
            General physician
          </p>
          <p
            onClick={() =>
              speciality === "Neurologist"
                ? navigate("/doctors")
                : navigate("/doctors/Neurologist")
            }
            className={`w-[94vm] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded tarnsition-all cursor-pointer ${speciality === "Neurologist" ? "bg-blue-300 text-black" : ""}`}
          >
            Neurologist
          </p>
          <p
            onClick={() =>
              speciality === "Cardiologist"
                ? navigate("/doctors")
                : navigate("/doctors/Cardiologist")
            }
            className={`w-[94vm] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded tarnsition-all cursor-pointer ${speciality === "Cardiologist" ? "bg-blue-300 text-black" : ""}`}
          >
            Cardiologist
          </p>
          <p
            onClick={() =>
              speciality === "Dermatologist"
                ? navigate("/doctors")
                : navigate("/doctors/Dermatologist")
            }
            className={`w-[94vm] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded tarnsition-all cursor-pointer ${speciality === "Dermatologist" ? "bg-blue-300 text-black" : ""}`}
          >
            Dermatologist
          </p>
          <p
            onClick={() =>
              speciality === "Gasterologist"
                ? navigate("/doctors")
                : navigate("/doctors/Gasterologist")
            }
            className={`w-[94vm] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded tarnsition-all cursor-pointer ${speciality === "Gasterologist" ? "bg-blue-300 text-black" : ""}`}
          >
            Gasterologist
          </p>
          <p
            onClick={() =>
              speciality === "Pediatricians"
                ? navigate("/doctors")
                : navigate("/doctors/Pediatricians")
            }
            className={`w-[94vm] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded tarnsition-all cursor-pointer ${speciality === "Pediatricians" ? "bg-blue-300 text-black" : ""}`}
          >
            Pediatricians
          </p>
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
