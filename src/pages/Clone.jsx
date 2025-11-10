import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom"; // 🔹 for navigation

export default function Clone() {
  const navigate = useNavigate();
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [buses, setBuses] = useState([]);
  const [selectedBus, setSelectedBus] = useState(null);
  const [booking, setBooking] = useState({ name: "", seats: 1 });
  const [loading, setLoading] = useState(false);

  // ✅ Dummy Bus Data
  useEffect(() => {
    setBuses([
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
    ]);
  }, []);

  // ✅ Confirm Booking → store in JSON Server
  const handleConfirmBooking = async () => {
    if (!booking.name.trim() || booking.seats <= 0) {
      alert("⚠️ Please enter valid passenger info.");
      return;
    }

    const newBooking = {
      busName: selectedBus.name,
      from: selectedBus.from,
      to: selectedBus.to,
      seats: booking.seats,
      passenger: booking.name,
      total: booking.seats * selectedBus.price,
      date: new Date().toLocaleString(),
    };

    try {
      setLoading(true);
      const res = await fetch("https://redbus-clone-1-mjlw.onrender.com/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newBooking),
      });

      if (res.ok) {
        alert("✅ Booking Confirmed!");
        setSelectedBus(null);
        setBooking({ name: "", seats: 1 });
      } else {
        alert("❌ Failed to save booking");
      }
    } catch (err) {
      alert("⚠️ JSON Server not running!");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Logout → clear localStorage & redirect to home
  const handleLogout = () => {
    localStorage.removeItem("user"); // remove login user data
    navigate("/"); // back to home
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-white p-8 relative">
      {/* 🔹 Logout Button */}
      <div className="absolute top-5 right-5">
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>

      <h2 className="text-3xl font-bold text-center mb-6 text-red-600">
        🚌 Available Buses
      </h2>

      {/* Bus List */}
      <div className="max-w-2xl mx-auto space-y-4">
        {buses.map((bus) => (
          <motion.div
            key={bus.id}
            whileHover={{ scale: 1.02 }}
            className="flex justify-between items-center border rounded-2xl p-4 bg-white shadow-md hover:shadow-lg transition-all"
          >
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                {bus.name}
              </h3>
              <p className="text-gray-600">
                {bus.from} → {bus.to}
              </p>
              <p className="text-sm text-gray-400">{bus.time}</p>
            </div>
            <div className="flex flex-col items-end">
              <span className="font-bold text-red-600 text-lg">
                ₹ {bus.price}
              </span>
              <button
                onClick={() => setSelectedBus(bus)}
                className="mt-2 bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-lg shadow transition-all"
              >
                Book
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Booking Modal */}
      <AnimatePresence>
        {selectedBus && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white p-6 rounded-2xl shadow-xl w-96"
            >
              <h3 className="text-lg font-bold text-gray-800 mb-3 border-b pb-2">
                Book: {selectedBus.name}
                <br />
                <span className="text-sm text-gray-500">
                  {selectedBus.from} → {selectedBus.to}
                </span>
              </h3>

              <label className="block mb-2 text-sm font-medium">
                Passenger Name
              </label>
              <input
                type="text"
                value={booking.name}
                onChange={(e) =>
                  setBooking({ ...booking, name: e.target.value })
                }
                className="border p-2 w-full rounded mb-3 focus:ring-2 focus:ring-red-400 outline-none"
                placeholder="Full name"
              />

              <label className="block mb-2 text-sm font-medium">Seats</label>
              <input
                type="number"
                min="1"
                value={booking.seats}
                onChange={(e) =>
                  setBooking({ ...booking, seats: parseInt(e.target.value) })
                }
                className="border p-2 w-full rounded mb-4 focus:ring-2 focus:ring-red-400 outline-none"
              />

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setSelectedBus(null)}
                  className="border px-4 py-2 rounded-lg hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmBooking}
                  disabled={loading}
                  className={`px-4 py-2 rounded-lg text-white font-semibold ${
                    loading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-red-500 hover:bg-red-600"
                  }`}
                >
                  {loading
                    ? "Booking..."
                    : `Confirm (₹${selectedBus.price})`}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
