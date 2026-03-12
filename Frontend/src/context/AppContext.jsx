import { createContext, useEffect, useState } from "react";
// import { doctors } from "../assets/assets/assets";
import { getDoctorList } from "../api/DoctorsList";
import { toast } from "react-toastify";
import { loadUserDataApi } from "../api/userApi";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [doctors, setDoctorData] = useState([]);
  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : false,
  );
  const [userData, setUserData] = useState(false);

  const getDoctorsData = async () => {
    try {
      const response = await getDoctorList(backendUrl);
      const data = response.data;
      if (data.success) {
        setDoctorData(data.doctors);
        toast.success(data.message);
        console.log(data);
      } else {
        toast.error(data);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const loadUserProfile = async () => {
    try {


  console.log("token", token);
      const { data } = await loadUserDataApi(backendUrl, token);
      if (data.success) {
        setUserData(data.userData);
        console.log("userdata", data);
      } else {
        toast.error(data.message);

      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  const value = {
    doctors,
    token,
    setToken,
    backendUrl,
    userData,
    setUserData,
    loadUserProfile,
  };
  useEffect(() => {
    getDoctorsData();
  }, []);

  useEffect(() => {
    if (token) {
      loadUserProfile();
    } else {
      setUserData(false);
    }
  }, [token]);

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
export default AppContextProvider;
