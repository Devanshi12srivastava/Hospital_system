import Login from "./pages/login";
import { useContext } from "react";
import { AdminContext } from "./context/AdminContext";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Admin/Dashboard";
import AllApointment from "./pages/Admin/AllApointment";
import AddDoctor from "./pages/Admin/AddDoctor";
import DoctorsList from "./pages/Admin/DoctorsList";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [{ index: true, element: <Dashboard/>},
     { path:'admin-dashboard',element:<Dashboard/>},
     {path:'all-appointment', element:<AllApointment/>},
     {path:'add-doctor',element:<AddDoctor/>},
     {path:'doctor-list',element:<DoctorsList/>}
    ],
  },
]);

const App = () => {
  const { adminToken } = useContext(AdminContext);
  return adminToken ? (
    <div className="bg-gray-100">
      <RouterProvider router={router} />
    </div>
  ) : (
    <>
      <Login />
    </>
  );
};

export default App;
