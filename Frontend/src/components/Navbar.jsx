import { NavLink, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets/assets";
import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const navigate = useNavigate();

  const [showMenu, setshowMenu] = useState(false);
  // const [token, setToken] = useState(true);
  const { token, setToken, userData } = useContext(AppContext);

  const logout = () => {
    setToken(false);
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-white/70 backdrop-blur-xl border-b border-gray-200/60 shadow-sm">
      <div className="flex items-center justify-between py-3 px-6 md:px-14">
        {/* Logo */}
        <img
          className="w-36 md:w-40 cursor-pointer hover:scale-[1.03] transition"
          src={assets.Doc_logo}
          alt="logo"
        />

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center justify-center gap-14 text-gray-700 font-medium text-[16px] tracking-wide">
          {[
            { to: "/", label: "Home" },
            { to: "/doctors", label: "Doctors" },
            { to: "/about", label: "About" },
            { to: "/contact", label: "Contact" },
          ].map((item) => (
            <NavLink key={item.to} to={item.to} className="relative group">
              <li className="list-none hover:text-blue-600 transition-colors duration-200">
                {item.label}
              </li>

              <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-linear-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-300 group-hover:w-full"></span>
            </NavLink>
          ))}
        </ul>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {token && userData ? (
            <div className="relative group">
              {/* Profile Button */}
              <div className="flex items-center gap-2 px-2 py-1 rounded-full hover:bg-gray-100 transition cursor-pointer">
                <img
                  className="w-9 h-9 rounded-full object-cover border border-gray-200"
                  src={userData.image || "https://via.placeholder.com/40"}
                  alt="profile"
                />

                <img
                  className="w-3 opacity-60"
                  src={assets.dropdown_icon}
                  alt=""
                />
              </div>

              {/* Dropdown */}
              <div className="absolute right-0 top-12 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="bg-white border border-gray-100 shadow-xl rounded-xl p-2 min-w-44 text-sm text-gray-700">
                  <p
                    onClick={() => navigate("/my-profile")}
                    className="px-3 py-2 rounded-md hover:bg-gray-50 hover:text-blue-600 cursor-pointer"
                  >
                    My Profile
                  </p>

                  <p
                    onClick={() => navigate("/my-appointments")}
                    className="px-3 py-2 rounded-md hover:bg-gray-50 hover:text-blue-600 cursor-pointer"
                  >
                    My Appointments
                  </p>

                  <p
                    onClick={() => {
                      const confirmLogout = window.confirm(
                        "Are you sure you want to logout?",
                      );
                      if (confirmLogout) {
                        logout();
                      }
                    }}
                    className="px-3 py-2 rounded-md hover:bg-red-50 hover:text-red-500 cursor-pointer"
                  >
                    Logout
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="hidden md:block bg-linear-to-r from-blue-500 to-indigo-600 text-white px-6 py-2 rounded-full shadow-md hover:shadow-lg hover:scale-[1.04] transition-all duration-200"
            >
              Create Account
            </button>
          )}

          {/* Mobile Menu Icon */}
          <img
            onClick={() => setshowMenu(true)}
            className="w-6 md:hidden cursor-pointer hover:scale-110 transition z-50"
            src={assets.menu_icon}
            alt=""
          />
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-0 z-50 md:hidden transition-all duration-300 ${
          showMenu ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        {/* Overlay */}
        <div
          onClick={() => setshowMenu(false)}
          className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${
            showMenu ? "opacity-100" : "opacity-0"
          }`}
        ></div>

        {/* Sidebar */}
        <div
          className={`absolute top-0 right-0 h-full w-72 bg-white shadow-2xl transform transition-transform duration-300 ${
            showMenu ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-5 border-b">
            <img className="w-28" src={assets.Doc_logo} alt="" />

            <img
              className="w-6 cursor-pointer hover:rotate-90 transition"
              onClick={() => setshowMenu(false)}
              src={assets.cross_icon}
              alt=""
            />
          </div>

          {/* Sidebar Links */}
          <ul className="flex flex-col gap-2 p-5 text-gray-700">
            {[
              { to: "/", label: "Home" },
              { to: "/doctors", label: "Doctors" },
              { to: "/about", label: "About" },
              { to: "/contact", label: "Contact" },
            ].map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setshowMenu(false)}
                className="py-3 px-4 rounded-lg hover:bg-gray-100 hover:text-blue-600 transition"
              >
                {item.label}
              </NavLink>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
