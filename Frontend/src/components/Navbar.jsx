import { NavLink, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets/assets";
import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const navigate = useNavigate();

  const [showMenu, setshowMenu] = useState(false);
  // const [token, setToken] = useState(true);
  const {token,setToken,userData} = useContext(AppContext);

const logout=()=>{
  setToken(false)
  localStorage.removeItem('token');
  navigate('/login')
}

  return (
   <div className="flex items-center justify-between py-5 px-6 md:px-10 border-b bg-white shadow-sm sticky top-0 z-50">

  {/* Logo */}
  <img className="w-40 cursor-pointer" src={assets.logo} alt="logo" />

  {/* Desktop Menu */}
  <ul className="hidden md:flex items-center gap-8 text-gray-700 font-medium">
    
    <NavLink to="/" className="relative group">
      <li>Home</li>
      <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
    </NavLink>

    <NavLink to="/doctors" className="relative group">
      <li>All Doctors</li>
      <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
    </NavLink>

    <NavLink to="/about" className="relative group">
      <li>About</li>
      <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
    </NavLink>

    <NavLink to="/contact" className="relative group">
      <li>Contact</li>
      <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
    </NavLink>

  </ul>

  {/* Right Section */}
  <div className="flex items-center gap-4">

    {token && userData ? (
      <div className="relative group cursor-pointer">

        {/* Profile */}
        <div className="flex items-center gap-2">
          <img
            className="w-9 h-9 rounded-full object-cover border"
            src={userData.image || "https://via.placeholder.com/40"}
            alt="profile"
          />
          <img className="w-3" src={assets.dropdown_icon} alt="" />
        </div>

        {/* Dropdown */}
        <div className="relative group">

  <div className="absolute right-0 top-full opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
    
    <div className="bg-white shadow-lg rounded-xl p-4 min-w-40 text-sm text-gray-700">
      
      <p onClick={() => navigate("/my-profile")} className="hover:text-blue-600 cursor-pointer py-1">
        My Profile
      </p>

      <p onClick={() => navigate("/my-appointments")} className="hover:text-blue-600 cursor-pointer py-1">
        My Appointments
      </p>

      <p onClick={logout} className="hover:text-red-500 hover:cursor-pointer py-1">
        Logout
      </p>

    </div>

  </div>

</div>
      </div>
    ) : (
      <button
        onClick={() => navigate("/login")}
        className="hidden md:block bg-linear-to-r from-blue-500 to-indigo-600 text-white px-6 py-2 rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-all"
      >
        Create Account
      </button>
    )}

    {/* Mobile Menu Icon */}
    <img
      onClick={() => setshowMenu(true)}
      className="w-6 md:hidden cursor-pointer"
      src={assets.menu_icon}
      alt=""
    />
  </div>

  {/* Mobile Menu */}
  <div
    className={`fixed top-0 right-0 h-full bg-white w-64 shadow-lg z-50 transform transition-transform duration-300 ${
      showMenu ? "translate-x-0" : "translate-x-full"
    } md:hidden`}
  >
    {/* Header */}
    <div className="flex items-center justify-between p-5 border-b">
      <img className="w-32" src={assets.logo} alt="" />
      <img
        className="w-6 cursor-pointer"
        onClick={() => setshowMenu(false)}
        src={assets.cross_icon}
        alt=""
      />
    </div>

    {/* Links */}
    <ul className="flex flex-col gap-4 p-5 text-gray-700 font-medium">
      <NavLink onClick={() => setshowMenu(false)} to="/">Home</NavLink>
      <NavLink onClick={() => setshowMenu(false)} to="/doctors">All Doctors</NavLink>
      <NavLink onClick={() => setshowMenu(false)} to="/about">About</NavLink>
      <NavLink onClick={() => setshowMenu(false)} to="/contact">Contact</NavLink>
    </ul>
  </div>

</div>
  );
};

export default Navbar;
