import React from "react";
import Links from "./Routers/Links";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.withCredentials = true;
axios.defaults.headers={
  "Content-Type": "application/json",
  "Authorization": `Bearer ${localStorage.getItem("token")}`,
}

const App = () => {
  return (
    <div className="w-screen h-screen bg-zinc-700">
      <Links />
    </div>
  );
};

export default App;
