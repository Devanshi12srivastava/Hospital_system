import axios from "axios"

export const registerUser=(backendUrl,payload)=>{
    return axios.post(`${backendUrl}/api/user/register-user`,payload)
}
export const loginUser=(backendUrl,payload)=>{
    return axios.post(`${backendUrl}/api/user/login-user`,payload)
}