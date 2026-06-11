import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AddProduct = () => {

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
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (
    e
  ) => {
    e.preventDefault();

    try {

      await axios.post(
        "http://localhost:5000/api/products",
        formData
      );

      toast.success(
        "Product Added"
      );

    } catch (error) {

      toast.error(
        "Failed"
      );
    }
  };

  return (
    <div
      className="container mt-4"
      style={{
        maxWidth: "700px"
      }}
    >

      <h2>
        Add Product
      </h2>

      <form
        onSubmit={
          handleSubmit
        }
      >

        <input
          className=
          "form-control mb-2"
          name="title"
          placeholder="Title"
          onChange={
            handleChange
          }
        />

        <textarea
          className=
          "form-control mb-2"
          name="description"
          placeholder="Description"
          onChange={
            handleChange
          }
        />

        <input
          className=
          "form-control mb-2"
          name="mainImg"
          placeholder="Image URL"
          onChange={
            handleChange
          }
        />

        <input
          className=
          "form-control mb-2"
          name="category"
          placeholder="Category"
          onChange={
            handleChange
          }
        />

        <input
          className=
          "form-control mb-2"
          name="price"
          placeholder="Price"
          onChange={
            handleChange
          }
        />

        <input
          className=
          "form-control mb-2"
          name="stock"
          placeholder="Stock"
          onChange={
            handleChange
          }
        />

        <input
          className=
          "form-control mb-2"
          name="discount"
          placeholder="Discount"
          onChange={
            handleChange
          }
        />

        <button
          className=
          "btn btn-success"
        >
          Add Product
        </button>

      </form>

    </div>
  );
};

export default AddProduct;