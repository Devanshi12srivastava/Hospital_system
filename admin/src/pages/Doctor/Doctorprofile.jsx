import React, { useContext, useEffect, useState } from "react";
import { getProfileDoctor, upDateProfileDoctor } from "../../api/Doctorprofile";
import { DoctorContext } from "../../context/DoctorContaext";
import { assets } from "../../assets/assets_admin/assets";
import { toast } from "react-toastify";

const Doctorprofile = () => {
  const { backendUrl, dToken } = useContext(DoctorContext);
  const [profileData, setProfielData] = useState({
    name: "",
    image: "",
    degree: "",
    speciality: "",
    experience: "",
    about: "",
    fees: "",
    address: "",
    available: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  const getDoctorProfile = async () => {
    try {
      setLoading(true);
      const { data } = await getProfileDoctor(backendUrl, dToken);
      if (data.success) {
        setProfielData((prev) => ({
          ...prev,
          ...data.profileData,
        }));
        console.log(data.profileData);
      }
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async () => {
    try {
      const updateDocData = {
        address: profileData.address,
        fees: profileData.fees,
        available: profileData.available,
      };

      const { data } = await upDateProfileDoctor(backendUrl,updateDocData, dToken);
      if (data.success) {
        
        toast.success(data.message);
        console.log(data);
        setIsEdit(false);
        getDoctorProfile();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  useEffect(() => {
    if (dToken) {
      getDoctorProfile();
    }
  }, [dToken]);


   if (loading ||  Object.keys(profileData).length === 0) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-xl font-medium text-blue-600">
        Loading Doctor Profile...
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
  profileData && (
    <div className="min-h-screen p-3 mt-10 sm:p-5 lg:p-8">
      
      <div className="max-w-7xl mx-auto">
        
        {/* MAIN PROFILE CARD */}
        <div className="bg-white border border-gray-200 shadow-sm overflow-hidden">
          
          {/* TOP SECTION */}
          <div className="px-5 sm:px-8 lg:px-10 py-8 border-b border-gray-100">
            
            <div className="flex flex-col xl:flex-row xl:items-start xl:justify-between gap-8">
              
              {/* LEFT */}
              <div className="flex flex-col sm:flex-row sm:items-start gap-6">
                
                {/* IMAGE */}
                <div className="relative">
                  <img
                    className="w-32 h-32 sm:w-40 sm:h-40 object-cover border border-gray-200 shadow-sm"
                    src={profileData.image || assets.doctor_icon}
                    alt=""
                  />

                  <div
                    className={`absolute bottom-3 right-3 w-4 h-4 rounded-full border-2 border-white ${
                      profileData.available
                        ? "bg-green-500"
                        : "bg-red-500"
                    }`}
                  ></div>
                </div>

                {/* INFO */}
                <div className="flex-1">
                  
                  <div className="flex flex-wrap items-center gap-3">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                      {profileData.name}
                    </h1>

                    {/* <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-semibold border border-gray-200">
                      {profileData.available
                        ? "Available"
                        : "Unavailable"}
                    </span> */}
                  </div>

                  <div className="flex flex-wrap items-center gap-3 mt-5">
                    
                    <div className="px-4 py-2  bg-gray-100 text-gray-700 text-sm font-medium">
                      {profileData.degree}
                    </div>

                    <div className="px-4 py-2  bg-gray-100 text-gray-700 text-sm font-medium">
                      {profileData.speciality}
                    </div>

                    <div className="px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium">
                      {profileData.experience} Experience
                    </div>
                  </div>

                  {/* ABOUT */}
                  <div className="mt-7 max-w-3xl">
                    <p className="text-sm font-semibold uppercase tracking-[3px] text-gray-400">
                      About
                    </p>

                    <p className="mt-4 text-gray-600 leading-8 text-[15px]">
                      {profileData.about}
                    </p>
                  </div>
                </div>
              </div>

              {/* RIGHT ACTIONS */}
              <div className="flex flex-col sm:flex-row xl:flex-col gap-4 xl:min-w-60">
                
                {/* EDIT BUTTON */}
                <button
                  onClick={() => {
                    if (isEdit) {
                      updateProfile();
                    } else {
                      setIsEdit(true);
                    }
                  }}
                  className={`px-6 py-3 rounded-2xl text-sm font-semibold transition-all duration-300  ${
                    isEdit
                      ? "bg-green-500 hover:bg-green-600 text-white cursor-pointer"
                      : "bg-blue-600 hover:bg-blue-500 text-white cursor-pointer"
                  }`}
                >
                  {isEdit ? "Save Profile" : "Edit Profile"}
                </button>

                {/* AVAILABILITY */}
                <div className="bg-gray-50 border border-gray-200 px-5 py-4 flex items-center justify-between gap-5">
                  
                  <div>
                    <p className="text-xs uppercase tracking-wide text-gray-400 font-semibold">
                      Availability
                    </p>

                    <p className="text-sm font-semibold text-gray-800 mt-1">
                      {profileData.available
                        ? "Currently Available"
                        : "Currently Unavailable"}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      setProfielData((prev) => ({
                        ...prev,
                        available: !prev.available,
                      }))
                    }
                    className={`relative w-14 h-8 rounded-full transition-all duration-300 ${
                      profileData.available
                        ? "bg-green-500"
                        : "bg-gray-300"
                    }`}
                  >
                    <span
                      className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-md transition-all duration-300 ${
                        profileData.available
                          ? "left-7"
                          : "left-1"
                      }`}
                    ></span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* BOTTOM INFO SECTION */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-5 sm:p-8 lg:p-10">
            
            {/* FEES CARD */}
            <div className="border border-gray-200 p-6 sm:p-8 hover:shadow-lg transition-all duration-300 bg-white">
              
              <div className="flex items-center justify-between">
                
                <div>
                  <p className="text-sm uppercase tracking-[3px] text-gray-400 font-semibold">
                    Appointment Fees
                  </p>

                  <div className="mt-5">
                    {isEdit ? (
                      <input
                        type="number"
                        value={profileData?.fees ?? ""}
                        onChange={(e) =>
                          setProfielData((prev) => ({
                            ...prev,
                            fees: e.target.value,
                          }))
                        }
                        className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-gray-900"
                      />
                    ) : (
                      <h2 className="text-2xl font-bold text-blue-600">
                        ₹{profileData.fees}
                      </h2>
                    )}
                  </div>
                </div>

                <div className="hidden sm:flex w-16 h-16 rounded-3xl bg-gray-100 items-center justify-center">
                  <span className="text-2xl">💰</span>
                </div>
              </div>
            </div>

            {/* ADDRESS CARD */}
            <div className="border border-gray-200 p-6 sm:p-8 hover:shadow-lg transition-all duration-300 bg-white">
              
              <div className="flex items-center justify-between">
                
                <div className="flex-1">
                  <p className="text-sm uppercase tracking-[3px] text-gray-400 font-semibold">
                    Clinic Address
                  </p>

                  <div className="mt-5">
                    {isEdit ? (
                      <textarea
                        rows={4}
                        value={profileData.address ?? ""}
                        onChange={(e) =>
                          setProfielData((prev) => ({
                            ...prev,
                            address: e.target.value,
                          }))
                        }
                        className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-gray-900 resize-none"
                      />
                    ) : (
                      <p className="text-lg text-blue-600 leading-8 font-medium">
                        {profileData.address}
                      </p>
                    )}
                  </div>
                </div>

                <div className="hidden sm:flex w-16 h-16 rounded-3xl bg-gray-100 items-center justify-center ml-5">
                  <span className="text-2xl">📍</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
);
};

export default Doctorprofile;
