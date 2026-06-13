import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://shopez-backend-7mm7.onrender.com/api/auth/login",
        formData
      );

      localStorage.setItem(
        "userInfo",
        JSON.stringify(response.data)
      );

      toast.success("Login Successful");
      navigate("/");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Login Failed"
      );
    }
  };

  return (
    <div className="container mt-5 mb-5" style={{ maxWidth: "450px" }}>
      <div className="card form-card p-5">
        <div className="text-center mb-4">
          <h2 className="mt-2" style={{ fontWeight: "700" }}>Login</h2>
          <p className="text-muted">Welcome back to ShopEZ</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="form-control"
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label className="form-label fw-semibold">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              className="form-control"
              onChange={handleChange}
              required
            />
          </div>

          <button className="btn btn-primary-custom w-100 py-2" style={{ fontSize: "1rem" }}>
            Login
          </button>
        </form>

        <p className="text-center mt-4 mb-0 text-muted">
          Don't have an account?{" "}
          <Link to="/register" style={{ color: "#4361ee", fontWeight: "500" }}>
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;