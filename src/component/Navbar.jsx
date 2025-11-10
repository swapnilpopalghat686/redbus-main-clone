import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaBus, FaUserCircle, FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Bookings", path: "/bookings" },
    { name: "Offers", path: "/offers" },
    { name: "Help", path: "/help" },
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 w-full">
      <div className="flex justify-between items-center px-6 py-3">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 text-orange-500 font-extrabold text-2xl"
        >
          <FaBus className="text-3xl" />
          <span>RedBus</span>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-8 items-center text-gray-700 font-medium">
          {navItems.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `transition-colors duration-200 ${
                    isActive
                      ? "text-orange-500 border-b-2 border-orange-500 pb-1"
                      : "hover:text-orange-500"
                  }`
                }
              >
                {item.name}
              </NavLink>
            </li>
          ))}
          <FaUserCircle className="text-3xl text-gray-700 cursor-pointer hover:text-orange-500 transition-colors" />
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl text-gray-700"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-md border-t border-gray-200">
          <ul className="flex flex-col text-center py-4 space-y-3 font-medium">
            {navItems.map((item) => (
              <li key={item.name}>
                <NavLink
                  to={item.path}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `block py-2 ${
                      isActive
                        ? "text-orange-500 font-semibold"
                        : "text-gray-700 hover:text-orange-500"
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
            <li>
              <FaUserCircle className="mx-auto text-3xl text-gray-700 hover:text-orange-500 transition-colors" />
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
