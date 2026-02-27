import { useContext } from "react";
import { useState } from "react";
import { AdminContext } from "../context/AdminContext";
import axios from "axios"
const Login = () => {
  const [state, setState] = useState("Admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

const {setAdminToken,backendUrl} =useContext(AdminContext)


  const onSubmitLogin = async(e) => {
    e.preventDefault();
 setEmail("")
 setPassword("")
    console.log({ state, email, password });
        console.log("Submitting login for:", state);

    try{
      if(state ==='Admin'){
    
        const {data}=await axios.post(backendUrl+'/api/admin/login',{email,password})
        console.log("Full server response:", data);
        localStorage.setItem('AdminToken',data.token)
        setAdminToken(data.token)
        
      }
      else{

      }
    }
    catch(err){
 console.log("Login error:", err.response ? err.response.data : err.message);
    }
  };

  return (
    <>
      <form onSubmit={onSubmitLogin} className="min-h-[80vh] flex items-center">
        <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-85 sm:min-w-96 border-fuchsia-200 rounded-2xl text-black trxt-sm shadow-lg">
          <p className="text-2xl font-semibold m-auto ">
            <span className="text-blue-600">{state}</span> Login
          </p>
          <div>
            <p className="text-gray-700 font-medium text-base">Email</p>
            <input
              className="border border-gray-200 rounded-xl w-full p-2 mt-1"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <p className="text-gray-700 font-medium text-base">Password</p>
            <input
              className="border border-gray-200 rounded-xl w-full p-2 mt-1"
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>{" "}
          <button
            className="bg-blue-400 text-white w-full py-2 rounded-md text-base cursor-pointer hover:bg-blue-500"
            onClick={()=>console.log("Clicked")}
          >
            Login
          </button>{
            state==="Admin"?<p>Doctor login? <span className="cursor-pointer text-blue-700 underline" onClick={()=>setState('Doctor')}>Click here</span></p>:<p>Admin login? <span className="cursor-pointer text-blue-700 underline" onClick={()=>setState('Admin')}>Click login</span></p>
          }
        </div>
      </form>
    </>
  );
};

export default Login;
