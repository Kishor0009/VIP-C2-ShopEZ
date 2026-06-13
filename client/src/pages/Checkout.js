import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { getAuthConfig } from "../utils/authConfig";

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

      if (!userInfo) {
        toast.error("Please login first to place an order");
        return;
      }

      await axios.post(
        "https://shopez-backend-7mm7.onrender.com/api/orders",
        {
          userId: userInfo._id,
          ...formData,
        },
        getAuthConfig()
      );

      toast.success("Order Placed Successfully");
      navigate("/");
    } catch (error) {
      toast.error("Failed to place order");
    }
  };

  return (
    <div className="container mt-5 mb-5" style={{ maxWidth: "650px" }}>
      <div className="card form-card p-4 p-md-5">
        <h2 className="mb-4" style={{ fontWeight: "700" }}>
          Checkout
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Full Name</label>
            <input
              className="form-control"
              placeholder="Enter your full name"
              name="name"
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Mobile Number</label>
            <input
              className="form-control"
              placeholder="Enter your mobile number"
              name="mobile"
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Email Address</label>
            <input
              className="form-control"
              placeholder="Enter your email"
              name="email"
              type="email"
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Delivery Address</label>
            <textarea
              className="form-control"
              placeholder="Enter your full address"
              name="address"
              rows="3"
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label className="form-label fw-semibold">Pincode</label>
            <input
              className="form-control"
              placeholder="Enter pincode"
              name="pincode"
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label className="form-label fw-semibold">Payment Method</label>
            <div className="d-flex gap-3 mt-2">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="paymentMethod"
                  id="cod"
                  value="COD"
                  defaultChecked
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="cod">
                  Cash On Delivery
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="paymentMethod"
                  id="upi"
                  value="UPI"
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="upi">
                  UPI
                </label>
              </div>
            </div>
          </div>

          <button className="btn btn-success w-100 py-2" style={{ fontWeight: "600" }}>
            Place Order
          </button>
        </form>
      </div>
    </div>
  );
};

export default Checkout;