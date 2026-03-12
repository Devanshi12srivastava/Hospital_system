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
      <form onSubmit={sumbitForm} className="min-h-[80vh] flex items-center">
        <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-100 border border-gray-200 bg-white shadow-sm rounded-xl text-gray-600">
          <p className="text-2xl font-semibold">
            {" "}
            {state === "Sign Up" ? "Create Account" : "login"}
          </p>
          <p className="text-gray-800 text-lg ">please sign up</p>
          {state == "Sign Up" && (
            <div className="w-full mt-8">
              <p className="text-gray-800 font-medium text-lg mt-2">
                Full Name
              </p>
              <input
                className="border border-zinc-300 rounded-lg w-full p-2 mt-1"
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </div>
          )}

          <div>
            <div className="w-full">
              <p className="text-gray-800 font-medium text-lg mt-2">Email</p>
              <input
                className="border border-zinc-300 rounded-lg w-full p-2 mt-1"
                type="text"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>
            <div className="w-full">
              <p className="text-gray-800 font-medium text-lg mt-2">Password</p>
              <input
                className="border border-zinc-300 rounded-lg w-full p-2 mt-1"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>
            <button
              type="submit"
              className="bg-blue-400 px-5 py-3 w-full rounded-lg mt-10 text-white font-medium"
            >
              {state == "Sign Up" ? "Create Account" : "login"}
            </button>
            {state === "Sign Up" ? (
              <p>
                Already have account{" "}
                <span
                  onClick={() => setState("login")}
                  className="text-blue-600 underline cursor-pointer"
                >
                  login here
                </span>
              </p>
            ) : (
              <p
                onClick={() => setState("Sign Up")}
                className="text-blue-600 underline cursor-pointer"
              >
                Create Account? <span>click here</span>
              </p>
            )}
          </div>
        </div>
      </form>
    </>
  );
};

export default Login;
