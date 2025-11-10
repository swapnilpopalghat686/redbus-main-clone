import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// ✅ Sample bus data
const busesData = [
  { id: 1, name: "Swift Travels", from: "Mumbai", to: "Pune", price: 1450, time: "08:00 AM - 12:00 PM" },
  { id: 2, name: "City Link", from: "Pune", to: "Mumbai", price: 1450, time: "02:00 PM - 06:00 PM" },
  { id: 3, name: "Goa Express", from: "Mumbai", to: "Goa", price: 1800, time: "07:00 AM - 03:00 PM" },
  { id: 4, name: "Sunrise Travels", from: "Pune", to: "Goa", price: 1600, time: "06:00 AM - 02:00 PM" },
  { id: 5, name: "Night Rider", from: "Mumbai", to: "Bangalore", price: 2200, time: "10:00 PM - 08:00 AM" },
  { id: 6, name: "Fast Track", from: "Bangalore", to: "Hyderabad", price: 2000, time: "07:00 AM - 03:00 PM" },
  { id: 7, name: "GreenLine", from: "Hyderabad", to: "Mumbai", price: 2500, time: "08:00 PM - 08:00 AM" },
  { id: 8, name: "Royal Travels", from: "Goa", to: "Bangalore", price: 2100, time: "09:00 AM - 07:00 PM" },
  { id: 9, name: "Express Line", from: "Mumbai", to: "Hyderabad", price: 2400, time: "06:00 AM - 06:00 PM" },
  { id: 10, name: "City Shuttle", from: "Pune", to: "Bangalore", price: 2300, time: "07:00 PM - 07:00 AM" },
];

// 🕐 Helper function to convert "HH:MM AM/PM" into today's Date object
const parseTimeToDate = (timeStr) => {
  const now = new Date();
  const [time, period] = timeStr.split(" ");
  let [hours, minutes] = time.split(":").map(Number);
  if (period === "PM" && hours !== 12) hours += 12;
  if (period === "AM" && hours === 12) hours = 0;
  return new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes);
};

export default function Bookings() {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const navigate = useNavigate();

  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => setCurrentDateTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // ✅ Check if bus departure time has passed
  const getAvailability = (bus) => {
    const [departure] = bus.time.split(" - ");
    const departureTime = parseTimeToDate(departure);
    const now = currentDateTime;

    if (now > departureTime) {
      return { status: "Unavailable", color: "red" };
    } else {
      return { status: "Available", color: "green" };
    }
  };

  const handleBookNow = (bus) => {
    navigate("/auth", { state: { bus } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 pt-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-10 text-gray-800">
        🚌 Available Buses
      </h1>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {busesData.map((bus) => {
          const availability = getAvailability(bus);
          const [departure, arrival] = bus.time.split(" - ");

          return (
            <div
              key={bus.id}
              className={`bg-white rounded-2xl shadow-lg p-6 border-l-4 transition-all hover:shadow-xl ${
                availability.color === "green"
                  ? "border-green-500"
                  : "border-red-500"
              }`}
            >
              <h2 className="font-bold text-xl mb-2 text-gray-800">
                {bus.name}
              </h2>
              <p className="text-gray-600 mb-1">
                {bus.from} → {bus.to}
              </p>
              <p className="text-gray-500 mb-1">
                Date: {new Date().toLocaleDateString()}
              </p>
              <p className="text-gray-500 mb-3">
                Departure: {departure} | Arrival: {arrival}
              </p>
              <p className="text-orange-500 font-bold text-lg mb-3">
                ₹{bus.price}
              </p>
              <div className="flex justify-between items-center">
                <span
                  className={`font-semibold ${
                    availability.color === "green"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {availability.status}
                </span>
                <button
                  disabled={availability.status === "Unavailable"}
                  onClick={() => handleBookNow(bus)}
                  className={`px-4 py-2 rounded-lg font-semibold transition ${
                    availability.status === "Unavailable"
                      ? "bg-gray-400 cursor-not-allowed text-white"
                      : "bg-orange-500 text-white hover:bg-orange-600"
                  }`}
                >
                  Book Now
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Current Time */}
      <div className="text-center mt-10 text-gray-600 text-sm">
        Current Time:{" "}
        <span className="font-semibold text-gray-800">
          {currentDateTime.toLocaleTimeString()}
        </span>
      </div>
    </div>
  );
}
