import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext"; // assuming AppContext might be needed later

const Artisans = () => {
  const [filterDoc, setFilterDoc] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [query, setQuery] = useState("");
  const { speciality } = useParams();
  const { artisans } = useContext(AppContext);

  const navigate = useNavigate();

  const applyFilter = () => {
    let filtered = artisans;

    if (speciality) {
      filtered = filtered?.filter(
        (doc) => doc.speciality.toLowerCase() === speciality.toLowerCase()
      );
    }

    if (query) {
      filtered = filtered.filter(
        (doc) =>
          doc.name.toLowerCase().includes(query.toLowerCase()) ||
          doc.speciality.toLowerCase().includes(query.toLowerCase())
      );
    }

    setFilterDoc(filtered);
  };

  useEffect(() => {
    applyFilter();
  }, [artisans, speciality, query]);

  return (
    <div className="p-4">
      {/* Search Input and Button */}
      <div className="flex flex-col sm:flex-row items-center mb-6">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="
            py-3 px-5 mb-4 sm:mb-0 sm:mr-3 rounded-lg w-full sm:w-auto flex-grow 
            bg-white border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 
            focus:outline-none transition duration-300 ease-in-out text-gray-700
            placeholder:text-gray-500
          "
          placeholder="Search by name or speciality"
        />
        <button
          onClick={applyFilter}
          className="
            w-full sm:w-auto bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg
            transition duration-300 ease-in-out shadow-md hover:shadow-lg focus:ring-2 focus:ring-blue-300 
            focus:outline-none 
          "
        >
          Search
        </button>
      </div>
      {/* <p className="text-gray-600">Browse through the artisans specialist</p> */}

      <div className="flex flex-col sm:flex-row items-start gap-5 mt-5">
        <button
          className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${
            showFilter ? "bg-primary" : ""
          }`}
          onClick={() => setShowFilter((prev) => !prev)}
        >
          FILTERS
        </button>
        <div
          className={`flex-col gap-4 text-sm text-gray-600 ${
            showFilter ? "flex" : "hidden sm:flex"
          }`}
        >
          <p
            onClick={() =>
              speciality === "Barbering"
                ? navigate("/artisans")
                : navigate("/artisans/Barbering")
            }
            className={`w-[94vw] sm:w-auto p1-3 py-1.5 pr-16 border-gray-300 rounded transition-all cursor-pointer ${
              speciality === "Barbering" ? "bg-indigo-100 text-black" : ""
            }`}
          >
            Barbering
          </p>
          <p
            onClick={() =>
              speciality === "Makeup"
                ? navigate("/artisans")
                : navigate("/artisans/Makeup")
            }
            className={`w-[94vw] sm:w-auto p1-3 py-1.5 pr-16 border-gray-300 rounded transition-all cursor-pointer ${
              speciality === "Makeup" ? "bg-indigo-100 text-black" : ""
            } `}
          >
            Makeup
          </p>
          <p
            onClick={() =>
              speciality === "Nails-Lashes"
                ? navigate("/artisans")
                : navigate("/artisans/Nails-Lashes")
            }
            className={`w-[94vw] sm:w-auto p1-3 py-1.5 pr-16 border-gray-300 rounded transition-all cursor-pointer ${
              speciality === "Nails-Lashes" ? "bg-indigo-100 text-black" : ""
            } `}
          >
            Nails & Lashes
          </p>
          <p
            onClick={() =>
              speciality === "Tatoo Art"
                ? navigate("/artisans")
                : navigate("/artisans/Tatoo Art")
            }
            className={`w-[94vw] sm:w-auto p1-3 py-1.5 pr-16 border-gray-300 rounded transition-all cursor-pointer ${
              speciality === "Tatoo Art" ? "bg-indigo-100 text-black" : ""
            } `}
          >
            Tattoo Art
          </p>
          <p
            onClick={() =>
              speciality === "Massage"
                ? navigate("/artisans")
                : navigate("/artisans/Massage")
            }
            className={`w-[94vw] sm:w-auto p1-3 py-1.5 pr-16 border-gray-300 rounded transition-all cursor-pointer ${
              speciality === "Massage" ? "bg-indigo-100 text-black" : ""
            } `}
          >
            Massage
          </p>
          <p
            onClick={() =>
              speciality === "Skincare"
                ? navigate("/artisans")
                : navigate("/artisans/Skincare")
            }
            className={`w-[94vw] sm:w-auto p1-3 py-1.5 pr-16 border-gray-300 rounded transition-all cursor-pointer ${
              speciality === "Skincare" ? "bg-indigo-100 text-black" : ""
            } `}
          >
            Skincare
          </p>
          <p
            onClick={() =>
              speciality === "Fashion"
                ? navigate("/artisans")
                : navigate("/artisans/Fashion")
            }
            className={`w-[94vw] sm:w-auto p1-3 py-1.5 pr-16 border-gray-300 rounded transition-all cursor-pointer ${
              speciality === "Fashion" ? "bg-indigo-100 text-black" : ""
            } `}
          >
            Fashion
          </p>
          <p
            onClick={() =>
              speciality === "Photography"
                ? navigate("/artisans")
                : navigate("/artisans/Photography")
            }
            className={`w-[94vw] sm:w-auto p1-3 py-1.5 pr-16 border-gray-300 rounded transition-all cursor-pointer ${
              speciality === "Photography" ? "bg-indigo-100 text-black" : ""
            } `}
          >
            Photography
          </p>
          <p
            onClick={() =>
              speciality === "Carpentry"
                ? navigate("/artisans")
                : navigate("/artisans/Carpentry")
            }
            className={`w-[94vw] sm:w-auto p1-3 py-1.5 pr-16 border-gray-300 rounded transition-all cursor-pointer ${
              speciality === "Carpentry" ? "bg-indigo-100 text-black" : ""
            } `}
          >
            Carpentry
          </p>
          <p
            onClick={() =>
              speciality === "Art-Design"
                ? navigate("/artisans")
                : navigate("/artisans/Art-Design")
            }
            className={`w-[94vw] sm:w-auto p1-3 py-1.5 pr-16 border-gray-300 rounded transition-all cursor-pointer ${
              speciality === "Art-Design" ? "bg-indigo-100 text-black" : ""
            } `}
          >
            Art & Design
          </p>
          <p
            onClick={() =>
              speciality === "Optometry"
                ? navigate("/artisans")
                : navigate("/artisans/Optometry")
            }
            className={`w-[94vw] sm:w-auto p1-3 py-1.5 pr-16 border-gray-300 rounded transition-all cursor-pointer ${
              speciality === "Optometry" ? "bg-indigo-100 text-black" : ""
            } `}
          >
            Optometry
          </p>
          <p
            onClick={() =>
              speciality === "Culinary"
                ? navigate("/artisans")
                : navigate("/artisans/Culinary")
            }
            className={`w-[94vw] sm:w-auto p1-3 py-1.5 pr-16 border-gray-300 rounded transition-all cursor-pointer ${
              speciality === "Culinary" ? "bg-indigo-100 text-black" : ""
            } `}
          >
            Culinary
          </p>
          <p
            onClick={() =>
              speciality === "Florist"
                ? navigate("/artisans")
                : navigate("/artisans/Florist")
            }
            className={`w-[94vw] sm:w-auto p1-3 py-1.5 pr-16 border-gray-300 rounded transition-all cursor-pointer ${
              speciality === "Florist" ? "bg-indigo-100 text-black" : ""
            } `}
          >
            Florist
          </p>

          {/* Add other specialities in the same manner */}
        </div>
        <div className="w-full grid grid-cols-auto gap-4 gap-y-6">
          {filterDoc?.map((item, index) => (
            <div
              onClick={() => navigate(`/appointment/${item._id}`)}
              className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
              key={index}
            >
              <img className="bg-blue-50" src={item.image} alt="" />
              <div className="p-4">
                <div
                  className={`flex items-center gap-2 text-sm text-center ${
                    item.available ? "text-green-500" : "text-gray-500"
                  }`}
                >
                  <p
                    className={`h-2 w-2 ${
                      item.available ? "bg-green-500" : "bg-gray-500"
                    } rounded-full`}
                  ></p>
                  <p>{item.available ? "Available" : "Not Available"}</p>
                </div>
                <p className="text-gray-900 text-lg font-medium">{item.name}</p>
                <p className="text-gray-600 text-sm">{item.speciality}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Artisans;
