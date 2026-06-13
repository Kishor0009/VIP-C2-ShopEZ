import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <div className="product-card card h-100" style={{ position: "relative" }}>
      <Link to={`/product/${product._id}`} className="d-flex flex-column h-100" style={{ textDecoration: "none", color: "inherit" }}>
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

        <div className="card-body d-flex flex-column flex-grow-1">
          <h6 className="card-title" style={{ fontWeight: "600", minHeight: "3rem" }}>
            {product.title}
          </h6>

          <span className="badge bg-light text-secondary mb-2" style={{ width: "fit-content", fontSize: "0.75rem" }}>
            {product.category}
          </span>

          <div className="d-flex align-items-baseline gap-2 mb-3">
            {product.discount > 0 ? (
              <>
                <span className="text-muted text-decoration-line-through" style={{ fontSize: "0.9rem" }}>
                  ₹{product.price.toLocaleString("en-IN")}
                </span>
                <h5 className="m-0" style={{ color: "#4361ee", fontWeight: "700" }}>
                  ₹{Math.round(product.price - (product.price * product.discount) / 100).toLocaleString("en-IN")}
                </h5>
              </>
            ) : (
              <h5 className="m-0" style={{ color: "#4361ee", fontWeight: "700" }}>
                ₹{product.price.toLocaleString("en-IN")}
              </h5>
            )}
          </div>

          <span className="btn btn-primary-custom btn-sm text-center mt-auto">
            View Product
          </span>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;