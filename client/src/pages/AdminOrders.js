import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const getStatusClass = (status) => {
  switch (status?.toLowerCase()) {
    case "shipped": return "status-badge status-shipped";
    case "delivered": return "status-badge status-delivered";
    default: return "status-badge status-placed";
  }
};

const AdminOrders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (!userInfo || userInfo.role !== "admin") {
      toast.error("Access denied. Admin role required.");
      navigate("/login");
    }
  }, [navigate]);

  const fetchOrders = async () => {
    const userInfo = JSON.parse(
      localStorage.getItem("userInfo")
    );

    if (!userInfo) return;

    const response = await axios.get(
      "https://shopez-backend-7mm7.onrender.com/api/orders",
      {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
    );

    setOrders(response.data);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (id, status) => {
    const userInfo = JSON.parse(
      localStorage.getItem("userInfo")
    );

    if (!userInfo) return;

    await axios.put(
      `https://shopez-backend-7mm7.onrender.com/api/orders/${id}`,
      { status },
      {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
    );

    toast.success("Updated");
    fetchOrders();
  };

  const filteredOrders = orders.filter((order) =>
    order.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.address?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.status?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.paymentMethod?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order._id?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-4 mb-5">
      <h2 className="section-title">
        Manage Orders
      </h2>

      {orders.length === 0 ? (
        <div className="empty-state">
          <p className="mt-3">No orders found.</p>
        </div>
      ) : (
        <>
          <div className="row mb-3">
            <div className="col-4">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control border-start-0"
                  placeholder="Search orders by name, email, ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>

          {filteredOrders.length === 0 ? (
            <div className="empty-state">
              <p className="mt-3">No orders match your search.</p>
            </div>
          ) : (
            filteredOrders.map((order) => (
              <div key={order._id} className="card form-card p-4 mb-3">
                <div className="d-flex flex-wrap justify-content-between align-items-start mb-3">
                  <div>
                    <h6 className="mb-1" style={{ fontWeight: "600" }}>
                      {order.name}
                    </h6>
                    <small className="text-muted">{order.email}</small>
                  </div>
                  <span className={getStatusClass(order.status)}>
                    {order.status}
                  </span>
                </div>

                <div className="row mb-3">
                  <div className="col-6 mb-2">
                    <small className="text-muted">
                      Address
                    </small>
                    <p className="mb-0" style={{ fontSize: "0.9rem" }}>{order.address}</p>
                  </div>
                  <div className="col-3 mb-2">
                    <small className="text-muted">
                      Payment
                    </small>
                    <p className="mb-0 fw-semibold" style={{ fontSize: "0.9rem" }}>
                      {order.paymentMethod}
                    </p>
                  </div>
                  <div className="col-3 mb-2">
                    <small className="text-muted">
                       Order ID
                    </small>
                    <p className="mb-0" style={{ fontSize: "0.9rem" }}>
                      {order._id?.slice(-8)}
                    </p>
                  </div>
                </div>

                <div className="d-flex flex-wrap align-items-center gap-2">
                  <label className="form-label mb-0 fw-semibold me-2" style={{ fontSize: "0.9rem" }}>
                    Update Status:
                  </label>
                  <select
                    className="form-select form-select-sm"
                    style={{ width: "180px" }}
                    defaultValue={order.status}
                    onChange={(e) =>
                      updateStatus(order._id, e.target.value)
                    }
                  >
                    <option>Placed</option>
                    <option>Shipped</option>
                    <option>Delivered</option>
                  </select>
                </div>
              </div>
            ))
          )}
        </>
      )}
    </div>
  );
};

export default AdminOrders;