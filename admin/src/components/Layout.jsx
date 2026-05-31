import {Outlet} from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Layout = () => {
  return (
    <>
      <Navbar />
      <div className="flex w-full overflow-x-hidden">
        {/* <Sidebar /> */}
        <div className="flex-1 p-6">
          <Outlet />
        </div>
      </div>
    </>
  );
}; 
export default Layout;