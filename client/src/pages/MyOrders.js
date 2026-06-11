import React, {
  useEffect,
  useState,
} from "react";

import { getUserOrders }
from "../services/orderService";

const MyOrders = () => {

  const [orders, setOrders] =
    useState([]);

  useEffect(() => {

    const fetchOrders = async () => {

      const userInfo = JSON.parse(
        localStorage.getItem("userInfo")
      );

      const data =
        await getUserOrders(
          userInfo._id
        );

      setOrders(data);
    };

    fetchOrders();

  }, []);

  return (
    <div className="container mt-4">

      <h2>My Orders</h2>

      {orders.length === 0 ? (

        <p>No orders found.</p>

      ) : (

        orders.map((order) => (

          <div
            key={order._id}
            className="card p-3 mb-3"
          >

            <h5>
              {order.title || "Order"}
            </h5>

            <p>
              Order Date:
              {" "}
              {new Date(
                order.orderDate
              ).toLocaleDateString()}
            </p>

            <p>
              Status:
              {" "}
              <strong>
                {order.status}
              </strong>
            </p>

            <p>
              Payment:
              {" "}
              {order.paymentMethod}
            </p>

            <p>
              Address:
              {" "}
              {order.address}
            </p>

          </div>

        ))

      )}

    </div>
  );
};

export default MyOrders;