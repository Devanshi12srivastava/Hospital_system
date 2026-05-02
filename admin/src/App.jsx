import Login from "./pages/login";
import { useContext, useState } from "react";
import { AdminContext } from "./context/AdminContext";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Admin/Dashboard";
import AllApointment from "./pages/Admin/AllApointment";
import AddDoctor from "./pages/Admin/AddDoctor";
import DoctorsList from "./pages/Admin/DoctorsList";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DoctorContext } from "./context/DoctorContaext";
import DoctorDashboard from "./pages/Doctor/DoctorDashboard";
import DoctorAppointment from "./pages/Doctor/DoctorAppointment";
import Doctorprofile from "./pages/Doctor/Doctorprofile";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [{ index: true, element: <Dashboard/>},
     { path:'admin-dashboard',element:<Dashboard/>},
     {path:'all-appointment', element:<AllApointment/>},
     {path:'add-doctor',element:<AddDoctor/>},
     {path:'doctor-list',element:<DoctorsList/>},

     //doctor page route
     {path:'doctor-dashboard',element:<DoctorDashboard/>},{path:'doctor-appointment',element:<DoctorAppointment/>},
     {path:'doctor-profile', element:<Doctorprofile/>}
    ],
  },
]);

const App = () => {
  
  const { adminToken } = useContext(AdminContext);
  const {dToken} = useContext(DoctorContext)
  return adminToken || dToken ? (
    
    <div className="bg-gray-100">
            
  <ToastContainer />
      <RouterProvider router={router} />
    </div>
  ) : (
    <>
      <Login />
    </>
  );
};

export default App;
