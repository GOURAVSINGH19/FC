import React, { useState } from "react";
import Login from "../Components/LoginPage/Login";
import Signin from "../Components/SigninPage/Signin";
import { Navigate, Route, Routes } from "react-router-dom";
import Api from "../Api/Api";
import Dashboard from "../Components/Dashboard/Dashboard";
import Home from "../Components/Home/Home";
import { ToastContainer } from "react-toastify";
import Notfound from "../Components/Notfound";

const Links = () => {
  // const [isAuthenticated, setIsAuthenticated] = useState(false);

  // const PrivateRoute = ({ element }) => {
  //   return isAuthenticated ? element : <Navigate to="/login" />;
  // };

  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition:Bounce
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signin />} />
        <Route path="*" element={<Notfound/>}/>
      </Routes>
    </>
  );
};

export default Links;
