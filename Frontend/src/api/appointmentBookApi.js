import axios from "axios";

export const appointmentBook = (
  backendUrl,
  docId,
  slotDate,
  slotTime,
  token,
) => {
  return axios.post(
    `${backendUrl}/api/user/book-appointment`,
    {
      docId,
      slotDate,
      slotTime,
    },
    { headers: { usertoken: token } },
  );
};

export const getMyAppointments=(backendUrl,token)=>{
  return axios.get(`${backendUrl}/api/user/appointments`,{headers:{usertoken:token}})
}

export const cancelAppointments=(backendUrl,appointmentId,token)=>{
  return axios.post(`${backendUrl}/api/user/cancel-appointment`,{appointmentId},{headers:{usertoken:token}})
}