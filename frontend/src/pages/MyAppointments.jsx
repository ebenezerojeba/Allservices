import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../context/AppContext";
// import { AlertCircle, CheckCircle, XCircle } from "lucide-react";
import { AlertCircle, CheckCircle, XCircle, MessageCircle } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
import Chat from "../components/Chat";

const MONTHS = [
  "",
  "Jan",
  "Feb",
  "March",
  "April",
  "May",
  "June",
  "July",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
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
  const [selectedChat, setSelectedChat] = useState(null);

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
        <div className="grid gap-2 w-full max-w-4xl mx-auto">
          {appointments.map((appointment, index) => (
            <div
              key={index}
              className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 ease=in-out overflow-hidden"
            >
              <div className="p-4">
                <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
                  {/* Image Section */}
                  <div className="flex-shrink-0 w-full sm:w-44 h-44 sm:h-44">
                    <img
                      className="w-full h-full  bg-indigo-50 rounded-lg object-cover"
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
     {/* Action Section - Updated for better responsiveness */}
     <div className="mt-4 sm:mt-0 sm:ml-4 flex-shrink-0">
                    <div className="flex flex-col sm:flex-row gap-2">
                      {appointment.cancelled ? (
                        <AppointmentStatus status="cancelled" />
                      ) : appointment.isCompleted ? (
                        <AppointmentStatus status="completed" />
                      ) : appointment.payment ? (
                        <>
                          <AppointmentStatus status="paid" />
                          <button
                            onClick={() => setSelectedChat(appointment)}
                            className="w-full sm:w-auto text-sm text-primary py-2 px-6 border rounded-lg
                              hover:bg-primary hover:text-white hover:border-primary
                              focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
                              transition-all duration-200 flex items-center justify-center gap-2"
                          >
                            <MessageCircle className="w-4 h-4" />
                            <span>Chat</span>
                          </button>
                        </>
                      ) : (
                        <div className="flex flex-col sm:flex-row gap-2 w-full">
                          <button
                            onClick={() => handleCancelAppointment(appointment._id)}
                            className="w-full sm:w-auto text-sm text-stone-500 py-2 px-6 border rounded-lg
                              hover:bg-red-500 hover:text-white hover:border-red-500
                              focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2
                              transition-all duration-200"
                          >
                            Cancel Appointment
                          </button>
                          <button
                            onClick={() => setSelectedChat(appointment)}
                            className="w-full sm:w-auto text-sm text-primary py-2 px-6 border rounded-lg
                              hover:bg-primary hover:text-white hover:border-primary
                              focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
                              transition-all duration-200 flex items-center justify-center gap-2"
                          >
                            <MessageCircle className="w-4 h-4" />
                            <span>Chat</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedChat && (
        <Chat
          appointment={selectedChat}
          isOpen={!!selectedChat}
          onClose={() => setSelectedChat(null)}
        />
      )}
    </div>
  );
};

export default MyAppointments;
