import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate(); // Initialize the useNavigate hook

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("https://job-posting-board-hnck.onrender.com/api/auth/login", data, { withCredentials: true });
      alert("Login successful!");
      navigate("/dashboard"); // Navigate to the dashboard route after login
    } catch (error) {
      console.error(error);
      alert("Login failed.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className="text-xl mb-4">Login</h1>
        <input
          {...register("email")}
          placeholder="Email"
          className="border p-2 w-full mb-2"
        />
        <input
          {...register("password")}
          type="password"
          placeholder="Password"
          className="border p-2 w-full mb-2"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 w-full">
          Login
        </button>
      {/* Register Link */}
      <p className="mt-4 text-center">
        Don't have an account?{" "}
        <span
          onClick={() => navigate("/register")}
          className="text-blue-700 cursor-pointer hover:underline"
        >
          Click here
        </span>
      </p>
      </form>

    </div>
  );
}

export default Login;
