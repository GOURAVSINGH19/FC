import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const ForgetPassword = () => {
  const [data, setData] = useState({ email: "" });
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: "",
    },
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    const { email } = data;
    const OTP = Math.floor(Math.random() * 9000 + 1000);
    try {
      await axios.post("http://localhost:8000/info/forget-password/", {
        email,
        OTP
      });
      toast.success("Password reset link sent to your email");
    } catch (e) {
      toast.error("Failed to reset password");
      console.error(e);
    }
  };

  return (
    <div className="w-screen h-screen">
      <div className="bg-slate-700">
        <h1>Forget Password</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Link to="/">
              <h1>buy phone Number</h1>
            </Link>
          </div>
          <div className="w-96 flex flex-col mb-5">
            <span className="text-2xl mb-1">Enter your email</span>
            <input
              type="text"
              className="px-3 py-3 bg-[#0000001a] text-white outline-none"
              placeholder="Email"
              value={data.email}
              {...register("email", {
                required: "Email is required",
                type: "text",
                onChange: handleChange,
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && (
              <>
                <p style={{ color: "orangered" }}>{errors.email.message}</p>
              </>
            )}
          </div>
          <button
            className="bg-purple-400 px-3 py-2 text-white w-full  rounded-md flex justify-center"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Reset-Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
