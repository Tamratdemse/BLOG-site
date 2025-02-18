import { useState } from "react";
import axios from "axios";
import { FaUser, FaEnvelope } from "react-icons/fa"; // Icons for inputs
import { BASE_URL } from "../config/config";

const Subscribe = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${BASE_URL}/add_subscriotion`, {
        name,
        email,
      });
      alert("Subscribed successfully!");
      setName("");
      setEmail("");
    } catch (error) {
      console.error("Error subscribing:", error);
    }
  };

  return (
    <div className="bg-transparent">
      <form onSubmit={handleSubmit} className="space-y-3">
        {/* Name Input */}
        <div className="relative">
          <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Your name"
            className="w-full bg-[#112240] text-white p-3 pl-10 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        {/* Email Input */}
        <div className="relative">
          <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="email"
            placeholder="Email address"
            className="w-full bg-[#112240] text-white p-3 pl-10 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        {/* Subscribe Button */}
        <button
          type="submit"
          className="w-full bg-teal-500 hover:bg-teal-600 text-white p-3 rounded-md font-bold transition duration-200"
        >
          Subscribe →
        </button>
      </form>
    </div>
  );
};

export default Subscribe;
