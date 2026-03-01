import { createContext, useEffect, useState } from "react";
// import { doctors } from "../assets/assets/assets";
import { getDoctorList } from "../api/DoctorsList";
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = (props) => {
   const backendUrl=import.meta.env.
   VITE_BACKEND_URL

   const [doctors,setDoctorData]=useState([]);
   const [token,setToken]=useState("");


const getDoctorsData=async()=>{
  try {
    const response=await getDoctorList(backendUrl)
    const data=response.data
    if(data.success){
      setDoctorData(data.doctors)
      toast.success(data.message)
      console.log(data)
      
    }
    else{
      toast.error(data)
    }
  } catch (error) {
    console.log(error)
  }
}
  const value = {
    doctors,
    token,setToken,backendUrl
  };


useEffect(()=>{
  getDoctorsData()
},[])

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
export default AppContextProvider;
