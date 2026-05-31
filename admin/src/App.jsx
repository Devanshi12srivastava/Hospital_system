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
import { Navigate } from "react-router-dom";

const App = () => {
  const { adminToken } = useContext(AdminContext);
  const { dToken } = useContext(DoctorContext);

  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login />,
    },

    {
      path: "/",
      element:
        adminToken || dToken ? (
          <Layout />
        ) : (
          <Navigate to="/login" />
        ),

      children: [
        { index: true, element: <Dashboard /> },

        { path: "admin-dashboard", element: <Dashboard /> },

        { path: "all-appointment", element: <AllApointment /> },

        { path: "add-doctor", element: <AddDoctor /> },

        { path: "doctor-list", element: <DoctorsList /> },

        // doctor routes
        { path: "doctor-dashboard", element: <DoctorDashboard /> },

        {
          path: "doctor-appointment",
          element: <DoctorAppointment />,
        },

        {
          path: "doctor-profile",
          element: <Doctorprofile />,
        },
      ],
    },
  ]);

  return (
    <div className=" min-h-screen">
      <ToastContainer />
      <RouterProvider router={router} />
    </div>
  );
};

export default App;