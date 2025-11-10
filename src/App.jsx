import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./component/Navbar";
import Home from "./pages/Home";
import Bookings from "./pages/Bookings";
import AuthPage from "./pages/AuthPage";
import Clone from "./pages/Clone";
import Offer from "./pages/Offer";
import Help from "./pages/Help";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/clone" element={<Clone />} />
        <Route path="/offers" element={<Offer />} />
        <Route path="/help" element={<Help />} />
      </Routes>
    </Router>
  );
}

export default App;
