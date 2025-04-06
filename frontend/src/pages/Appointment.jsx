// Import Statements
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import { PenTool } from "lucide-react";
// import Relatedartisans from "../components/Relatedartisans";
import axios from "axios";
import { toast } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader";
import "react-toastify/dist/ReactToastify.css";
import AnimatedText from "../components/AnimatedText";

// Initialize Toastify

const Appointment = () => {
  const { docId } = useParams();
  const {
    artisans,
    currencySymbol,
    backendUrl,
    token,
    userData,
    getArtisansData,
  } = useContext(AppContext);
  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  // State Variables
  const [artisanInfo, setArtisanInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const [selectedSlotIndex, setSelectedSlotIndex] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch Doctor Information
  const fetchArtisanInfo = () => {
    const findArtisan = artisans.find((doc) => doc._id === docId);
    setArtisanInfo(findArtisan);
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
          artisanInfo.slots_booked[slotDate] &&
          artisanInfo.slots_booked[slotDate].includes(slotTime)
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
    setIsLoading(true);
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
        setIsLoading(false)
        getArtisansData();
        navigate("/my-appointments");
      } else {
        toast.error(data.message);
        setIsLoading(false)
      }
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      console.error(error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  // Effect Hooks
  useEffect(() => {
    fetchArtisanInfo();
  }, [artisans, docId]);

  useEffect(() => {
    if (artisanInfo) {
      getAvailableSlot();
    }
  }, [artisanInfo]);

  useEffect(() => {
    console.log(docSlots);
  }, [docSlots]);

  // Render
  return (
    artisanInfo && (
      <div className="bg-stone-50 min-h-screen p-4">
        {/* Artisan Details */}
        <div className="flex flex-col sm:flex-row gap-4 max-w-7xl mx-auto">
          <div className="sm:w-1/3">
            <img
              className="w-full h-[400px] object-cover rounded-xl shadow-lg"
              src={artisanInfo.image}
              alt={`${artisanInfo.name}'s workshop`}
            />
          </div>
          <div className="flex-1 bg-white rounded-xl p-8 shadow-md border border-stone-200">
            {/* Artisan Info */}
            <div className="border-b border-stone-200 pb-6">
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-serif font-light text-stone-800">
                  {artisanInfo.name}
                </h1>
                <img
                  className="w-6"
                  src={assets.verified_icon}
                  alt="master craftsman"
                />
              </div>
              <div className="flex items-center gap-4 mt-3 text-stone-600">
                <p className="text-sm">Master of {artisanInfo.speciality}</p>
                <div className="h-1 w-1 bg-stone-300 rounded-full"></div>
                <span className="text-xs italic">Artisan Excellence</span>
              </div>
            </div>

            {/* Artisan About */}
            <div className="mt-6">
              <h2 className="text-lg font-Ysabeau font-bold text-stone-800 mb-3  uppercase">
                Craftsmanship Journey
              </h2>
                <AnimatedText text={artisanInfo.about}  className="text-stone-600 leading-relaxed" />
            </div>

            <div className="mt-6 p-4 bg-stone-50 rounded-lg">
              <p className="text-stone-800 font-Ysabeau font-bold">
                Commission Fee:{" "}
                <span className="text-stone-900 font-medium">
                  {currencySymbol}
                  {artisanInfo.fee.toLocaleString()}
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Booking Section */}
        <div className="max-w-7xl mx-auto mt-12">
          <h2 className="text-2xl font-bold font-Ysabeau">Book Service</h2>
          <p className="text-gray-600">
            Select your preferred date and time for the service
          </p>

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
                      ? "bg-blue-800 text-white"
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
                      ? "bg-blue-800 text-white"
                      : "text-gray-400 border border-gray-300"
                  } `}
                  key={slotIdx}
                >
                  {slot.time.toLowerCase()}
                </button>
              ))}
          </div>

          <div className="mt-8 flex">
            {" "}
            <button
              onClick={bookAppointment}
              disabled={isLoading}
              className="w-full sm:w-auto bg-blue-800 text-white px-6 py-3 rounded-full font- flex items-center justify-center hover:bg-blue-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <ClipLoader color="#FFFFFF" size={24} />
              ) : (
                <>
                  
                  Book an Appointment
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    )
  );
};
export default Appointment;
