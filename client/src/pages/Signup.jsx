import React, { useState } from "react";
import axios from "axios";
import { useNavigate, NavLink } from "react-router-dom";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "./Signup.css";
import { FiEye, FiEyeOff } from "react-icons/fi";

// ✅ Validation schema
const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  mobile: yup
    .string()
    .matches(/^[0-9]{10}$/, "Mobile number must be 10 digits")
    .required("Mobile number is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  role: yup
    .string()
    .oneOf(["user", "admin"], "Please select a valid role")
    .required("Role is required"),
});

const Signup = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // ✅ Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  // ✅ Submit Handler
  const onSubmit = async (formData) => {
    setLoading(true);
    try {
      const { data } = await axios.post(
        "http://localhost:8080/api/auth/signup",
        formData
      );
      // localStorage.setItem("token", data.token);
      // localStorage.setItem("user", JSON.stringify(data.user));
      toast.success(data.message || "✅ Signup successful!");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "❌ Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <form onSubmit={handleSubmit(onSubmit)} className="signup-box">
        <h2>Create Account</h2>

        {/* Name */}
        <input
          type="text"
          placeholder="Enter your name"
          {...register("name")}
        />
        {errors.name && (
          <span className="error-text">{errors.name.message}</span>
        )}

        {/* Email */}
        <input
          type="email"
          placeholder="Enter your email"
          {...register("email")}
        />
        {errors.email && (
          <span className="error-text">{errors.email.message}</span>
        )}

        {/* Mobile */}
        <input
          type="text"
          placeholder="Enter mobile number"
          {...register("mobile")}
        />
        {errors.mobile && (
          <span className="error-text">{errors.mobile.message}</span>
        )}

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

        {/* Role Dropdown */}
        <select {...register("role")}>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        {errors.role && (
          <span className="error-text">{errors.role.message}</span>
        )}

        {/* Submit */}
        <button type="submit" disabled={loading}>
          {loading ? "Signing up..." : "Signup"}
        </button>

        <p className="login-text">
          Already have an account? <NavLink to="/login">Login</NavLink>
        </p>
      </form>
    </div>
  );
};

export default Signup;
