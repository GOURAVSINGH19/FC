import React from "react";
import Links from "./Routers/Links";
import axios from "axios";
// import { UserContextProvider } from "./context/ContextApi";
axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.withCredentials = true;
axios.defaults.headers = {
  "Content-Type": "application/json",
};

const App = () => {
  return (
    // <UserContextProvider>
      <div className="w-screen  min-h-screen bg-zinc-900">
        <Links />
      </div>
    // </UserContextProvider>
  );
};

export default App;
