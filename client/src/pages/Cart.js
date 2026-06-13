import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  getCartItems,
  removeCartItem,
} from "../services/cartService";

import { toast } from "react-toastify";

const Cart = () => {
  const [items, setItems] = useState([]);

  const fetchCart = async () => {
    const data = await getCartItems();
    setItems(data);
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const deleteItem = async (id) => {
    await removeCartItem(id);
    toast.success("Removed");
    fetchCart();
  };

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="container mt-4 mb-5">
      <h2 className="section-title">
        My Cart
      </h2>

      {items.length === 0 ? (
        <div className="empty-state">
          <p className="mt-3">Your cart is empty.</p>
          <Link to="/" className="btn btn-primary-custom mt-2">
            <i className="bi bi-arrow-left me-2"></i>
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="row g-4">
          <div className="col-8">
            {items.map((item) => {
              const subtotal = item.price * item.quantity;
              return (
                <div key={item._id} className="card form-card p-3 mb-3">
                  <div className="row align-items-center">
                    <div className="col-2">
                      <img
                        src={item.mainImg}
                        alt={item.title}
                        className="img-fluid rounded"
                        style={{ objectFit: "cover", height: "80px", width: "100%" }}
                      />
                    </div>

                    <div className="col-4">
                      <h6 className="mb-1" style={{ fontWeight: "600" }}>{item.title}</h6>
                      <span className="text-muted" style={{ fontSize: "0.9rem" }}>
                        ₹{item.price}
                      </span>
                    </div>

                    <div className="col-2">
                      <span className="badge bg-light text-dark px-3 py-2">
                        Qty: {item.quantity}
                      </span>
                    </div>

                    <div className="col-2 text-center">
                      <span style={{ fontWeight: "600", color: "#4361ee" }}>
                        ₹{subtotal}
                      </span>
                    </div>

                    <div className="col-2 text-end">
                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => deleteItem(item._id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="col-4">
            <div className="card form-card p-4">
              <h5 style={{ fontWeight: "600" }}>
                Cart Summary
              </h5>
              <hr />
              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted">Total Items</span>
                <span className="fw-semibold">{items.length}</span>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <span className="text-muted">Total</span>
                <span className="fw-bold" style={{ color: "#4361ee", fontSize: "1.2rem" }}>
                  ₹{total}
                </span>
              </div>
              <hr />
              <Link to="/checkout" className="btn btn-success w-100">
                Proceed To Checkout
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;