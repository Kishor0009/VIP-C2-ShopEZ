import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { getAuthConfig } from "../utils/authConfig";

const AdminDashboard = () => {
  const [counts, setCounts] = useState({ products: null, orders: null, users: null });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const config = getAuthConfig();
        const [prodRes, orderRes, userRes] = await Promise.all([
          axios.get("https://shopez-backend-7mm7.onrender.com/api/products", config),
          axios.get("https://shopez-backend-7mm7.onrender.com/api/orders", config),
          axios.get("https://shopez-backend-7mm7.onrender.com/api/auth/users", config),
        ]);
        setCounts({
          products: prodRes.data.length,
          orders: orderRes.data.length,
          users: userRes.data.length,
        });
      } catch (err) {
        console.error("Failed to fetch dashboard counts", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCounts();
  }, []);

  return (
    <div className="container mt-5 mb-5">
      <h2 className="section-title">
        Admin Panel
      </h2>

      <div className="row g-4 mt-2">
        <div className="col-md-4">
          <Link to="/admin/products" style={{ textDecoration: "none" }}>
            <div className="admin-card card p-4 text-center" style={{ borderTopColor: "#4361ee" }}>
              <h5 className="mt-3" style={{ fontWeight: "600", color: "#333" }}>Products</h5>
              {loading ? (
                <div className="spinner-border spinner-border-sm text-secondary my-2" role="status"></div>
              ) : counts.products !== null ? (
                <h3 className="fw-bold my-2" style={{ color: "#4361ee" }}>{counts.products}</h3>
              ) : null}
              <p className="text-muted mb-0" style={{ fontSize: "0.85rem" }}>
                Manage your products
              </p>
            </div>
          </Link>
        </div>

        <div className="col-md-4">
          <Link to="/admin/orders" style={{ textDecoration: "none" }}>
            <div className="admin-card card p-4 text-center" style={{ borderTopColor: "#198754" }}>
              <h5 className="mt-3" style={{ fontWeight: "600", color: "#333" }}>Orders</h5>
              {loading ? (
                <div className="spinner-border spinner-border-sm text-secondary my-2" role="status"></div>
              ) : counts.orders !== null ? (
                <h3 className="fw-bold my-2" style={{ color: "#198754" }}>{counts.orders}</h3>
              ) : null}
              <p className="text-muted mb-0" style={{ fontSize: "0.85rem" }}>
                View and manage orders
              </p>
            </div>
          </Link>
        </div>

        <div className="col-md-4">
          <Link to="/admin/users" style={{ textDecoration: "none" }}>
            <div className="admin-card card p-4 text-center" style={{ borderTopColor: "#ff9f1c" }}>
              <h5 className="mt-3" style={{ fontWeight: "600", color: "#333" }}>Users</h5>
              {loading ? (
                <div className="spinner-border spinner-border-sm text-secondary my-2" role="status"></div>
              ) : counts.users !== null ? (
                <h3 className="fw-bold my-2" style={{ color: "#ff9f1c" }}>{counts.users}</h3>
              ) : null}
              <p className="text-muted mb-0" style={{ fontSize: "0.85rem" }}>
                Manage user accounts
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;