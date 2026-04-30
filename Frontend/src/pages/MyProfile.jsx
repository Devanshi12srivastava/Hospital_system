import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets/assets";
import { updateProfile } from "../api/userApi";
import { toast } from "react-toastify";

const MyProfile = () => {
  const { userData, setUserData,token,loadUserProfile,backendUrl } = useContext(AppContext);

  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(false);

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
      if(data.success){
        toast.success(data.message)
        await loadUserProfile()
        setIsEdit(false)
        setImage(false)
           console.log("data is", data);
      }
      else{
        toast.error(data.message)
      } 
   

      
    } catch (error) {
      console.log(error.message)
      toast.error(error.message)
    }
  };

  return (
    userData && (
      <div className="flex justify-center px-4 mt-10">
  <div className="w-full max-w-2xl bg-white shadow-lg rounded-2xl p-6 flex flex-col gap-4 text-gray-700">

    {/* Profile Image */}
    <div className="flex flex-col items-center">
      {isEdit ? (
        <label htmlFor="image" className="cursor-pointer relative">
          <img
            className="w-32 h-32 object-cover rounded-full opacity-80 border"
            src={
              image
                ? URL.createObjectURL(image)
                : userData?.image || assets.profile_pic
            }
            alt=""
          />
          <img
            className="w-8 absolute bottom-2 right-2 bg-white rounded-full p-1 shadow"
            src={assets.upload_icon}
            alt=""
          />
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            hidden
          />
        </label>
      ) : (
        <img
          className="w-32 h-32 object-cover rounded-full border"
          src={userData.image || assets.profile_pic}
          alt=""
        />
      )}

      {/* Name */}
      {isEdit ? (
        <input
          className="mt-4 text-2xl font-semibold text-center border-b outline-none"
          type="text"
          value={userData?.name || ""}
          onChange={(e) =>
            setUserData((prev) => ({ ...prev, name: e.target.value }))
          }
        />
      ) : (
        <p className="text-2xl font-semibold mt-3">{userData.name}</p>
      )}
    </div>

    <hr />

    {/* Contact Info */}
    <div>
      <p className="text-lg font-semibold mb-3">Contact Info</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">

        {/* Email */}
        <div>
          <p className="font-medium">Email</p>
          {isEdit ? (
            <input
              className="inputStyle"
              type="email"
              value={userData.email || ""}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, email: e.target.value }))
              }
            />
          ) : (
            <p className="text-blue-600">{userData.email}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <p className="font-medium">Phone</p>
          {isEdit ? (
            <input
              className="inputStyle"
              type="text"
              value={userData.phone || ""}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, phone: e.target.value }))
              }
            />
          ) : (
            <p className="text-blue-600">{userData.phone}</p>
          )}
        </div>

        {/* Address */}
        <div className="sm:col-span-2">
          <p className="font-medium">Address</p>
          {isEdit ? (
            <input
              className="inputStyle"
              type="text"
              value={userData.address || ""}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, address: e.target.value }))
              }
            />
          ) : (
            <p>{userData.address}</p>
          )}
        </div>
      </div>
    </div>

    {/* Basic Info */}
    <div>
      <p className="text-lg font-semibold mb-2">Basic Info</p>

      <div>
        <p className="font-medium">Date of Birth</p>
        {isEdit ? (
          <input
            className="inputStyle"
            type="date"
            value={userData.dob || ""}
            onChange={(e) =>
              setUserData((prev) => ({ ...prev, dob: e.target.value }))
            }
          />
        ) : (
          <p>{userData.dob}</p>
        )}
      </div>
    </div>

    {/* Button */}
    <div className="flex justify-end mt-4">
      {isEdit ? (
        <button
          className="bg-linear-to-r from-blue-500 to-indigo-600 text-white px-6 py-2 rounded-lg shadow hover:scale-105 transition"
          onClick={updateUserProfileData}
        >
          Save Info
        </button>
      ) : (
        <button
          className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-600 transition"
          onClick={() => setIsEdit(true)}
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

export default MyProfile;
