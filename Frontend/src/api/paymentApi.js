import axios from "axios";

export const PayOnline=(backendUrl,appointmentId,token)=>{
return axios.post(`${backendUrl}/api/user/payment-razorpay`,{appointmentId},{headers:{usertoken:token}})
}

export const verifyPay = (backendUrl, res, token) => {
  return axios.post(`${backendUrl}/api/user/verifyRazorpay`, res, {
    headers: { usertoken: token }
  });
}