import axios from "axios";

export const doctorList=(backendUrl,adminToken)=>{
    return axios.get(`${backendUrl}/api/admin/all-doctors`, {
    headers: {
      admintoken: adminToken
    }
  });
};

export const changeAvailabilty=(backendUrl,docId,adminToken)=>{
    return axios.post(`${backendUrl}/api/admin/change-available`,{docId},{headers:{admintoken:adminToken}})
}