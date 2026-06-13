import React from "react";
import { Link } from "react-router-dom";

const FooterComponent = () => {
  return (
    <footer className="page-footer text-white py-4 mt-5" style={{ backgroundColor: "#2b2d42" }}>
      <div className="container">
        <div className="row g-4">
          {/* Brand & Tagline */}
          <div className="col-md-4 text-center text-md-start">
            <h5 style={{ fontWeight: "700", color: "#ff9f1c" }}>ShopEZ Hardware Hub</h5>
            <p className="mb-0 text-light" style={{ fontSize: "0.9rem", opacity: 0.85 }}>
              Your One-Stop Shop for Tools & Hardware
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-md-4 text-center">
            <h5 style={{ fontWeight: "600", color: "#ffffff" }}>Quick Links</h5>
            <ul className="list-unstyled mb-0 d-flex flex-column gap-1 align-items-center" style={{ fontSize: "0.9rem" }}>
              <li>
                <Link to="/" className="text-decoration-none text-light" style={{ opacity: 0.85 }}>Home</Link>
              </li>
              <li>
                <Link to="/" className="text-decoration-none text-light" style={{ opacity: 0.85 }}>Products</Link>
              </li>
              <li>
                <Link to="/cart" className="text-decoration-none text-light" style={{ opacity: 0.85 }}>Cart</Link>
              </li>
              <li>
                <Link to="/my-orders" className="text-decoration-none text-light" style={{ opacity: 0.85 }}>My Orders</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-md-4 text-center text-md-end">
            <h5 style={{ fontWeight: "600", color: "#ffffff" }}>Contact Us</h5>
            <p className="mb-1 text-light" style={{ fontSize: "0.9rem", opacity: 0.85 }}>
              Email: support@shopez.com
            </p>
            <p className="mb-0 text-light" style={{ fontSize: "0.9rem", opacity: 0.85 }}>
              Phone: +91 XXXXX XXXXX
            </p>
          </div>
        </div>

        <hr className="my-3" style={{ borderColor: "rgba(255, 255, 255, 0.2)" }} />

        {/* Copyright */}
        <div className="text-center text-light" style={{ fontSize: "0.85rem", opacity: 0.75 }}>
          &copy; {new Date().getFullYear()} ShopEZ Hardware Hub. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default FooterComponent;
