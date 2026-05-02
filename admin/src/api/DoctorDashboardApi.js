import axios from "axios";

export const doctorDashboardApi=(backendUrl,dToken)=>{
    return axios.get(`${backendUrl}/api/doctor/doctor-dashboard`,{
    headers:{
      Authorization: `Bearer ${dToken}`
    }
  })
}