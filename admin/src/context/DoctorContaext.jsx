import { createContext, useState } from "react";
import { cancelAppoint, completeAppoint, doctorAppointments } from "../api/Allappointment";
import { toast } from "react-toastify";

export const DoctorContext = createContext();
const DoctorContextProvider=(props)=>{
  const [docAppointment, setDocAppoitment] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
   const backendUrl= import.meta.env.VITE_BACKEND_URL

   const [dToken,setDToken]= useState(localStorage.getItem('dToken')?localStorage.getItem('dToken'):"");

 const AppointmentDoctor = async (docId) => {
    try {
      setLoading(true);
      const { data } = await doctorAppointments(backendUrl, dToken);
      if (data.success) {
        setDocAppoitment(data.appointments);
        console.log(data.appointments);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error.message);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

   const AppComplete=async(appointmentId)=>{
     try {
       const response=await completeAppoint(backendUrl,appointmentId,dToken)
       const data=response.data
       if(data.success){
         toast.success(data.message)
       AppointmentDoctor()
       }
       else{
         toast.error(data.message)
       }
     } catch (error) {
         console.log(error.message);
     }
   }
   
   const AppCancel=async(appointmentId)=>{
     try {
       const response=await cancelAppoint(backendUrl,appointmentId,dToken)
       const data=response.data
       if(data.success){
         toast.success(data.message)
       AppointmentDoctor()
       }
       else{
         toast.error(data.message)
       }
     } catch (error) {
         console.log(error.message);
     }
   }

const value={
dToken,setDToken,backendUrl,AppComplete,AppCancel,AppointmentDoctor
}


return(
   <DoctorContext.Provider value={value}>
    {props.children}
   </DoctorContext.Provider>
)
}

export default DoctorContextProvider