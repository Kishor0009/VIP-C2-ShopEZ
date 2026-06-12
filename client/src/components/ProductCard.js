import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <div className="product-card card h-100" style={{ position: "relative" }}>
      <Link to={`/product/${product._id}`} style={{ textDecoration: "none", color: "inherit" }}>
        {product.discount > 0 && (
          <span className="discount-badge">
            {product.discount}% OFF
          </span>
        )}

        <img
          src={product.mainImg}
          className="card-img-top"
          alt={product.title}
        />  

        <div className="card-body d-flex flex-column">
          <h6 className="card-title" style={{ fontWeight: "600" }}>
            {product.title}
          </h6>

          <span className="badge bg-light text-secondary mb-2" style={{ width: "fit-content", fontSize: "0.75rem" }}>
            {product.category}
          </span>

          <h5 className="mt-auto mb-3" style={{ color: "#4361ee", fontWeight: "700" }}>
            ₹{product.price}
          </h5>

          <span className="btn btn-primary-custom btn-sm text-center">
            View Product
          </span>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;