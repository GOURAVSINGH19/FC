import React, { useContext, useEffect, useState } from "react";
import Login from "../Components/LoginPage/Login";
import Signin from "../Components/SigninPage/Signin";
import { Route, Routes, useNavigate } from "react-router-dom";
import Dashboard from "../Components/Dashboard/Dashboard";
import Home from "../Components/Home/Home";
import { ToastContainer } from "react-toastify";
import Notfound from "../Components/Notfound";
import ForgetPassword from "../Components/Forgetpassword/ForgetPassword";
import ChangePassword from "../Components/Forgetpassword/ChangePassword";
import { GoogleOAuthProvider } from "@react-oauth/google";
const Links = () => {
  const userToken = localStorage.getItem("token");

  const GoogleLogin = () => {
    const id = "1041971490330-als8m1itahm6192bn019ssmpmcp1lujk.apps.googleusercontent.com";
    return (
      <GoogleOAuthProvider clientId={id}>
        <Login />
      </GoogleOAuthProvider>
    );
  };
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
        <Route path="/" element={<Home />} />​
        {userToken && <Route path="/dashboard" element={<Dashboard />} />}
        <Route path="/login" element={<GoogleLogin />} />
        <Route path="/signup" element={<Signin />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/reset_password/:token" element={<ChangePassword />} />
        <Route path="*" element={<Notfound />} />
      </Routes>
    </>
  );
};

export default Links;
