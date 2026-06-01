import React, { useContext, useEffect, useState } from "react";
import { getProfileDoctor, upDateProfileDoctor } from "../../api/Doctorprofile";
import { DoctorContext } from "../../context/DoctorContaext";
import { assets } from "../../assets/assets_admin/assets";
import { toast } from "react-toastify";

const Doctorprofile = () => {
  const { backendUrl, dToken } = useContext(DoctorContext);
  const [profileData, setProfileData] = useState({
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
        setProfileData((prev) => ({
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

      const { data } = await upDateProfileDoctor(
        backendUrl,
        updateDocData,
        dToken,
      );
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

  if (loading || Object.keys(profileData).length === 0) {
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
      <div className="min-h-screen p-3 mt-6 sm:p-5 lg:p-8">
        <div className="max-w-7xl mx-auto">
          {/* MAIN PROFILE CARD */}
          <div className="bg-white border border-gray-200 shadow-sm overflow-hidden">
            {/* TOP SECTION */}
            <div className="px-4 sm:px-8 lg:px-10 py-6 sm:py-8 border-b border-gray-100">
              <div className="flex flex-col gap-6">
                {/* IMAGE + INFO ROW */}
                <div className="flex flex-row items-start gap-4 sm:gap-6">
                  {/* IMAGE */}
                  <div className="relative shrink-0">
                    <img
                      className="w-20 h-20 sm:w-32 sm:h-32 lg:w-40 lg:h-40 object-cover border border-gray-200 shadow-sm"
                      src={profileData.image || assets.doctor_icon}
                      alt=""
                    />
                    <div
                      className={`absolute bottom-1 right-1 sm:bottom-2 sm:right-2 w-3 h-3 sm:w-4 sm:h-4 rounded-full border-2 border-white ${
                        profileData.available ? "bg-green-500" : "bg-red-500"
                      }`}
                    ></div>
                  </div>

                  {/* NAME + BADGES */}
                  <div className="flex-1 min-w-0">
                    <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 leading-tight truncate">
                      {profileData.name}
                    </h1>

                    <div className="flex flex-wrap items-center gap-2 mt-3">
                      <div className="px-2 py-1 sm:px-4 sm:py-2 bg-gray-100 text-gray-700 text-xs sm:text-sm font-medium">
                        {profileData.degree}
                      </div>
                      <div className="px-2 py-1 sm:px-4 sm:py-2 bg-gray-100 text-gray-700 text-xs sm:text-sm font-medium">
                        {profileData.speciality}
                      </div>
                      <div className="px-2 py-1 sm:px-4 sm:py-2 bg-gray-100 text-gray-700 text-xs sm:text-sm font-medium">
                        {profileData.experience} Experience
                      </div>
                    </div>
                  </div>
                </div>

                {/* ABOUT */}
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[2px] sm:tracking-[3px] text-gray-400">
                    About
                  </p>
                  <p className="mt-3 text-gray-600 leading-7 text-sm sm:text-[15px]">
                    {profileData.about}
                  </p>
                </div>

                {/* ACTIONS ROW */}
                <div className="flex flex-col xs:flex-row gap-3 sm:gap-4">
                  {/* EDIT BUTTON */}
                  <button
                    onClick={() => {
                      if (isEdit) {
                        updateProfile();
                      } else {
                        setIsEdit(true);
                      }
                    }}
                    className={`w-46 xs:w-auto py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${
                      isEdit
                        ? "bg-green-500 hover:bg-green-600 text-white cursor-pointer"
                        : "bg-blue-600 hover:bg-blue-500 text-white cursor-pointer"
                    }`}
                  >
                    {isEdit ? "Save Profile" : "Edit Profile"}
                  </button>

                  {/* AVAILABILITY TOGGLE */}
                  <div className="flex-1 bg-gray-50 border border-gray-200 px-4 py-3 flex items-center justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-wide text-gray-400 font-semibold">
                        Availability
                      </p>
                      <p className="text-sm font-semibold text-gray-800 mt-0.5">
                        {profileData.available
                          ? "Currently Available"
                          : "Currently Unavailable"}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        if (isEdit) {
                          setProfileData((prev) => ({
                            ...prev,
                            available: !prev.available,
                          }));
                        }
                      }}
                      className={`relative shrink-0 w-12 h-7 sm:w-14 sm:h-8 rounded-full transition-all duration-300 ${
                        profileData.available ? "bg-green-500" : "bg-gray-300"
                      } ${!isEdit ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}`}
                    >
                      <span
                        className={`absolute top-0.5 w-5 h-5 sm:w-6 sm:h-6 bg-white rounded-full shadow-md transition-all duration-300 ${
                          profileData.available ? "left-6 sm:left-7" : "left-1"
                        }`}
                      ></span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* BOTTOM INFO SECTION */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 p-4 sm:p-8 lg:p-10">
              {/* FEES CARD */}
              <div className="border border-gray-200 p-5 sm:p-8 hover:shadow-lg transition-all duration-300 bg-white">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-xs sm:text-sm uppercase tracking-[2px] sm:tracking-[3px] text-gray-400 font-semibold">
                      Appointment Fees
                    </p>
                    <div className="mt-4">
                      {isEdit ? (
                        <input
                          type="number"
                          value={profileData?.fees ?? ""}
                          onChange={(e) =>
                            setProfileData((prev) => ({
                              ...prev,
                              fees: e.target.value,
                            }))
                          }
                          className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-gray-900 text-sm"
                        />
                      ) : (
                        <h2 className="text-xl sm:text-2xl font-bold text-blue-600">
                          ₹{profileData.fees}
                        </h2>
                      )}
                    </div>
                  </div>
                  <div className="hidden sm:flex w-14 h-14 sm:w-16 sm:h-16 rounded-3xl bg-gray-100 items-center justify-center ml-4">
                    <span className="text-xl sm:text-2xl">💰</span>
                  </div>
                </div>
              </div>

              {/* ADDRESS CARD */}
              <div className="border border-gray-200 p-5 sm:p-8 hover:shadow-lg transition-all duration-300 bg-white">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-xs sm:text-sm uppercase tracking-[2px] sm:tracking-[3px] text-gray-400 font-semibold">
                      Clinic Address
                    </p>
                    <div className="mt-4">
                      {isEdit ? (
                        <textarea
                          rows={3}
                          value={profileData.address ?? ""}
                          onChange={(e) =>
                            setProfileData((prev) => ({
                              ...prev,
                              address: e.target.value,
                            }))
                          }
                          className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-gray-900 resize-none text-sm"
                        />
                      ) : (
                        <p className="text-base sm:text-lg text-blue-600 leading-7 font-medium">
                          {profileData.address}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="hidden sm:flex w-14 h-14 sm:w-16 sm:h-16 rounded-3xl bg-gray-100 items-center justify-center ml-4">
                    <span className="text-xl sm:text-2xl">📍</span>
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
