import React, { useState } from "react";

const Login = () => {
  const [state, setState] = useState("Sign Up");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const sumbitForm = async (e) => {
    e.preventDefault();
  };

  return (
    <>
      <form className="min-h-[80vh] flex items-center">
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
                onChange={(e) => setName(e.target.value)}
                value={password}
              />
            </div>
            <button className="bg-blue-400 px-5 py-3 w-full rounded-lg mt-10 text-white font-medium">
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
