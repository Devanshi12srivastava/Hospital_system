import axios from "axios"

export const getDoctorList=(backendUrl,adminToken)=>{
    return axios.get(`${backendUrl}/api/doctor/list`,)
}