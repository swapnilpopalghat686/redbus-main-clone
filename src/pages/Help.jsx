import React, { useState } from "react";

export default function Help() {
  const [showToast, setShowToast] = useState(false);

  const handleClick = () => {
    setShowToast(true);
    // auto hide after 3 seconds
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-center mb-6 text-red-600">❓ RedBus Help Center</h1>
      
      <div className="max-w-3xl bg-white p-6 rounded-xl shadow-lg mb-8">
        <h2 className="text-2xl font-semibold mb-4">How to Book Your Ticket</h2>
        <p className="text-gray-700 mb-4">
          1. Search your route from the homepage.<br />
          2. Select your preferred bus.<br />
          3. Enter passenger details and proceed to payment.<br />
          4. Get your e-ticket instantly via email.
        </p>

        <h2 className="text-2xl font-semibold mb-4">Booking Policies</h2>
        <p className="text-gray-700 mb-4">
          - Cancellation possible up to 24 hours before departure.<br />
          - Refunds processed within 5-7 business days.<br />
          - For first-time bookings, enjoy special offers.
        </p>

        <h2 className="text-2xl font-semibold mb-4">Support</h2>
        <p className="text-gray-700 mb-4">
          For any assistance, contact our support team via chat or email at support@redbus.com.
        </p>
      </div>

      <button
        onClick={handleClick}
        className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-lg transition"
      >
        I hope this information is valuable for you
      </button>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-6 right-6 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg animate-slide-in">
          ✅ Thank you! Your info has been noted.
        </div>
      )}
    </div>
  );
}
