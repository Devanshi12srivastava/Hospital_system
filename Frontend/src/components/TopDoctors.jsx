import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const TopDoctors = () => {
    const navigate=useNavigate()
    const {doctors,doctorerror,pageLoading}=useContext(AppContext)

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
   <div className="flex flex-col items-center gap-6 my-12 text-gray-800 px-4">
  
  {/* Heading */}
  <div className="text-center">
    <h1 className="text-3xl font-semibold text-blue-600">
      Your Top Doctors
    </h1>
    <p className="text-gray-500 mt-2 max-w-md">
      Find and book appointments with top specialists easily
    </p>
  </div>

  {/* Grid */}
  <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    {doctors.length===0?<p>No doctors</p>:doctors.slice(0, 6).map((item, idx) => (
      <div
        key={idx}
        onClick={() => navigate(`/appointment/${item._id}`)}
        className="bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden"
      >
        
        {/* Image Section */}
        <div className="relative bg-linear-to-b from-blue-50 to-white flex justify-center py-6">
          <img
            src={item.image}
            alt={item.name}
            className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-md"
          />
        </div>

        {/* Content */}
        <div className="p-4 text-center">
          
          {/* Availability */}
          <div className="flex items-center justify-center gap-2 text-sm mb-2">
            <span
              className={`w-2.5 h-2.5 rounded-full ${
                item.available ? "bg-green-500" : "bg-red-500"
              }`}
            />
            <p className="text-gray-500">
              {item.available ? "Available" : "Unavailable"}
            </p>
          </div>

          {/* Name */}
          <p className="text-lg font-semibold text-gray-900">
            {item.name}
          </p>

          {/* Speciality */}
          <p className="text-sm text-gray-500">
            {item.speciality}
          </p>

          {/* Button */}
          <button className="mt-4 w-40 px-4 py-2 text-sm font-semibold bg-blue-600 text-white  hover:bg-blue-700 transition">
            Book Appointment
          </button>
        </div>
      </div>
    ))}
  </div>

  {/* Button */}
  <button
    className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition cursor-pointer"
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

export default TopDoctors;
