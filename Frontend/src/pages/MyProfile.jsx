import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets/assets";
import { updateProfile } from "../api/userApi";
import { toast } from "react-toastify";
import { getMyAppointments } from "../api/appointmentBookApi";
import axios from "axios";

const MyProfile = () => {
  const {
    userData,
    setUserData,
    token,
    loadUserProfile,
    backendUrl,
    getDoctorsData,
  } = useContext(AppContext);

  // const navigate=useNavigate();

  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(false);
const {doctorerror,pageLoading } = useContext(AppContext);

  const updateUserProfileData = async () => {
    try {
      const formData = new FormData();
      formData.append("name", userData.name);
      formData.append("phone", userData.phone);
      formData.append("address", userData.address);
      formData.append("dob", userData.dob);

      image && formData.append("image", image);

      const response = await updateProfile(backendUrl, formData, token);
      const data = response.data;
      if (data.success) {
        toast.success(data.message);
        await loadUserProfile();
        console.log("data",userData)
        setIsEdit(false);
        setImage(false);
      console.log(response.data);
        // console.log("form",formData)
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };


useEffect(() => {
  console.log("Updated User Data:", userData);
}, [userData]);


 if (pageLoading) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-lg font-medium text-blue-600">
      Profile Loading...
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
    userData && (
<div className="w-full bg-white rounded-4xl border border-gray-100 mt-15 shadow-sm p-6 sm:p-10 lg:p-10">

  {/* Top Section */}
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">

    {/* Left */}
    <div className="flex items-center gap-5">

      {/* Profile Image */}
      <div className="relative">
        {isEdit ? (
          <label htmlFor="image" className="cursor-pointer">
            <img
              className="w-24 h-24 rounded-3xl object-cover"
              src={
                image
                  ? URL.createObjectURL(image)
                  : userData?.image || assets.profile_pic
              }
              alt=""
            />

            <div className="absolute -bottom-1 -right-1 bg-blue-600 p-2 rounded-xl shadow-lg">
              <img
                className="w-4"
                src={assets.upload_icon}
                alt=""
              />
            </div>

            <input
              hidden
              type="file"
              id="image"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </label>
        ) : (
          <img
            className="w-24 h-24 rounded-3xl object-cover"
            src={userData.image || assets.profile_pic}
            alt=""
          />
        )}
      </div>

      {/* Name */}
      <div>
        {isEdit ? (
          <input
            type="text"
            value={userData?.name || ""}
            onChange={(e) =>
              setUserData((prev) => ({
                ...prev,
                name: e.target.value,
              }))
            }
            className="text-3xl font-bold outline-none border-b border-gray-200"
          />
        ) : (
          <h2 className="text-3xl font-bold text-blue-800">
            {userData.name}
          </h2>
        )}

        <p className="text-gray-400 mt-2">
          Personal profile information
        </p>
      </div>
    </div>

    {/* Button */}
    {isEdit ? (
      <button
        onClick={updateUserProfileData}
        className="bg-blue-600 hover:bg-blue-700 text-white px-7 py-3 rounded-2xl font-medium transition-all cursor-pointer"
      >
        Save Changes
      </button>
    ) : (
      <button
        onClick={() => setIsEdit(true)}
        className="border border-blue-400 text-blue-500 hover:border-blue-500 hover:bg-blue-400 hover:text-white px-7 py-3 rounded-2xl font-medium transition-all cursor-pointer"
      >
        Edit Profile
      </button>
    )}
  </div>

  {/* Divider */}
  <div className="border-t border-gray-100 my-8"></div>

  {/* Form */}
  <div className="grid md:grid-cols-2 gap-6">

    {/* Full Name */}
    <div>
      <label className="text-sm font-medium text-gray-600">
        Full Name
      </label>

      <input
        type="text"
        value={userData?.name || ""}
        onChange={(e) =>
          setUserData((prev) => ({
            ...prev,
            name: e.target.value,
          }))
        }
        disabled={!isEdit}
        className="w-full mt-2 bg-[#f8f8f8] border border-transparent focus:border-blue-400 rounded-2xl px-4 py-4 outline-none"
      />
    </div>

   
    <div>
      <label className="text-sm font-medium text-gray-600">
        Phone Number
      </label>

      <input
        type="text"
        value={userData.phone || ""}
        onChange={(e) =>
          setUserData((prev) => ({
            ...prev,
            phone: e.target.value,
          }))
        }
        disabled={!isEdit}
        className="w-full mt-2 bg-[#f8f8f8] border border-transparent focus:border-blue-400 rounded-2xl px-4 py-4 outline-none"
      />
    </div>

    {/* Email */}
    <div>
      <label className="text-sm font-medium text-gray-600">
        Email Address
      </label>

      <input
        type="email"
        value={userData.email || ""}
        onChange={(e) =>
          setUserData((prev) => ({
            ...prev,
            email: e.target.value,
          }))
        }
        disabled={!isEdit}
        className="w-full mt-2 bg-[#f8f8f8] border border-transparent focus:border-blue-400 rounded-2xl px-4 py-4 outline-none"
      />
    </div>

    {/* DOB */}
    <div>
      <label className="text-sm font-medium text-gray-600">
        Date of Birth
      </label>

      <input
        type="date"
        value={userData.dob ? userData.dob.split("T")[0] : ""}
        onChange={(e) =>
          setUserData((prev) => ({
            ...prev,
            dob: e.target.value,
          }))
        }
        disabled={!isEdit}
        className="w-full mt-2 bg-[#f8f8f8] border border-transparent focus:border-blue-400 rounded-2xl px-4 py-4 outline-none"
      />
    </div>

    {/* Address */}
    <div className="md:col-span-2">
      <label className="text-sm font-medium text-gray-600">
        Address
      </label>

      <textarea
        rows={4}
        value={userData.address || ""}
        onChange={(e) =>
          setUserData((prev) => ({
            ...prev,
            address: e.target.value,
          }))
        }
        disabled={!isEdit}
        className="w-full mt-2 bg-[#f8f8f8] border border-transparent focus:border-blue-400 rounded-2xl px-4 py-4 outline-none resize-none"
      />
    </div>

  </div>
</div>

    )
  );
};

export default MyProfile;
