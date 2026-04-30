import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { cancelAppointments, getMyAppointments } from "../api/appointmentBookApi";
import { toast } from "react-toastify";
import { PayOnline, verifyPay } from "../api/paymentApi";
import { useNavigate } from "react-router-dom";

const MyAppointment = () => {
  const { backendUrl, token, getDoctorsData } = useContext(AppContext);
const navigate=useNavigate();
  const [appointments, setAppointments] = useState([]);
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

  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split("_");
    return (
      dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
    );
  };
  const getUserAppointments = async () => {
    try {
      const response = await getMyAppointments(backendUrl, token);
      const data = response.data;
      if (data.success) {
        setAppointments(data.appointmentList);
        console.log(data.appointmentList);
        console.log("appointments", data);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  const cancelAppointment = async (appointmentId) => {
    try {
      const response=await cancelAppointments(backendUrl,appointmentId,token)
      const data = response.data;
      if (data.success) {
        toast.success("Appointment Cancelled")
       await getUserAppointments()
  await getDoctorsData()
        console.log("success")
       
      }else{
        toast.error(data.message)
      }
      
      console.log(appointmentId);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };


  const initpay=(order)=>{
const option={
  key:import.meta.env.VITE_RAZORPAY_KEY_ID,
  amount:order.amount,
  currency:order.currency,
  name:'Appointment Payment',
  description:'Appointment payment',
  order_id:order.id,
  receipt:order.receipt,
  handler:async(res)=>{
console.log(res)
try{
  const response =await verifyPay(backendUrl,res,token);
  const data=response.data
  if(data.success){
    getUserAppointments();
    navigate('/my-appointments')
  }
}
catch(err){
console.log(err)
toast.error(error.message)
}
  }
}
const rzp = new window.Razorpay(option)
rzp.open()
  }

const appointmentRazorpay=async(appointmentId)=>{
try {
  const response=await PayOnline(backendUrl,appointmentId,token)

  const data=response.data
  if(data.success){
    console.log(data.order)
    initpay(data.order)
  }

} catch (error) {
      console.log(error);
      toast.error(error.message);
}
}

  useEffect(() => {
    if (token) {
      getUserAppointments();
    }
  }, [token]);
  return (
    <div>
      <p className="font-medium text-gray-700 px-5 py-6 border-b border-b-gray-300">
        My Appointment
      </p>
      <div>
        {appointments &&
          appointments.slice(0, 50).map((item, idx) => (
            <div
              className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2  border-b border-b-gray-200"
              key={idx}
            >
              <div>
                <img
                  className="w-32 bg-blue-200"
                  src={item.docData.image}
                  alt=""
                />
              </div>
              <div className="flex-2 text-sm text-zinc-600">
                <p className="text-neutral-800 font-semibold">
                  {item.docData.name}
                </p>
                <p className="text-zinc-700 font-medim mt-1">
                  {item.docData.speciality}
                </p>
                <p className="font-medium mt-2">Address</p>
                <p className="etxt-xs">{item.address?.line1}</p>
                <p className="text-sm">{item.address?.line2}</p>
                <p className="text-sm mt-2">
                  <span className="text-sm text-neutral-700 font-medium">
                    Date and Time:{" "}
                  </span>
                  {slotDateFormat(item.slotDate)} | {item.slotTime}
                </p>
              </div>
              <div></div>
              <div className="flex flex-col gap-2 justify-end">
              {!item.cancelled && item.payment && <button className="text-sm text-center sm:min-w-48  text-zinc-800 font-medium px-2 py-2 rounded-4xl border  border-blue-400 bg-white hover:bg-blue-500 hover:text-white transition-duration-200 cursor-pointer ">Paid</button>}
                {!item.cancelled && !item.payment && <button onClick={()=>appointmentRazorpay(item._id)}className="text-sm text-center sm:min-w-48  text-zinc-800 font-medium px-2 py-2 rounded-4xl border  border-blue-400 bg-white hover:bg-blue-500 hover:text-white transition-duration-200 cursor-pointer ">
                  Pay Online
                </button> }
              {!item.cancelled &&  <button
                  onClick={() => cancelAppointment(item._id)}
                  className="text-sm text-center sm:min-w-48 text-zinc-800 font-medium px-2 py-2 rounded-4xl border  border-red-500 bg-white hover:bg-red-500 hover:text-white transition-duration-200 cursor-pointer "
                >
                  Cancel Appointment
                </button> }
                {item.cancelled && <button className="text-sm text-center sm:min-w-48 text-zinc-800 font-medium px-2 py-2 rounded-4xl border  border-red-700 bg-white hover:bg-red-600 hover:text-white transition-duration-200 cursor-pointer ">Appointment Cancelled</button>}
               
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default MyAppointment;
