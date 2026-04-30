import axios from "axios";

export const appointmentCancelApi=(backendUrl,appointmentId,adminToken)=>{
    return axios.post(`${backendUrl}/api/admin/cancel-appointment`,{appointmentId},{headers:{
        admintoken:adminToken
    }})
}