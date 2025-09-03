import React, { useState } from "react";
import axios from "axios";
import { useNavigate, NavLink } from "react-router-dom";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FiEye, FiEyeOff, FiLogIn } from "react-icons/fi";
import "./Login.css";

// ✅ Validation schema with Yup
const schema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // ✅ React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  // ✅ Submit Handler
  const onSubmit = async (values) => {
    setLoading(true);
    try {
      const { data } = await axios.post(
        "http://localhost:8080/api/auth/login",
        values
      );

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      toast.success(data.message || "✅ Login successful!");
      navigate("/upload");
    } catch (err) {
      toast.error(err.response?.data?.message || "❌ Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit(onSubmit)} className="login-box">
        <h2>
          <FiLogIn className="login-icon" /> Welcome Back
        </h2>
        <p className="login-subtitle">Please login to continue</p>

        {/* Email Field */}
        <div className="input-group">
          <input
            type="email"
            placeholder="Enter your email"
            {...register("email")}
          />
          {errors.email && (
            <span className="error-text">{errors.email.message}</span>
          )}
        </div>

        {/* Password Field */}
        <div className="input-group password-field">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            {...register("password")}
          />
          <span
            className="toggle-password"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </span>
        </div>
        {errors.password && (
          <span className="error-text">{errors.password.message}</span>
        )}

        {/* Submit Button */}
        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Signup Link */}
        <p className="signup-text">
          Don’t have an account? <NavLink to="/signup">Sign up</NavLink>
        </p>
      </form>
    </div>
  );
};

export default Login;
