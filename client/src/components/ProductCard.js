import React from "react";

const ProductCard = ({ product }) => {
  return (
    <div className="card h-100 shadow-sm">

      <img
        src={product.image}
        className="card-img-top"
        alt={product.title}
        style={{ height: "220px", objectFit: "cover" }}
      />

      <div className="card-body">

        <h5>{product.title}</h5>

        <p className="text-muted">
          {product.category}
        </p>

        <h4>₹{product.price}</h4>

      </div>

    </div>
  );
};

export default ProductCard;