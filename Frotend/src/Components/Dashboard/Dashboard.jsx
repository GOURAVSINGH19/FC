import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Dashboard = () => {
  const navigate = useNavigate();
  const user = localStorage.getItem("token");
  const handleclick = async () => {
    try {
      await axios.post("/users/logout");
      localStorage.removeItem("token");
      navigate("/");
    } catch (err) {
      console.log(err);
      toast.error("Failed to Logout");
    }
  };
  return (
    <div>
      <button
        onClick={handleclick}
        className="bg-purple-300 px-3 py-2 rounded-md"
      >
        {user ? "logout" : "login"}
      </button>
      <h1>hi</h1>
    </div>
  );
};

export default Dashboard;
