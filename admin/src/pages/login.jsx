import { useContext } from "react";
import { useState } from "react";
import { AdminContext } from "../context/AdminContext";
import axios from "axios";
import { toast } from "react-toastify";
import { DoctorContext } from "../context/DoctorContaext";
import { doctorLogin } from "../api/DoctorLogin";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [state, setState] = useState("Admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setAdminToken, backendUrl } = useContext(AdminContext);
const {setDToken}=useContext(DoctorContext)
  const onSubmitLogin = async (e) => {
    e.preventDefault();
    setEmail("");
    setPassword("");
    console.log({ state, email, password });
    console.log("Submitting login for:", state);

    try {
      if (state === "Admin") {
        const { data } = await axios.post(backendUrl + "/api/admin/login", {
          email,
          password,
        });
      ;
        if(data.success){
        localStorage.setItem("AdminToken", data.token);
        setAdminToken(data.token);
          console.log("Full server response:", data)
        }
       else {
        toast.error(data.message)
      }
    }else{
       const payload={email,password}
      const {data} =await doctorLogin(backendUrl,payload)
      if(data.success){
        localStorage.setItem('dToken',data.token)
        setDToken(data.token)
        console.log("token",data.token)
      
        
      }
      else{
        toast.error(data.message)
      }
    } 
  }catch (err) {
      console.log(
        "Login error:",
        err.response ? err.response.data : err.message,
      );
    }
  };

  return (
    <>
     <form
  onSubmit={onSubmitLogin}
  className="min-h-screen flex flex-col lg:flex-row"
>

  {/* LEFT SIDE */}
  <div className="hidden lg:flex flex-1 bg-linear-to-br from-blue-600 to-indigo-700 text-white p-10 flex-col justify-center">
    
    <h1 className="text-3xl font-bold mb-4">
      Welcome to Healthcare System
    </h1>

    <p className="text-lg mb-6 text-blue-100">
      Manage doctor appointments efficiently with our smart system.
    </p>

    <ul className="space-y-3 text-blue-100">
      <li>✔ Easy appointment booking</li>
      <li>✔ Real-time doctor availability</li>
      <li>✔ Secure patient data</li>
      <li>✔ Admin & Doctor dashboard</li>
    </ul>

  </div>

  {/* RIGHT SIDE (LOGIN) */}
  <div className="flex-1 flex items-center justify-center bg-gray-50 px-4 py-10">

    <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">

      <p className="text-2xl font-semibold text-center mb-6">
        <span className="text-blue-600">{state}</span> Login
      </p>

      {/* Email */}
      <div className="mb-4">
        <p className="text-gray-700 text-sm mb-1">Email</p>
        <input
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      {/* Password */}
      <div className="mb-4">
        <p className="text-gray-700 text-sm mb-1">Password</p>
        <input
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      {/* Button */}
      <button
        type="submit"
        className="w-full bg-linear-to-r from-blue-500 to-indigo-600 text-white py-2 rounded-lg shadow-md cursor-pointer hover:shadow-lg hover:scale-[1.02] transition-all"
      >
        Login
      </button>

      {/* Switch */}
      <p className="text-sm text-center mt-4 text-gray-600">
        {state === "Admin" ? (
          <>
            Doctor login?{" "}
            <span
              className="text-blue-600 cursor-pointer hover:underline"
              onClick={() => setState("Doctor")}
            >
              Click here
            </span>
          </>
        ) : (
          <>
            Admin login?{" "}
            <span
              className="text-blue-600 cursor-pointer hover:underline"
              onClick={() => setState("Admin")}
            >
              Click here
            </span>
          </>
        )}
      </p>
    </div>

  </div>
</form>
    </>
  );
};

export default Login;
