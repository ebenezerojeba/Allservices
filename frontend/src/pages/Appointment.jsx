// Import Statements
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import RelatedDoctors from "../components/RelatedDoctors";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Initialize Toastif

const Appointment = () => {
  const { docId } = useParams();
  const {
    doctors,
    currencySymbol,
    backendUrl,
    token,
    userData,
    getDoctorsData,
  } = useContext(AppContext);
  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  // State Variables
  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const [selectedSlotIndex, setSelectedSlotIndex] = useState(null);
  const navigate = useNavigate();

  // Fetch Doctor Information
  const fetchDocInfo = () => {
    const foundDoc = doctors.find((doc) => doc._id === docId);
    setDocInfo(foundDoc);
  };

  // Generate Available Slots
  const getAvailableSlot = () => {
    const newDocSlots = [];
    const today = new Date();

    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      const endTime = new Date(currentDate);
      endTime.setHours(21, 0, 0, 0); // 9:00 PM

      let startTime = new Date(currentDate);
      if (i === 0) {
        // Today's slots start from the next hour or 10 AM, whichever is later
        const nextHour = new Date();
        nextHour.setHours(nextHour.getHours() + 1, 0, 0, 0);
        const tenAM = new Date(currentDate);
        tenAM.setHours(10, 0, 0, 0);
        startTime = new Date(Math.max(nextHour.getTime(), tenAM.getTime()));
      } else {
        startTime.setHours(10, 0, 0, 0); // 10:00 AM
      }

      const timeSlots = [];

      while (startTime < endTime) {
        const formattedTime = startTime.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        let day = startTime.getDate();
        let month = startTime.getMonth() + 1;
        let year = startTime.getFullYear();

        const slotDate = `${day}_${month}_${year}`;
        const slotTime = formattedTime;

        const isSlotAvailable =
          docInfo.slots_booked[slotDate] &&
          docInfo.slots_booked[slotDate].includes(slotTime)
            ? false
            : true;
        if (isSlotAvailable) {
          timeSlots.push({
            datetime: new Date(startTime),
            time: formattedTime,
          });
        }

        // Increment time by 30 minutes
        startTime.setMinutes(startTime.getMinutes() + 30);
      }

      newDocSlots.push(timeSlots);
    }

    setDocSlots(newDocSlots);
  };

  // Book Appointment Function
  const bookAppointment = async () => {
    if (!token) {
      toast.warn("Login to book appointment");
      return navigate("/login");
    }

    if (selectedSlotIndex === null) {
      toast.warn("Please select a time slot");
      return;
    }

    try {
      const selectedSlot = docSlots[selectedDayIndex][selectedSlotIndex];
      const selectedDate = selectedSlot.datetime;

      const day = selectedDate.getDate();
      const month = selectedDate.getMonth() + 1;
      const year = selectedDate.getFullYear();

      const slotDate = `${day}_${month}_${year}`;
      const slotTime = selectedSlot.time;

      const { data } = await axios.post(
        `${backendUrl}/api/user/book-appointment`,
        { userData, docId, slotTime, slotDate },
        {
          headers: { token },
        }
      );

      if (data.success) {
        toast.success(data.message);
        getDoctorsData();
        navigate("/my-appointments");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  // Effect Hooks
  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);

  useEffect(() => {
    if (docInfo) {
      getAvailableSlot();
    }
  }, [docInfo]);

  useEffect(() => {
    console.log(docSlots);
  }, [docSlots]);

  // Render
  return (
    docInfo && (
      <div>
        {/* Doctor Details */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div>
            <img
              className="bg-primary w-full sm:max-w-72 rounded-lg"
              src={docInfo.image}
              alt={`${docInfo.name}`}
            />
          </div>
          <div className="flex-1 border border-gray-400 rounded-lg p-8 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0">
            {/* Doctor Info: Name, Degree, Experience */}
            <p className="flex items-center gap-2 text-2xl font-medium text-gray-900">
              {docInfo.name}
              <img
                className="w-5"
                src={assets.verified_icon}
                alt="verified-icon"
              />
            </p>
            <div className="flex items-center gap-2 text-sm mt-1 text-gray-600">
              <p>
                {docInfo.degree} - {docInfo.speciality}
              </p>
              <button className="py-0.5 px-2 border text-xs rounded-full">
                {docInfo.experience} yrs
              </button>
            </div>

            {/* Doctor About */}
            <div>
              <p className="flex items-center gap-1 text-sm font-medium text-gray-900 mt-3">
                About <img src={assets.info_icon} alt="info icon" />
              </p>
              <p className="text-sm text-gray-500 max-w-[700px] mt-1">
                {docInfo.about}
              </p>
            </div>
            <p className="text-gray-500 font-medium mt-4">
              Appointment fee:{" "}
              <span className="text-gray-600">
                {currencySymbol}
                {docInfo.fee}
              </span>
            </p>
          </div>
        </div>

        {/* Booking Slot */}
        <div className="sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700">
          <p>Booking slots</p>
          <div className="flex gap-3 items-center w-full overflow-x-scroll mt-4">
            {docSlots.length > 0 &&
              docSlots.map((daySlots, dayIndex) => (
                <button
                  onClick={() => {
                    setSelectedDayIndex(dayIndex);
                    setSelectedSlotIndex(null); // Reset selected slot when day changes
                  }}
                  className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${
                    selectedDayIndex === dayIndex
                      ? "bg-primary text-white"
                      : "border border-gray-400"
                  }`}
                  key={dayIndex}
                >
                  <p>
                    {daySlots[0] && daysOfWeek[daySlots[0].datetime.getDay()]}
                  </p>
                  <p>{daySlots[0] && daySlots[0].datetime.getDate()}</p>
                </button>
              ))}
          </div>

          <div className="flex items-center gap-3 w-full overflow-x-scroll mt-4">
            {docSlots.length > 0 &&
              docSlots[selectedDayIndex].map((slot, slotIdx) => (
                <button
                  onClick={() => setSelectedSlotIndex(slotIdx)}
                  className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${
                    selectedSlotIndex === slotIdx
                      ? "bg-primary text-white"
                      : "text-gray-400 border border-gray-300"
                  } `}
                  key={slotIdx}
                >
                  {slot.time.toLowerCase()}
                </button>
              ))}
          </div>

          <button
            onClick={bookAppointment}
            className="bg-primary text-white text-sm font-light px-14 py-3 rounded-full my-6"
          >
            Book an Appointment
          </button>
        </div>

        {/* Related Doctors */}
        <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
      </div>
    )
  );
};

export default Appointment;
