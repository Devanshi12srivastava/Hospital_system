import axios from "axios"
export const loadUserDataApi=(backendUrl,token)=>{
    return axios.get(`${backendUrl}/api/user/get-profile`,{headers:{usertoken:token}}

    );
};