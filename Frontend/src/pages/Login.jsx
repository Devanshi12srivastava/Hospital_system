import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { loginUser, registerUser } from "../api/authApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { token, setToken, backendUrl } = useContext(AppContext);

  const [state, setState] = useState("Sign Up");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const navigate=useNavigate()

  const sumbitForm = async (e) => {
    e.preventDefault();
        const payload={name,email,password}
    try {
      if (state === "Sign Up") {
        const response = await registerUser(backendUrl, payload);
        const data = response.data;
        if (data.success) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
          toast.success("successfully register");
        } else {
          toast.error(data.message);
          console.log("error",error)
        }
      } else {
         const payload={email,password}
        const response = await loginUser(backendUrl, payload);
        const data = response.data;
        if (data.success) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
          console.log("login data",data)
          toast.success("successfully login");
          navigate('/')
        } else {
            console.log("Axios Error:", error.response?.data || error.message);
    toast.error(error.response?.data?.message || "Server Error");
        }
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error)
    }
  };

  useEffect(()=>{
if(token){
navigate('/')
}
  },[])

  return (
    <>
     <form
  onSubmit={sumbitForm}
  className="min-h-screen flex flex-col lg:flex-row"
>

  {/* LEFT SIDE (User Content) */}
  <div className="hidden lg:flex flex-1 bg-linear-to-br from-blue-500 to-blue-600 text-white p-10 flex-col justify-center">
    
    <h1 className="text-3xl font-bold mb-4">
      Book Appointments Easily
    </h1>

    <p className="text-lg text-green-100 mb-6">
      Connect with experienced doctors and manage your health anytime.
    </p>

    <ul className="space-y-3 text-green-100">
      <li>✔ Book appointments in seconds</li>
      <li>✔ Choose from top specialists</li>
      <li>✔ Track your bookings easily</li>
      <li>✔ Secure & fast experience</li>
    </ul>

  </div>

  {/* RIGHT SIDE (FORM) */}
  <div className="flex-1 flex items-center justify-center bg-gray-50 px-4 py-10">

    <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-gray-200">

      {/* Title */}
      <p className="text-2xl font-semibold text-center mb-2">
        {state === "Sign Up" ? "Create Account" : "Login"}
      </p>

      <p className="text-center text-gray-500 mb-6">
        {state === "Sign Up"
          ? "Join us to book appointments"
          : "Welcome back! Please login"}
      </p>

      {/* Name (Sign Up only) */}
      {state === "Sign Up" && (
        <div className="mb-4">
          <p className="text-sm text-gray-700 mb-1">Full Name</p>
          <input
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            type="text"
            placeholder="Enter your name"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </div>
      )}

      {/* Email */}
      <div className="mb-4">
        <p className="text-sm text-gray-700 mb-1">Email</p>
        <input
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
          type="email"
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </div>

      {/* Password */}
      <div className="mb-4">
        <p className="text-sm text-gray-700 mb-1">Password</p>
        <input
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
          type="password"
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </div>

      {/* Button */}
      <button
        type="submit"
        className="w-full bg-linear-to-r from-blue-500 to-blue-600 text-white py-2 rounded-lg font-medium shadow-md cursor-pointer hover:shadow-lg hover:scale-[1.02] transition-all"
      >
        {state === "Sign Up" ? "Create Account" : "Login"}
      </button>

      {/* Toggle */}
      <p className="text-sm text-center mt-4 text-gray-600">
        {state === "Sign Up" ? (
          <>
            Already have an account?{" "}
            <span
              onClick={() => setState("login")}
              className="text-green-600 cursor-pointer font-medium hover:underline"
            >
              Login here
            </span>
          </>
        ) : (
          <>
            Create Account?{" "}
            <span
              onClick={() => setState("Sign Up")}
              className="text-blue-600 cursor-pointer font-medium hover:underline"
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
