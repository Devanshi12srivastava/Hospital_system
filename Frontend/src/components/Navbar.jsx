import { NavLink, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets/assets";
import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const navigate = useNavigate();

  const [showMenu, setshowMenu] = useState(false);
  // const [token, setToken] = useState(true);
  const {token,setToken} = useContext(AppContext);

const logout=()=>{
  setToken(false)
  localStorage.removeItem('token');
  navigate('/login')
}

  return (
    <div className="flex items-center justify-between text-sm py-10 mb-5 border-b border-b-blue-200 ">
      <img className="w-44" src={assets.logo} alt="logo" />
      <ul className="hidden md:flex items-start gap-5 font-medium text-lg">
        <NavLink to="/">
          <li className="py-2">Home</li>
          <hr className="border-none outline-none bg-blue-700 w-3/5" />{" "}
        </NavLink>
        <NavLink to="/doctors">
          {" "}
          <hr className="border-none outline-none bg-blue-700 w-3/5" />{" "}
          <li className="py-2">All Doctors</li>
        </NavLink>

        <NavLink to="/about">
          {" "}
          <hr className="border-none outline-none bg-blue-700 w-3/5" />{" "}
          <li className="py-2">About</li>
        </NavLink>
        <NavLink to="/contact">
          {" "}
          <hr className="border-none outline-none bg-blue-700 w-3/5" />{" "}
          <li className="py-2">Contact</li>
        </NavLink>
      </ul>
      <div className="flex item-center gap-4">
        {token ? (
          <div className="flex items-center gap-2 cursor-pointer group relative mr-20">
            <img
              className="w-9 rounded-full"
              src={assets.profile_pic}
              alt="profile"
            />
            <img className="w-2" src={assets.dropdown_icon} alt="icon" />
            <div className="w-40 absolute top-0 right-0 pt-14 text-base font-medium text-black z-20 hidden group-hover:block">
              <div className="min-w-48 bg-blue-100 flex flex-col gap-4 p-4">
                <p
                  onClick={() => navigate("/my-profile")}
                  className="hover:text-blue-400"
                >
                  My Profile
                </p>
                <p
                  onClick={() => navigate("/my-appointments")}
                  className="hover:text-blue-400"
                >
                  My Appointments
                </p>
                <p
                  onClick={logout}
                  className="hover:text-blue-400"
                >
                  Logout
                </p>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-blue-400 text-white px-6 py-3 rounded-2xl font-medium text-lg cursor-pointer hover:bg-blue-600 hidden md:block "
          >
            {" "}
            Create Account{" "}
          </button>
        )}
        <img
          onClick={() => setshowMenu(true)}
          className="w-6 md:hidden"
          src={assets.menu_icon}
          alt=""
        />
        {/* mobile menu */}
        <div className={` ${showMenu ? 'fixed w-full':'h-0 w-0'} md:hidden right-0 top-0 bottom0=-0 z-20 overflow-hidden bg-white transition-all `}>
          <div className="flex items-center justify-between px-5 py-7">
            <img className="w-36"src={assets.logo} alt="" />
            <img className="w-7"
              onClick={() => setshowMenu(false)}
              src={assets.cross_icon}
              alt=""
            />
          </div>
          <ul className="flex flex-col items-center gap-2 text-lg font-medium">
            <NavLink className="px-4 py-2 rounded-full inline-block" onClick={()=>setshowMenu(false)} to="/">Home</NavLink>
            <NavLink className="px-4 py-2 rounded-full inline-block" onClick={()=>setshowMenu(false)} to="/doctors">All Doctors</NavLink>
            <NavLink className="px-4 py-2 rounded-full inline-block" onClick={()=>setshowMenu(false)} to="/about">About</NavLink>
            <NavLink  className="px-4 py-2 rounded-full inline-block"onClick={()=>setshowMenu(false)} to="/contact">Contact</NavLink>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
