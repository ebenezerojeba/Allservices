


import React, { useState, useContext, useEffect } from "react";
import { ArtisanContext } from "../context/ArtisanContext";
import { AppContext } from "../context/AppContext";
import { MessageCircle, Check, X } from "lucide-react";
import ArtisanChat from "../components/ArtisanChat";

const ArtisanAppointment = () => {
  const {
    dToken,
    appointments,
    getAppointments,
    completeAppointment,
    cancelAppointment,
  } = useContext(ArtisanContext);
  const { slotDateFormat, currency } = useContext(AppContext);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {

    const fetchAppointments = async () => {
      if (dToken) {
        setIsLoading(true);
        await getAppointments();
       
      }
      setIsLoading(false)
    };
    
    fetchAppointments();
  }, [dToken, getAppointments]);

  const handleChatOpen = (appointment) => {
    setSelectedAppointment(appointment);
    setIsChatOpen(true);
  };

  const getStatusBadge = (appointment) => {
    if (appointment.cancelled) {
      return <span className="px-2 py-1 text-xs font-medium text-white bg-red-500 rounded-full">Cancelled</span>;
    } else if (appointment.isCompleted) {
      return <span className="px-2 py-1 text-xs font-medium text-white bg-green-500 rounded-full">Completed</span>;
    } else {
      return <span className="px-2 py-1 text-xs font-medium text-white bg-blue-500 rounded-full">Active</span>;
    }
  };

  const sortedAppointments = [...appointments].reverse();

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-6">
      <h2 className="mb-4 text-xl font-semibold text-gray-800">All Appointments</h2>
 
       
        <div className="bg-white border rounded shadow-sm overflow-hidden">
          {/* Header - Only visible on tablet and larger screens */}
          <div className="hidden md:grid md:grid-cols-7 gap-2 py-3 px-4 bg-gray-50 font-medium text-sm text-gray-600 border-b">
            <div className="col-span-2">Customer</div>
            <div>Payment</div>
            <div>Date & Time</div>
            <div>Fees</div>
            <div>Status</div>
            <div>Actions</div>
          </div>

          {/* Appointment List */}
          <div className="max-h-[70vh] overflow-y-auto">
            {sortedAppointments.map((appointment, index) => (
              <div 
                key={appointment._id || index}
                className="border-b last:border-b-0 hover:bg-gray-50 transition-colors"
              >
                {/* Mobile View */}
                <div className="md:hidden p-4 flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img
                        className="w-10 h-10 rounded-full object-cover border"
                        src={appointment.userData.image}
                        alt={appointment.userData.name}
                      />
                      <div>
                        <p className="font-medium">{appointment.userData.name}</p>
                        <p className="text-xs text-gray-500">
                          {slotDateFormat(appointment.slotDate)}, {appointment.slotTime}
                        </p>
                      </div>
                    </div>
                    {getStatusBadge(appointment)}
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <div>
                      <p className="text-gray-600">Payment: 
                        <span className={`ml-1 ${appointment.payment ? "text-green-500" : "text-blue-500"}`}>
                          {appointment.payment ? "Online" : "Cash"}
                        </span>
                      </p>
                      <p className="text-gray-600">Fee: <span className="font-medium">{currency}{appointment.amount}</span></p>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {!appointment.cancelled && !appointment.isCompleted && (
                        <>
                          <button
                            onClick={() => completeAppointment(appointment._id)}
                            className="p-2 bg-green-100 rounded-full text-green-600 hover:bg-green-200"
                            title="Complete appointment"
                          >
                            <Check className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => cancelAppointment(appointment._id)}
                            className="p-2 bg-red-100 rounded-full text-red-600 hover:bg-red-200"
                            title="Cancel appointment"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </>
                      )}
                      <button
                        onClick={() => handleChatOpen(appointment)}
                        className="p-2 bg-blue-100 rounded-full text-blue-600 hover:bg-blue-200"
                        title="Open chat"
                      >
                        <MessageCircle className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Desktop/Tablet View */}
                <div className="hidden md:grid md:grid-cols-7 gap-2 items-center py-4 px-4 text-sm">
                  <div className="col-span-2 flex items-center gap-3">
                    <img
                      className="w-10 h-10 rounded-full object-cover border"
                      src={appointment.userData.image}
                      alt={appointment.userData.name}
                    />
                    <span className="font-medium">{appointment.userData.name}</span>
                  </div>
                  <div>
                    <span className={`px-2 py-1 text-xs rounded-full ${appointment.payment ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"}`}>
                      {appointment.payment ? "Online" : "Cash"}
                    </span>
                  </div>
                  <div className="text-gray-600">
                    {slotDateFormat(appointment.slotDate)}<br />
                    <span className="text-xs">{appointment.slotTime}</span>
                  </div>
                  <div className="font-medium">{currency}{appointment.amount}</div>
                  <div>{getStatusBadge(appointment)}</div>
                  <div className="flex items-center gap-2">
                    {!appointment.cancelled && !appointment.isCompleted && (
                      <>
                        <button
                          onClick={() => completeAppointment(appointment._id)}
                          className="p-2 bg-green-100 rounded-full text-green-600 hover:bg-green-200"
                          title="Complete appointment"
                        >
                          <Check className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => cancelAppointment(appointment._id)}
                          className="p-2 bg-red-100 rounded-full text-red-600 hover:bg-red-200"
                          title="Cancel appointment"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </>
                    )}
                    <button
                      onClick={() => handleChatOpen(appointment)}
                      className="p-2 bg-blue-100 rounded-full text-blue-600 hover:bg-blue-200"
                      title="Open chat"
                    >
                      <MessageCircle className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
  

      {isChatOpen && selectedAppointment && (
        <ArtisanChat
          appointment={selectedAppointment}
          isOpen={isChatOpen}
          onClose={() => {
            setIsChatOpen(false);
            setSelectedAppointment(null);
          }}
        />
      )}
    </div>
  );
};

export default ArtisanAppointment;