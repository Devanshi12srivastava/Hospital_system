import axios from "axios";

export const appointmentPdf = (
  backendUrl,
  appointmentId,
  token
) => {

  return axios.get(
    `${backendUrl}/api/appointment/pdf/${appointmentId}`,
    {
      responseType: "blob",
      headers: {
        token,
      },
    }
  );
};