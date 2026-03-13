import axios from "axios"
export const loadUserDataApi=(backendUrl,token)=>{
    return axios.get(`${backendUrl}/api/user/get-profile`,{headers:{usertoken:token}}

    );
};

export const updateProfile = (backendUrl, formData, token) => {
  return axios.post(
    `${backendUrl}/api/user/update-profile`,
    formData,
    {
      headers: {
        usertoken: token,
        "Content-Type": "multipart/form-data"
      }
    }
  );
};