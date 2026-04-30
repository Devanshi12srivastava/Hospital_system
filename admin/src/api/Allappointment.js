import axios from "axios";

export const allAppointmentApi=(backendUrl,adminToken)=>{
    return axios.get(`${backendUrl}/api/admin/all-appointments`,{
    headers: {
      admintoken: adminToken
    }
  });
}

export const allLatestAppointment=(backendUrl,adminToken)=>{
  return axios.get(`${backendUrl}/api/admin/dashboard`,{
    headers: {
      admintoken: adminToken
    }
  })
}