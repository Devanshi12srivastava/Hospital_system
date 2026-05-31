import { useContext, useEffect, useState } from "react";
import { changeAvailabilty, doctorList } from "../../api/DoctorList";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";
import { AppContext } from "../../context/AppContext";

const DoctorsList = () => {
  const { backendUrl, adminToken } = useContext(AdminContext);
const {error,loading,setError,setLoading} = useContext(AppContext);

  const [doctorData, setDoctorData] = useState([]);
  const [available, setAvailable] = useState(true);

  const allDoctorData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await doctorList(backendUrl, adminToken);
      const data = response.data;
      setDoctorData(data.doctors);
      console.log(data);
    } catch (error) {
      console.log(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (adminToken) {
      allDoctorData();
    }
  }, [adminToken]);

  const changeAvailble = async (docId) => {
    try {
      const response = await changeAvailabilty(backendUrl, docId, adminToken);
      const data = response.data;
      if (data.success) {
        // setAvailable(data)
        toast.success("success");
        allDoctorData();
      } else {
        toast.error(data.message);
      }
      console.log("change", data);
    } catch (err) {
      toast.error(err.message);
      console.log(err.message);
    }
  };

  if (loading ||  Object.keys(doctorData).length === 0) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-lg font-medium text-blue-600">
        Loading Doctors...
      </p>
    </div>
  );
}

if (error) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-red-500">
         {error?.message || "Something went wrong"}
      </p>
    </div>
  );
}
  return (
    <div className="w-full px-2 sm:px-4 md:px-6 py-4">
      {/* Heading */}
      <div className="mb-5">
        <h1 className="text-xl sm:text-2xl font-semibold text-gray-800">
          Doctor List
        </h1>
        <p className="text-sm text-gray-500 mt-1">Manage all doctors details</p>
      </div>

      {/* Doctors */}
      <div className="flex flex-wrap gap-3 sm:gap-5">
        {doctorData?.map((item, idx) => (
          <div
            key={idx}
            className="
          w-full
          min-[380px]:w-[47%]
          md:w-[31%]
          xl:w-[23.5%]
           bg-linear-to-b from-blue-50 to-white
          border border-gray-100
          p-4
          relative
          hover:shadow-lg
          transition-all
          duration-300
        "
          >
            {/* Menu */}
            <button className="absolute top-3 right-3 text-gray-400 text-lg">
              ⋯
            </button>

            {/* Image */}
            <div className="flex justify-center">
              <img
                src={item.image}
                alt=""
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-4 border-[#f3f0ff]"
              />
            </div>

            {/* Info */}
            <div className="text-center mt-4">
              <h2 className="text-base sm:text-lg font-semibold text-gray-800 wrap-break-word">
                {item.name}
              </h2>

              <p className="text-sm text-gray-400 mt-1 wrap-break-word">
                Specialist : {item.speciality}
              </p>

              {/* Rating */}
              <div className="flex justify-center text-yellow-400 text-sm mt-2">
                ★ ★ ★ ★ ★
              </div>

              {/* Availability */}
              <div className="flex items-center justify-center gap-2 mt-4">
                <div
                  className={`w-2.5 h-2.5 rounded-full ${
                    item.available ? "bg-green-500" : "bg-red-500"
                  }`}
                ></div>

                <p
                  className={`text-sm font-medium ${
                    item.available ? "text-green-600" : "text-red-500"
                  }`}
                >
                  {item.available ? "Available" : "Unavailable"}
                </p>
              </div>

              {/* Button */}
              <button
                onClick={() => changeAvailble(item._id)}
                className={`w-35 mt-5 py-2 text-sm font-medium transition-all duration-300 cursor-pointer ${
                  item.available
                    ? "bg-blue-700 text-white hover:bg-[#310cd7]"
                    : "bg-red-50 text-red-500 hover:bg-red-100"
                }`}
              >
                {item.available ? "Change Availability" : "Make Available"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorsList;
