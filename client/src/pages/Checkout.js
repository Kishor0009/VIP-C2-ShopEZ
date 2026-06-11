import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Checkout = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    address: "",
    pincode: "",
    paymentMethod: "COD",
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

      const userInfo = JSON.parse(
        localStorage.getItem("userInfo")
      );

      await axios.post(
        "http://localhost:5000/api/orders",
        {
          userId: userInfo._id,
          ...formData,
        }
      );

      toast.success("Order Placed Successfully");

      navigate("/");

    } catch (error) {

      toast.error("Failed to place order");
    }
  };

  return (
    <div
      className="container mt-5"
      style={{ maxWidth: "600px" }}
    >
      <h2 className="mb-4">
        Checkout
      </h2>

      <form onSubmit={handleSubmit}>

        <input
          className="form-control mb-3"
          placeholder="Name"
          name="name"
          onChange={handleChange}
        />

        <input
          className="form-control mb-3"
          placeholder="Mobile"
          name="mobile"
          onChange={handleChange}
        />

        <input
          className="form-control mb-3"
          placeholder="Email"
          name="email"
          onChange={handleChange}
        />

        <textarea
          className="form-control mb-3"
          placeholder="Address"
          name="address"
          onChange={handleChange}
        />

        <input
          className="form-control mb-3"
          placeholder="Pincode"
          name="pincode"
          onChange={handleChange}
        />

        <select
          className="form-control mb-3"
          name="paymentMethod"
          onChange={handleChange}
        >
          <option value="COD">
            Cash On Delivery
          </option>

          <option value="UPI">
            UPI
          </option>
        </select>

        <button className="btn btn-success w-100">
          Place Order
        </button>

      </form>
    </div>
  );
};

export default Checkout;