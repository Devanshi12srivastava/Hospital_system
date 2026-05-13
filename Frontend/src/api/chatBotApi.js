import axios from "axios";

export const sendChatMessage = async (backendUrl, userText) => {
  return axios.post(`${backendUrl}/api/chat`, {
    message: userText,
  });
};
