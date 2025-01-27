import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

const schema = yup.object().shape({
  name: yup.string().required("Company name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required(),
  // phone: yup.string().required("Phone number is required"),
});

function Register() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate(); // Initialize useNavigate hook

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("http://localhost:5000/api/auth/register", data);
      console.log(response);
      alert("Registration successful! Please verify your email.");
      navigate("/dashboard"); // Redirect to login page after successful registration
    } catch (error) {
      console.error(error);
      alert("Error registering user.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className="text-xl mb-4">Company Registration</h1>
        <input {...register("name")} placeholder="Company Name" className="border p-2 w-full mb-2" />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        
        <input {...register("email")} placeholder="Email" className="border p-2 w-full mb-2" />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
        
        <input {...register("password")} type="password" placeholder="Password" className="border p-2 w-full mb-2" />
        {errors.password && <p className="text-red-500">{errors.password.message}</p>}
        
        {/* <input {...register("phone")} placeholder="Phone" className="border p-2 w-full mb-2" />
        {errors.phone && <p className="text-red-500">{errors.phone.message}</p>} */}
        
        <button type="submit" className="bg-blue-500 text-white p-2 w-full">Register</button>
      {/* Login Link */}
      <p className="mt-4 text-center">
        Already have an account?{" "}
        <span
          onClick={() => navigate("/login")}
          className="text-blue-500 cursor-pointer hover:underline"
        >
          Login here
        </span>
      </p>
      </form>

    </div>
  );
}

export default Register;
