import axios from "axios";

export const doctorLogin=(backendUrl,token)=>{
return axios.post(`${backendUrl}/api/doctor-login`)
}