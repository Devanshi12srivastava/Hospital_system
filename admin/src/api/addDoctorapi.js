import axios from "axios";

export const addDoctor = (backendUrl,formData,adminToken) => {
  return axios.post (backendUrl + "/api/admin/add-doctor", formData, {
    headers: {
      admintoken: adminToken,
    },
  });
};
