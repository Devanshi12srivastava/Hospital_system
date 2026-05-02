import { createContext, useState } from "react";

export const DoctorContext = createContext();
const DoctorContextProvider=(props)=>{
 
   const backendUrl= import.meta.env.VITE_BACKEND_URL

   const [dToken,setDToken]= useState(localStorage.getItem('dToken')?localStorage.getItem('dToken'):"");


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
dToken,setDToken,backendUrl,AppComplete,AppCancel
}


return(
   <DoctorContext.Provider value={value}>
    {props.children}
   </DoctorContext.Provider>
)
}

export default DoctorContextProvider