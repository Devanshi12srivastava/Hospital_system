import { useState } from "react";
import { createContext } from "react";

export const AppContext = createContext();
const AppContextProvider = (props) => {
  

const calculateAge=(dob)=>{
const today=new Date()
const birthDate=new Date(dob)

let age=today.getFullYear()-birthDate.getFullYear()
return age
}
 const daysOfweek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
  const months = [
    "",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
const [error,setError]=useState(null);
const[loading,setLoading]=useState(false)

  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split("_");
    return (
      dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
    );
  };
const value = {calculateAge,slotDateFormat,error,setError,loading,setLoading};

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
