import React, { useEffect, useState } from "react";
import { getUserOrders } from "../services/orderService";

const getStatusClass = (status) => {
  switch (status?.toLowerCase()) {
    case "shipped": return "status-badge status-shipped";
    case "delivered": return "status-badge status-delivered";
    default: return "status-badge status-placed";
  }
};

const getStatusBorder = (status) => {
  switch (status?.toLowerCase()) {
    case "shipped": return "4px solid #0d6efd";
    case "delivered": return "4px solid #198754";
    default: return "4px solid #ffc107";
  }
};

const MyOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const userInfo = JSON.parse(
        localStorage.getItem("userInfo")
      );

      const data = await getUserOrders(userInfo._id);
      setOrders(data);
    };

    fetchOrders();
  }, []);

  return (
    <div className="container mt-4 mb-5">
      <h2 className="section-title">
        My Orders
      </h2>

      {orders.length === 0 ? (
        <div className="empty-state">
          <p className="mt-3">No orders found.</p>
        </div>
      ) : (
        orders.map((order) => (
          <div
            key={order._id}
            className="card form-card p-3 p-md-4 mb-3"
            style={{ borderLeft: getStatusBorder(order.status) }}
          >
            <div className="d-flex flex-wrap justify-content-between align-items-start mb-2">
              <h6 className="mb-1" style={{ fontWeight: "600" }}>
                {order.title || "Order"}
              </h6>
              <span className={getStatusClass(order.status)}>
                {order.status}
              </span>
            </div>

            <div className="row mt-2">
              <div className="col-md-4 mb-2">
                <small className="text-muted">
                   Order Date
                </small>
                <p className="mb-0 fw-semibold" style={{ fontSize: "0.9rem" }}>
                  {new Date(order.orderDate).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>

              <div className="col-md-4 mb-2">
                <small className="text-muted">
                  Payment
                </small>
                <p className="mb-0 fw-semibold" style={{ fontSize: "0.9rem" }}>
                  {order.paymentMethod}
                </p>
              </div>

              <div className="col-md-4 mb-2">
                <small className="text-muted">
                 Address
                </small>
                <p className="mb-0" style={{ fontSize: "0.9rem" }}>
                  {order.address}
                </p>
              </div>
            </div>

            <div className="mt-2">
              <small className="text-muted">
                Order ID: {order._id?.slice(-8)}
              </small>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MyOrders;