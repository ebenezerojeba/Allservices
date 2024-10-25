import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { AlertCircle, CheckCircle, XCircle } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";

const MONTHS = [
  "",
  "Jan",
  "Feb",
  "March",
  "April",
  "May",
  "June",
  "July",
  "September",
  "October",
  "November",
  "December",
];

const AppointmentStatus = ({ status }) => {
  const statusConfig = {
    cancelled: {
      color: "text-red-500 border-red-500",
      icon: XCircle,
      text: "Appointment Cancelled",
    },
    completed: {
      color: "text-green-500 border-green-500",
      icon: CheckCircle,
      text: "Completed",
    },
    paid: {
      color: "text-stone-500 bg-indigo-50",
      icon: CheckCircle,
      text: "Paid",
    },
  };

  const config = statusConfig[status];
  if (!config) return null;

  const Icon = config.icon;
  return (
    <div
      className={`flex items-center gap-2 sm:min-w-48 py-2 px-4 border rounded ${config.color}`}
    >
      <Icon size={16} />
      <span className="text-sm">{config.text}</span>
    </div>
  );
};

const MyAppointments = () => {
  const { backendUrl, token, getDoctorsData } = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const formatSlotDate = (slotDate) => {
    if (!slotDate) return "";
    const [day, month, year] = slotDate.split("_");
    return `${day} ${MONTHS[Number(month)]} ${year}`;
  };

  const fetchAppointments = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const { data } = await axios.get(`${backendUrl}/api/user/appointments`, {
        headers: { token },
      });
      if (data.success) {
        setAppointments(data.appointments.reverse());
      }
    } catch (error) {
      setError(error.response?.data?.message || "Failed to fetch appointments");
      toast.error("Failed to fetch appointments");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/cancel-appointment`,
        { appointmentId },
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);
        await fetchAppointments();
        await getDoctorsData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to cancel appointment");
    }
  };

  useEffect(() => {
    if (token) {
      fetchAppointments();
    }
  }, [token]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-2">
        <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
        <div>
          <h3 className="text-red-800 font-medium">Error</h3>
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-lg font-medium text-zinc-700 border-b pb-3 mb-6">
        My Appointments
      </h2>

      {appointments.length === 0 ? (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-2xl">
          <h3 className="text-blue-800 font-medium">No appointments found</h3>
          <p className="text-blue-600 text-sm mt-1">
            You currently have no appointments scheduled.
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {appointments.map((appointment, index) => (
            <div
              key={index}
              className="bg-white rounded-lg border shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <div className="p-4">
                <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
                  {/* Image Section */}
                  <div className="flex-shrink-0">
                    <img
                      className="w-full h-auto sm:w-46 sm:h-46 bg-indigo-50 rounded-lg object-cover"
                      src={appointment.docData.image}
                      alt={`Dr. ${appointment.docData.name}`}
                    />
                  </div>

                  {/* Details Section */}
                  <div className="flex-grow space-y-2">
                    <h3 className="text-lg font-semibold text-neutral-800">
                      {appointment.docData.name}
                    </h3>
                    <p className="text-sm text-zinc-600">
                      {/* {appointment.docData.speciality} */}
                    </p>

                    <div className="space-y-1">
                      <p className="text-sm font-medium text-zinc-700">
                        Address:
                      </p>
                      <p className="text-xs text-zinc-600">
                        {appointment.docData.address.line1}
                      </p>
                      <p className="text-xs text-zinc-600">
                        {appointment.docData.address.line2}
                      </p>
                    </div>

                    <div className="pt-2">
                      <span className="text-sm font-medium text-neutral-700 block">
                        Date & Time
                      </span>
                      <span className="text-sm text-zinc-600">
                        {formatSlotDate(appointment.slotDate)} |{" "}
                        {appointment.slotTime}
                      </span>
                    </div>
                  </div>

                  {/* Action Section */}
                  <div className="mt-4 sm:mt-0 sm:ml-4 flex-shrink-0">
                    {appointment.cancelled ? (
                      <AppointmentStatus status="cancelled" />
                    ) : appointment.isCompleted ? (
                      <AppointmentStatus status="completed" />
                    ) : appointment.payment ? (
                      <AppointmentStatus status="paid" />
                    ) : (
                      <button
                        onClick={() => handleCancelAppointment(appointment._id)}
                        className="w-full sm:w-auto text-sm text-stone-500 py-2 px-6 border rounded-lg
                          hover:bg-red-500 hover:text-white hover:border-red-500
                          focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2
                          transition-all duration-200"
                      >
                        Cancel Appointment
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyAppointments;
