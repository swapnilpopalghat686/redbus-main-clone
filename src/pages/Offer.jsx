import React from "react";

const busOffers = [
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

export default function Offer() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-center mb-8 text-yellow-600">🎉 Diwali Special Offers 🎉</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {busOffers.map((bus) => (
          <div key={bus.id} className="bg-white p-6 rounded-xl shadow-lg relative">
            {/* Offer Badge */}
            <div className="absolute top-4 right-4 bg-red-500 text-white font-bold px-3 py-1 rounded-full text-sm">
              50% OFF
            </div>

            <h2 className="text-2xl font-semibold mb-2">{bus.name}</h2>
            <p className="text-gray-700 mb-1">
              <span className="font-semibold">From:</span> {bus.from}
            </p>
            <p className="text-gray-700 mb-1">
              <span className="font-semibold">To:</span> {bus.to}
            </p>
            <p className="text-gray-700 mb-1">
              <span className="font-semibold">Time:</span> {bus.time}
            </p>
            <p className="text-gray-900 font-bold text-lg mt-2">
              Price: <span className="line-through text-gray-400">{bus.price}₹</span>{" "}
              <span className="text-green-600">{bus.price / 2}₹</span>
            </p>
            <button className="mt-4 w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-lg font-semibold transition">
              Book Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
