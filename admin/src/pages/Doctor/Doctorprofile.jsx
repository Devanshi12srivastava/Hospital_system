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

  return (
    profileData && (
      <div>
        <div className="felx flex-col gap-4 m-5">
          <div>
            <img
              className="bg-blue-200 w-full max-w-xs h-auto rounded-lg object-cover"
              src={profileData.image || assets.doctor_icon}
              alt="image"
            />
          </div>
          <div className="flex-1 border-stone-100 rounded-lg p-12 mt-5 py-7 bg-white">
            <p className="flex items-center gap-2 text-3xl font-medium text-gray-700">
              {profileData.name}
            </p>
            <div className="flex items-center gap-2 mt-1 text-gray-700">
              <p className="">
                {profileData.degree} -{profileData.speciality}
              </p>
              <button className="py-1 px-2 border tex-xs rounded-full">
                {profileData.experience}
              </button>
            </div>
            <div>
              <p className=" flex items-center gap-1 text-sm font-medium text-gray-600 mt-2">
                About
              </p>
              <p className="text-sm font-medium text-gray-600 max-w-175 mt-1">
                {profileData.about}
              </p>
            </div>
            <p className="text-gray-600 font-medium mt-4">
              Appointment fees:{" "}
              <span className="text-gray-800">
                {isEdit ? (
                  <input
                    type="number"
                    onChange={(e) =>
                      setProfielData((prev) => ({
                        ...prev,
                        fees: e.target.value,
                      }))
                    }
                    value={profileData?.fees ?? ""}
                  />
                ) : (
                  profileData.fees || ""
                )}
              </span>
            </p>
            <div className="flex gap-2 py-2">
              <p className="fonet-medium text-gray-600">Address:</p>
              <p className="text-sm font-medium">
                {isEdit ? (
                  <input
                    type="text"
                    value={profileData.address ?? ""}
                    onChange={(e) =>
                      setProfielData((prev) => ({
                        ...prev,
                        address: e.target.value,
                      }))
                    }
                    className="border px-2 py-1 rounded"
                  />
                ) : (
                  profileData.address
                )}
              </p>
            </div>
            <div className="flex gap-1 pt-2">
              <input
                onChangeCapture={(e) =>
                  isEdit &&
                  setProfielData((prev) => ({
                    ...prev,
                    available: !prev.available,
                  }))
                }
                className="border px-2 py-1 rounded"
                type="checkbox"
                checked={profileData.available}
                onChange={(e) =>
                  setProfileData((prev) => ({
                    ...prev,
                    available: e.target.checked,
                  }))
                }
              />
              <label htmlFor="">Avaialable</label>
            </div>
            {isEdit ? (
              <button
                className="px-4 py-1 border border-blue-200 text-sm rounded-full mt-5 font-medium hover:bg-blue-500 hover:text-white cursor-pointer transition-all"
                onClick={updateProfile}
              >
                Save Profile
              </button>
            ) : (
              <button
                className="px-4 py-1 border border-blue-200 text-sm rounded-full mt-5 font-medium hover:bg-blue-500 hover:text-white cursor-pointer transition-all"
                onClick={() => {
                  setIsEdit(true);
                  console.log("clicked");
                }}
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default Doctorprofile;
