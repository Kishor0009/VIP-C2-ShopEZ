import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { getAuthConfig } from "../utils/authConfig";

const AddProduct = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (!userInfo || userInfo.role !== "admin") {
      toast.error("Access denied. Admin role required.");
      navigate("/login");
    }
  }, [navigate]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    mainImg: "",
    category: "",
    price: "",
    stock: "",
    discount: "",
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
      await axios.post(
        "https://shopez-backend-7mm7.onrender.com/api/products",
        formData,
        getAuthConfig()
      );

      toast.success("Product Added");
    } catch (error) {
      toast.error("Failed");
    }
  };

  return (
    <div className="container mt-4 mb-5" style={{ maxWidth: "700px" }}>
      <div className="card form-card p-5">
        <h2 className="mb-4" style={{ fontWeight: "700" }}>
          Add Product
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Product Title</label>
            <input
              className="form-control"
              name="title"
              placeholder="Enter product title"
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Description</label>
            <textarea
              className="form-control"
              name="description"
              placeholder="Enter product description"
              rows="3"
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Image URL</label>
            <input
              className="form-control"
              name="mainImg"
              placeholder="Enter image URL"
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Category</label>
            <input
              className="form-control"
              name="category"
              placeholder="Enter category"
              onChange={handleChange}
              required
            />
          </div>

          <div className="row">
            <div className="col-4 mb-3">
              <label className="form-label fw-semibold">Price (₹)</label>
              <input
                className="form-control"
                name="price"
                placeholder="0"
                type="number"
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-4 mb-3">
              <label className="form-label fw-semibold">Stock</label>
              <input
                className="form-control"
                name="stock"
                placeholder="0"
                type="number"
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-4 mb-3">
              <label className="form-label fw-semibold">Discount (%)</label>
              <input
                className="form-control"
                name="discount"
                placeholder="0"
                type="number"
                onChange={handleChange}
              />
            </div>
          </div>

          <button className="btn btn-success w-100 py-2 mt-2" style={{ fontWeight: "600" }}>
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;