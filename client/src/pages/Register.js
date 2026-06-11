import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Register = () => {

  const [formData, setFormData] = useState({
    name: "",
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
        "http://localhost:5000/api/auth/register",
        formData
      );

      toast.success("Registration Successful");

      console.log(response.data);

    } catch (error) {

      toast.error(
        error.response?.data?.message || "Error"
      );
    }
  };



  return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>

      <h2 className="mb-4 text-center">
        Register
      </h2>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          className="form-control mb-3"
          onChange={handleChange}
        />

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
          Register
        </button>

      </form>
    </div>
  );
};

export default Register;