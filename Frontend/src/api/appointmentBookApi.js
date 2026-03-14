import axios from "axios";

export const appointmentBook = (
  backendUrl,
  docId,
  slotDate,
  slotTime,
  token,
) => {
  return axios.post(
    `${backendUrl}/api/user/book-appointment`,
    {
      docId,
      slotDate,
      slotTime,
    },
    { headers: { usertoken: token } },
  );
};
