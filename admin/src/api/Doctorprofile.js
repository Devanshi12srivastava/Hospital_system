import axios from "axios"

export const getProfileDoctor=(backendUrl,dToken)=>{
    return axios.get(`${backendUrl}/api/doctor/doctor-profile`,{
    headers:{
      Authorization: `Bearer ${dToken}`
    }
  })
};

export const upDateProfileDoctor=(backendUrl,updateDocData,dToken)=>{
    return axios.post(`${backendUrl}/api/doctor/update-profile`,updateDocData,{
    headers:{
      Authorization: `Bearer ${dToken}`
    }
  })
};