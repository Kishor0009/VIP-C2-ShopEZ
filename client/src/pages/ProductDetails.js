import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { addToCart } from "../services/cartService";
import { getAuthConfig } from "../utils/authConfig";

const ProductDetails = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/products/${id}`,
          getAuthConfig()
        );

        setProduct(response.data);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load product");
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    try {
      const userInfo = JSON.parse(
        localStorage.getItem("userInfo")
      );

      if (!userInfo) {
        toast.error("Please login first");
        return;
      }

      await addToCart({
        userId: userInfo._id,
        productId: product._id,
        title: product.title,
        description: product.description,
        mainImg: product.mainImg,
        quantity: 1,
        size: "",
        price: product.price,
        discount: product.discount,
      });

      toast.success("Added to cart");
    } catch (error) {
      console.error(error);
      toast.error("Failed to add item");
    }
  };

  if (!product) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border" style={{ color: "#4361ee" }} role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3 text-muted">Loading product...</p>
      </div>
    );
  }

  return (
    <div className="container mt-5 mb-5">
      <div className="row g-4">
        <div className="col-md-6">
          <div className="card form-card overflow-hidden">
            <img
              src={product.mainImg}
              alt={product.title}
              className="img-fluid"
              style={{ width: "100%", maxHeight: "450px", objectFit: "cover" }}
            />
          </div>
        </div>

        <div className="col-md-6">
          <h2 style={{ fontWeight: "700" }}>{product.title}</h2>

          <span className="badge bg-light text-secondary mb-3" style={{ fontSize: "0.85rem" }}>
            {product.category}
          </span>

          <div className="price-tag mb-3">
            ₹{product.price}
            {product.discount > 0 && (
              <span className="badge bg-danger ms-2" style={{ fontSize: "0.8rem" }}>
                {product.discount}% OFF
              </span>
            )}
          </div>

          <p className="text-muted" style={{ lineHeight: "1.7" }}>{product.description}</p>

          <hr />

          <div className="row g-2 mb-4" style={{ fontSize: "0.95rem" }}>
            <div className="col-sm-6">
              <div>
                <span className="text-muted me-2">Product ID:</span>
                <span className="fw-semibold text-dark">{product._id}</span>
              </div>
            </div>
            <div className="col-sm-6">
              <div>
                <span className="text-muted me-2">Category:</span>
                <span className="badge bg-light text-secondary">{product.category}</span>
              </div>
            </div>
            <div className="col-sm-6 mt-2">
              <div>
                <span className="text-muted me-2">Stock Status:</span>
                {product.stock > 0 ? (
                  <span className="stock-in fw-semibold">
                    <i className="bi bi-check-circle me-1"></i>
                    In Stock ({product.stock})
                  </span>
                ) : (
                  <span className="stock-out fw-semibold">
                    <i className="bi bi-x-circle me-1"></i>
                    Out of Stock
                  </span>
                )}
              </div>
            </div>
            <div className="col-sm-6 mt-2">
              <div>
                <span className="text-muted me-2">Discount:</span>
                <span className="fw-semibold text-danger">
                  {product.discount > 0 ? `${product.discount}% OFF` : "No Discount"}
                </span>
              </div>
            </div>
          </div>

          <button
            className="btn btn-primary-custom btn-lg mt-2"
            onClick={handleAddToCart}
            disabled={product.stock === 0}
          >
            <i className="bi bi-cart-plus me-2"></i>
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;