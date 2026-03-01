import axios from "axios"

export const registerUser=(backendUrl,names,email,password)=>{
    const payload={names,email,password}
    return axios.post(`${backendUrl}/api/user/register-user`,payload)
}
