import { useState } from "react";
import { CalendarDays, Bus, Search, User } from "lucide-react";

export default function Home() {
  const [womenBooking, setWomenBooking] = useState(false);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [buses, setBuses] = useState([]);
  const [searched, setSearched] = useState(false);

  // Mock Bus Data with real-time info
  const busData = [
    {
      id: 1,
      name: "Red Express",
      from: "Pune",
      to: "Mumbai",
      time: "06:00",
      price: 600,
      availableDays: ["Mon", "Wed", "Fri", "Sun"],
    },
    {
      id: 2,
      name: "BlueLine Travels",
      from: "Pune",
      to: "Goa",
      time: "21:00",
      price: 900,
      availableDays: ["Tue", "Thu", "Sat"],
    },
    {
      id: 3,
      name: "Orange Deluxe",
      from: "Delhi",
      to: "Jaipur",
      time: "07:30",
      price: 750,
      availableDays: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    },
    {
      id: 4,
      name: "Royal Bus Service",
      from: "Goa",
      to: "Pune",
      time: "17:00",
      price: 800,
      availableDays: ["Fri", "Sat", "Sun"],
    },
  ];

  // Get day name from date
  const getDayName = (dateString) => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return days[new Date(dateString).getDay()];
  };

  // Search function
  const handleSearch = () => {
    if (!from || !to || !date) {
      alert("Please fill From, To and Date fields");
      return;
    }

    const day = getDayName(date);
    const results = busData
      .filter(
        (bus) =>
          bus.from.toLowerCase() === from.toLowerCase().trim() &&
          bus.to.toLowerCase() === to.toLowerCase().trim()
      )
      .map((bus) => ({
        ...bus,
        isAvailable: bus.availableDays.includes(day),
      }));

    setBuses(results);
    setSearched(true);
  };

  // Format time helper
  const formatTime = (time) => {
    const [hour, minute] = time.split(":");
    const h = parseInt(hour);
    const ampm = h >= 12 ? "PM" : "AM";
    const formattedHour = h % 12 || 12;
    return `${formattedHour}:${minute} ${ampm}`;
  };

  return (
    <div
      className="relative min-h-screen flex flex-col items-center py-12 px-4 text-white bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://png.pngtree.com/thumb_back/fh260/background/20230712/pngtree-3d-render-of-a-realistic-double-decker-bus-image_3831777.jpg')",
      }}
    >
      {/* Overlay for better text visibility */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Main Content */}
      <div className="relative z-10 w-full flex flex-col items-center">
        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold mb-2 text-center">
          India’s No. 1 online
        </h1>
        <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center">
          bus ticket booking site
        </h2>

        {/* Search Box */}
        <div className="bg-white rounded-2xl shadow-xl flex flex-col md:flex-row items-center p-4 gap-4 w-full max-w-4xl">
          {/* From */}
          <div className="flex items-center gap-2 flex-1 px-3">
            <Bus className="text-gray-500" />
            <input
              type="text"
              placeholder="From"
              className="w-full border-none outline-none text-gray-700"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
            />
          </div>

          <div className="hidden md:block w-px bg-gray-300 h-10"></div>

          {/* To */}
          <div className="flex items-center gap-2 flex-1 px-3">
            <Bus className="text-gray-500" />
            <input
              type="text"
              placeholder="To"
              className="w-full border-none outline-none text-gray-700"
              value={to}
              onChange={(e) => setTo(e.target.value)}
            />
          </div>

          <div className="hidden md:block w-px bg-gray-300 h-10"></div>

          {/* Date */}
          <div className="flex items-center gap-2 flex-1 px-3">
            <CalendarDays className="text-gray-500" />
            <input
              type="date"
              className="w-full border-none outline-none text-gray-700"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <div className="hidden md:block w-px bg-gray-300 h-10"></div>

          {/* Women Toggle */}
          <div className="flex items-center justify-between flex-1 px-3">
            <div className="flex items-center gap-2 text-gray-700">
              <User className="text-pink-500" />
              <span>Booking for women</span>
            </div>
            <button
              onClick={() => setWomenBooking(!womenBooking)}
              className={`w-10 h-6 rounded-full transition-all duration-300 ${
                womenBooking ? "bg-pink-500" : "bg-gray-300"
              } relative`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${
                  womenBooking ? "translate-x-4" : "translate-x-0"
                }`}
              ></span>
            </button>
          </div>
        </div>

        {/* Search Button */}
        <button
          onClick={handleSearch}
          className="mt-6 bg-[#d32f2f] hover:bg-[#b71c1c] transition-all duration-300 text-white font-semibold px-10 py-3 rounded-full flex items-center gap-2 shadow-lg"
        >
          <Search /> Search buses
        </button>

        {/* Results */}
        <div className="mt-10 w-full max-w-3xl">
          {searched && (
            <>
              {buses.length > 0 ? (
                buses.map((bus) => (
                  <div
                    key={bus.id}
                    className="bg-white text-gray-800 rounded-xl shadow-md p-5 mb-4 flex justify-between items-center"
                  >
                    <div>
                      <h3 className="text-lg font-semibold">{bus.name}</h3>
                      <p className="text-sm text-gray-500">
                        {bus.from} ➜ {bus.to} • {formatTime(bus.time)}
                      </p>
                    </div>

                    <div className="text-right">
                      {bus.isAvailable ? (
                        <span className="block bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium mb-1">
                          Available
                        </span>
                      ) : (
                        <span className="block bg-red-100 text-red-700 px-3 py-1 rounded-full font-medium mb-1">
                          Unavailable
                        </span>
                      )}

                      {/* Price + Discount */}
                      {bus.isAvailable && (
                        <p className="text-sm font-semibold">
                          ₹
                          {womenBooking
                            ? (bus.price * 0.7).toFixed(0)
                            : bus.price}{" "}
                          {womenBooking && (
                            <span className="text-pink-600 text-xs font-bold ml-1">
                              (30% OFF)
                            </span>
                          )}
                        </p>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-white text-lg font-medium">
                  ❌ No buses found for this route.
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
