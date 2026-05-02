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

export const doctorAppointments=(backendUrl,dToken)=>{
  return axios.get(`${backendUrl}/api/doctor/doctor-appointments`,{
    headers:{
      Authorization: `Bearer ${dToken}`
    }
  })
}
export const completeAppoint=(backendUrl,appointmentId,dToken)=>{
  return axios.post(`${backendUrl}/api/doctor/appointment-complete`, { appointmentId },{
    headers:{
      Authorization: `Bearer ${dToken}`
    }
  })
}

export const cancelAppoint=(backendUrl,appointmentId,dToken)=>{
  return axios.post(`${backendUrl}/api/doctor/cancel-appointment`, { appointmentId },{
    headers:{
      Authorization: `Bearer ${dToken}`
    }
  })
}