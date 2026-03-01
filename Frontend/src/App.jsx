import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import MyAppointment from "./pages/MyAppointment";
import Layout from "./components/layout";
import Doctors from "./pages/Doctors";
import Login from "./pages/Login";
import Contact from "./pages/Contact";
import MyProfile from "./pages/MyProfile";
import Appointmnet from "./pages/Appointmnet";
import About from "./pages/About";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "appointment", element: <MyAppointment /> },
      { path: "doctors/:speciality", element: <Doctors /> },
      { path: "doctors", element: <Doctors /> },
      { path: "login", element: <Login /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
      { path: "my-profile", element: <MyProfile /> },
      { path: "my-appointments", element: <MyAppointment /> },
      { path: "appointment/:docId", element: <Appointmnet /> },
    ],
  },
]);

const App = () => {
  
 
  return(
  <>
   <ToastContainer/>
   <RouterProvider router={router} />;
   </>
  )
};

export default App;
