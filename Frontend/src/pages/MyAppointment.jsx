import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import {
  cancelAppointments,
  getMyAppointments,
} from "../api/appointmentBookApi";
import { toast } from "react-toastify";
import { PayOnline, verifyPay } from "../api/paymentApi";
import { useNavigate } from "react-router-dom";
import axios from "axios"
import { appointmentPdf } from "../api/pdfApi";

const MyAppointment = () => {
  const { backendUrl, token, getDoctorsData } = useContext(AppContext);
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
const {doctorerror,pageLoading } = useContext(AppContext);


  const months = [
    "",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split("_");
    return (
      dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
    );
  };
  const getUserAppointments = async () => {
    try {
      const response = await getMyAppointments(backendUrl, token);
      const data = response.data;
      if (data.success) {
        setAppointments(data.appointmentList);
        console.log(data.appointmentList);
        console.log("appointments", data);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  const cancelAppointment = async (appointmentId) => {
    try {
      const response = await cancelAppointments(
        backendUrl,
        appointmentId,
        token,
      );
      const data = response.data;
      if (data.success) {
        toast.success("Appointment Cancelled");
        await getUserAppointments();
        await getDoctorsData();
        console.log("success");
      } else {
        toast.error(data.message);
      }

      console.log(appointmentId);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const initpay = (order) => {
    const option = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Appointment Payment",
      description: "Appointment payment",
      order_id: order.id,
      receipt: order.receipt,
      handler: async (res) => {
        console.log(res);

        try {
          const response = await verifyPay(backendUrl, res, token);
          const data = response.data;
          if (data.success) {
            getUserAppointments();
            navigate("/my-appointments");
          }
        } catch (err) {
          console.log(err);
          toast.error(error.message);
        }
      },
    };
    const rzp = new window.Razorpay(option);
    rzp.open();
  };

  const appointmentRazorpay = async (appointmentId) => {
    try {
      const response = await PayOnline(backendUrl, appointmentId, token);

      const data = response.data;
      if (data.success) {
        console.log(data.order);
        initpay(data.order);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      getUserAppointments();
    }
  }, [token]);

  const downloadPDF = async (appointmentId) => {
    try {
      const response = await appointmentPdf(backendUrl,appointmentId,token)

      const url = window.URL.createObjectURL(new Blob([response.data]));

      const link = document.createElement("a");

      link.href = url;

      link.setAttribute("download", "appointment.pdf");

      document.body.appendChild(link);

      link.click();

      link.remove();
    } catch (error) {
      console.log(error);
      toast.error("PDF download failed");
    }
  };

   if (pageLoading) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-lg font-medium text-blue-600">
       Appointment Doctors...
      </p>
    </div>
  );
}

if (doctorerror) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-red-500">
        {doctorError}
      </p>
    </div>
  );
}
  return (
   <div className="max-w-6xl mx-auto px-4 mt-15 sm:px-6 lg:px-8 py-8">

  {/* Heading */}
  <div className="mb-8">
    <h1 className="text-xl sm:text-3xl font-bold text-blue-800">
      My Appointments
    </h1>

    <p className="text-sm text-gray-500 mt-1">
      Manage your booked appointments and payments
    </p>
  </div>

  {/* Appointments */}
  <div className="flex flex-col gap-6">

    {appointments &&
      appointments.slice(0, 50).map((item, idx) => (

        <div
          key={idx}
          className="bg-white border border-gray-200 rounded-3xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
        >

          <div className="flex flex-col lg:flex-row gap-6 p-5 sm:p-6">

            {/* Doctor Image */}
            <div className="flex justify-center lg:justify-start">

              <img
                className="w-32 h-32 sm:w-40 sm:h-40 object-cover rounded-2xl bg-blue-100 border border-blue-100"
                src={item.docData.image}
                alt=""
              />

            </div>

            {/* Doctor Info */}
            <div className="flex-1 text-sm text-gray-600">

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">

                <div>
                  <h2 className="text-xl font-semibold text-gray-800">
                    {item.docData.name}
                  </h2>

                  <p className="text-blue-600 font-medium mt-1">
                    {item.docData.speciality}
                  </p>
                </div>

                {/* Status Badge */}
                <div>
                  {/* {item.payment && !item.cancelled && !item.isCompleted && (
                    <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold border border-blue-200">
                      Paid
                    </span>
                  )} */}

                  {/* {!item.payment &&
                    !item.cancelled &&
                    !item.isCompleted && (
                      <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-yellow-50 text-yellow-700 text-xs font-semibold border border-yellow-200">
                        Pending Payment
                      </span>
                    )} */}

                  {item.cancelled && (
                    <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-red-50 text-red-700 text-xs font-semibold border border-red-200">
                      Cancelled
                    </span>
                  )}

                  {/* {item.isCompleted && (
                    <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-green-50 text-green-700 text-xs font-semibold border border-green-200">
                      Completed
                    </span>
                  )} */}
                </div>
              </div>

              {/* Address */}
              {/* <div className="mt-5 space-y-1">

                <p className="font-semibold text-gray-700">
                  Address
                </p>

                <p className="text-sm text-gray-500">
                  {item.address?.line1}
                </p>

                <p className="text-sm text-gray-500">
                  {item.address?.line2}
                </p>

              </div> */}

              {/* Date */}
              <div className="mt-5">

                <p className="text-sm">
                  <span className="font-semibold text-gray-700">
                    Date & Time:
                  </span>{" "}
                  {slotDateFormat(item.slotDate)} | {item.slotTime}
                </p>

              </div>

              {/* Receipt */}
              {item.payment && (
                <button
                  onClick={() => downloadPDF(item._id)}
                  className="mt-5 inline-flex items-center gap-2 text-sm text-blue-700 font-medium hover:text-blue-900 transition cursor-pointer"
                >
                  📄 Download Receipt
                </button>
              )}

            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3 justify-center lg:w-52">

              {!item.cancelled &&
                item.payment &&
                !item.isCompleted && (
                  <button className="w-full text-sm text-center text-blue-700 font-semibold px-4 py-3 rounded-xl border border-blue-200 bg-blue-50 hover:bg-blue-600 hover:text-white transition-all duration-300 cursor-pointer">
                    Paid
                  </button>
                )}

              {!item.cancelled &&
                !item.payment &&
                !item.isCompleted && (
                  <button
                    onClick={() => appointmentRazorpay(item._id)}
                    className="w-full text-sm text-center text-white font-semibold px-4 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 transition-all duration-300 cursor-pointer shadow-md"
                  >
                    Pay Online
                  </button>
                )}

              {!item.cancelled && !item.isCompleted && (
                <button
                  onClick={() => cancelAppointment(item._id)}
                  className="w-full text-sm text-center text-red-600 font-semibold px-4 py-3 rounded-xl border border-red-200 bg-red-50 hover:bg-red-600 hover:text-white transition-all duration-300 cursor-pointer"
                >
                  Cancel Appointment
                </button>
              )}

              {item.cancelled && !item.isCompleted && (
                <button className="w-full text-sm text-center text-red-700 font-semibold px-4 py-3 rounded-xl border border-red-200 bg-red-50 cursor-not-allowed">
                  Appointment Cancelled
                </button>
              )}

              {item.isCompleted && (
                <button className="w-full text-sm text-center text-green-700 font-semibold px-4 py-3 rounded-xl border border-green-200 bg-green-50 cursor-default">
                  Completed
                </button>
              )}

            </div>

          </div>
        </div>
      ))}
  </div>
</div>
  );
};

export default MyAppointment;
