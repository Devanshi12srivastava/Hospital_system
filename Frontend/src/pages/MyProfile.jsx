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
      <div className="mx-12 mt-10 max-w-lg flex flex-col gap-2 text-sm">
        {isEdit ? (
          <label htmlFor="image">
            <div className="inline-block relative cursor-pointer">
              <img
                className="w-36 rounded-2xl opacity-75"
                src={image ? URL.createObjectURL(image) : userData?.image || assets.profile_pic}
                alt=""
              />
              <img
                className="w-10 absolute bottom-12 "
                src={image ? "" : assets.upload_icon}
                alt=""
              />
            </div>
            <input
              onChange={(e) => setImage(e.target.files[0])}
              type="file"
              id="image"
              hidden
            />
          </label>
        ) : (
          <img className="w-36 rounded" src={userData.image} alt="" />
        )}

        {isEdit ? (
          <input
            className="bg-gray-100 text-3xl font-medium max-w-60 mt-4"
            type="text"
            value={userData?.name || ""}
            onChange={(e) =>
              setUserData((prev) => ({ ...prev, name: e.target.value }))
            }
          />
        ) : (
          <p className="font-medium text-3xl mt-5 ">{userData.name}</p>
        )}

        <hr className="bg-zinc-400 h-px border-none" />
        <div>
          <p className="text-lg font-medium mt-3">CONTACT INFO</p>
          <div className="grid grid-col-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
            <p className="font-medium">Email:</p>

            {isEdit ? (
              <input
                type="text"
                value={userData.email || ""}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, email: e.target.value }))
                }
              />
            ) : (
              <p className="text-sm text-blue-700 ">{userData.email}</p>
            )}
            <p className="font-medium ">Phone:</p>

            {isEdit ? (
              <input
                type="text"
                value={userData.phone || ""}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, phone: e.target.value }))
                }
              />
            ) : (
              <p className="text-blue-700">{userData.phone}</p>
            )}
            <p className="font-medium">Address:</p>
            {isEdit ? (
              <input
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
        <div>
          <p className="font-semibold text-xl mt-4 ">BASIC INFO</p>
          <div>
            <p className="font-medium mt-2">DOB</p>
            {isEdit ? (
              <input
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
        <div>
          {isEdit ? (
            <button
              className="bg-blue-400 text-lg mt-10 mx-4 py-2 px-4 rounded-2xl text-white"
              onClick={updateUserProfileData}
            >
              Save Info
            </button>
          ) : (
            <button
              className=" bg-blue-400 text-lg mt-10 mx-4 py-2 px-7 rounded-2xl text-white"
              onClick={() => setIsEdit(true)}
            >
              Edit
            </button>
          )}
        </div>
      </div>
    )
  );
};

export default MyProfile;
