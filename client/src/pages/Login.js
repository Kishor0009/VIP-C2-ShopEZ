import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

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
        "http://localhost:5000/api/auth/login",
        formData
      );

      // Save token
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
    <div className="container mt-5" style={{ maxWidth: "500px" }}>

      <h2 className="mb-4 text-center">
        Login
      </h2>

      <form onSubmit={handleSubmit}>

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          className="form-control mb-3"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          className="form-control mb-3"
          onChange={handleChange}
        />

        <button className="btn btn-dark w-100">
          Login
        </button>

      </form>
    </div>
  );
};

export default Login;