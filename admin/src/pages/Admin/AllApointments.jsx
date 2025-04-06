// import React, { useContext, useEffect } from "react";
// import { AdminContext } from "../../context/AdminContext";
// import { AppContext } from "../../context/AppContext";
// import { assets } from "../../assets/assets";

// const AllAppointments = () => {
//   const { aToken, getAllAppointments, appointments, cancelAppointment } = useContext(AdminContext);
//   const { slotDateFormat, currency } = useContext(AppContext);

//   useEffect(() => {
//     if (aToken) {
//       getAllAppointments();
//     }
//   }, [aToken]);

//   return (
//     <div className="w-full max-w-6xl mx-auto px-4 py-6">
//       <h2 className="text-xl font-semibold mb-4">All Appointments</h2>

//       <div className="bg-white border rounded-lg shadow-sm overflow-y-auto max-h-[80vh] min-h-[60vh] text-sm">
//         {/* Table Header - hidden on small screens */}
//         <div className="hidden sm:grid grid-cols-[0.5fr_2fr_1fr_2.5fr_2fr_1fr_1fr] py-3 px-6 border-b bg-gray-100 font-medium text-gray-700">
//           <p>#</p>
//           <p>Customer</p>
          
//           <p>Date & Time</p>
//           <p>Artisan</p>
//           <p>Fees</p>
//           <p>Status</p>
//         </div>

//         {appointments.length === 0 && (
//           <div className="p-6 text-center text-gray-400">No appointments found.</div>
//         )}

//         {[...appointments].reverse().map((item, index) => (
//           <div
//             key={index}
//             className="flex flex-col sm:grid sm:grid-cols-[0.5fr_2fr_1fr_2.5fr_2fr_1fr_1fr] items-center gap-2 sm:gap-0 py-4 px-4 sm:px-6 border-b hover:bg-gray-50 transition"
//           >
//             <p className="hidden sm:block">{index + 1}</p>

//             <div className="flex items-center gap-2 w-full sm:w-auto">
//               <img src={item.userData.image} alt="User" className="w-8 h-8 rounded-full object-cover" />
//               <p>{item.userData.name}</p>
//             </div>


//             <p className="w-full sm:w-auto text-gray-600 text-sm text-center sm:text-left">
//               {slotDateFormat(item.slotDate)}, {item.slotTime}
//             </p>

//             <div className="flex items-center gap-2 w-full sm:w-auto">
//               <img src={item.docData.image} alt="Artisan" className="w-8 h-8 rounded-full bg-gray-200 object-cover" />
//               <p>{item.docData.name}</p>
//             </div>

//             <p className="text-xs text-gray-700">
//               {currency}
//               {item.amount.toLocaleString()}
//             </p>

//             <div className="flex justify-center items-center w-full sm:w-auto">
//               {item.cancelled ? (
//                 <p className="text-red-500 text-xs font-semibold">Cancelled</p>
//               ) : item.isCompleted ? (
//                 <p className="text-green-500 text-xs font-semibold">Completed</p>
//               ) : (
//                 <img
//                   onClick={() => cancelAppointment(item._id)}
//                   src={assets.cancel_icon}
//                   alt="Cancel"
//                   className="w-6 cursor-pointer hover:opacity-80 transition"
//                 />
//               )}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default AllAppointments;



import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";

const AllAppointments = () => {
  const { aToken, getAllAppointments, appointments, cancelAppointment } = useContext(AdminContext);
  const { slotDateFormat, currency } = useContext(AppContext);

  useEffect(() => {
    if (aToken) {
      getAllAppointments();
    }
  }, [aToken]);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-6">
      <h2 className="text-xl font-semibold mb-4">All Appointments</h2>

      <div className="bg-white border rounded-lg shadow-sm overflow-y-auto max-h-[80vh] min-h-[60vh] text-sm">
        {/* Header for large screens */}
        <div className="hidden sm:grid grid-cols-[0.5fr_2fr_2fr_2.5fr_1.5fr_1fr] py-3 px-6 border-b bg-gray-100 font-medium text-gray-700">
          <p>#</p>
          <p>Customer</p>
          <p>Date & Time</p>
          <p>Artisan</p>
          <p>Fees</p>
          <p>Status</p>
        </div>

        {/* Empty State */}
        {appointments.length === 0 && (
          <div className="p-6 text-center text-gray-400">No appointments found.</div>
        )}

        {/* Appointment Items */}
        {[...appointments].reverse().map((item, index) => (
          <div
            key={index}
            className="flex flex-col sm:grid sm:grid-cols-[0.5fr_2fr_2fr_2.5fr_1.5fr_1fr] items-center sm:items-start gap-y-4 sm:gap-0 py-4 px-4 sm:px-6 border-b hover:bg-gray-50 transition"
          >
            <p className="hidden sm:block">{index + 1}</p>

            {/* Customer */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <img src={item.userData.image} alt="User" className="w-8 h-8 rounded-full object-cover" />
              <p className="text-gray-800">{item.userData.name}</p>
            </div>

            {/* Date & Time */}
            <p className="w-full sm:w-auto text-gray-600 text-sm sm:text-left text-center">
              {slotDateFormat(item.slotDate)}, {item.slotTime}
            </p>

            {/* Artisan */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <img src={item.docData.image} alt="Artisan" className="w-8 h-8 rounded-full bg-gray-200 object-cover" />
              <p className="text-gray-800">{item.docData.name}</p>
            </div>

            {/* Fees */}
            <p className="text-xs text-gray-700 text-center sm:text-left">
              {currency}{item.amount.toLocaleString()}
            </p>

            {/* Status */}
            <div className="flex justify-center sm:justify-start w-full sm:w-auto">
              {item.cancelled ? (
                <p className="text-red-500 text-xs font-semibold">Cancelled</p>
              ) : item.isCompleted ? (
                <p className="text-green-500 text-xs font-semibold">Completed</p>
              ) : (
                <img
                  onClick={() => cancelAppointment(item._id)}
                  src={assets.cancel_icon}
                  alt="Cancel"
                  className="w-6 cursor-pointer hover:opacity-80 transition"
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllAppointments;
