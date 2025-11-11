import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom"; // ✅ import navigate

export default function AuthPage({ onLoginSuccess }) {
  const [activeTab, setActiveTab] = useState("login");
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({ email: "", password: "" });
  const navigate = useNavigate(); // ✅ initialize navigate

  useEffect(() => {
    fetch("https://redbus-clone-1-mjlw.onrender.com/users")
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(err => console.log(err));
  }, []);

  const handleSignup = () => {
    fetch("https://redbus-clone-1-mjlw.onrender.com/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) toast.error(data.error);
        else {
          toast.success("Signup successful!");
          setUsers(prev => [...prev, { email: user.email, password: user.password }]);
          setUser({ email: "", password: "" });
          setActiveTab("login");
        }
      })
      .catch(err => toast.error("Server error"));
  };

  const handleLogin = () => {
    const exists = users.find(u => u.email === user.email && u.password === user.password);
    if (exists) {
      toast.success("Login successful!");
      setUser({ email: "", password: "" });

      // ✅ Navigate to RedBus Clone page after login
      setTimeout(() => {
        navigate("/clone");
      }, 1200);

      if (onLoginSuccess) onLoginSuccess(user);
    } else {
      toast.error("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 p-4">
      <Toaster position="top-right" />
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <div className="flex mb-4">
          <button
            className={`flex-1 py-2 ${activeTab === "login" ? "border-b-2 border-blue-500 font-bold" : ""}`}
            onClick={() => setActiveTab("login")}
          >
            Login
          </button>
          <button
            className={`flex-1 py-2 ${activeTab === "signup" ? "border-b-2 border-blue-500 font-bold" : ""}`}
            onClick={() => setActiveTab("signup")}
          >
            Signup
          </button>
        </div>

        <div className="flex flex-col gap-3">
          <input
            type="email"
            placeholder="Email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            className="border p-2 rounded"
          />
          <input
            type="password"
            placeholder="Password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            className="border p-2 rounded"
          />
          {activeTab === "login" ? (
            <button
              onClick={handleLogin}
              className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
            >
              Login
            </button>
          ) : (
            <button
              onClick={handleSignup}
              className="bg-green-500 text-white py-2 rounded hover:bg-green-600 transition"
            >
              Signup
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
