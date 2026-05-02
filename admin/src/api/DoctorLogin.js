import axios from "axios";

export const doctorLogin=(backendUrl,payload)=>{
return axios.post(`${backendUrl}/api/doctor/doctor-login`,payload)
}