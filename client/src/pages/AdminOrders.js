import React,
{
  useEffect,
  useState
}
from "react";

import axios
from "axios";

import { toast }
from "react-toastify";

const AdminOrders = () => {

  const [orders,
    setOrders] =
    useState([]);

  const fetchOrders =
    async () => {

    const response =
      await axios.get(
        "http://localhost:5000/api/orders"
      );

    setOrders(
      response.data
    );
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus =
    async (
      id,
      status
    ) => {

    await axios.put(
      `http://localhost:5000/api/orders/${id}`,
      { status }
    );

    toast.success(
      "Updated"
    );

    fetchOrders();
  };

  return (
    <div className="container mt-4">

      <h2>
        Manage Orders
      </h2>

      {orders.map(
        (order) => (

        <div
          key={order._id}
          className=
          "card p-3 mb-3"
        >

          <h5>
            {
              order.name
            }
          </h5>

          <p>
            {
              order.email
            }
          </p>

          <p>
            {
              order.address
            }
          </p>

          <p>
            Status:
            {" "}
            <strong>
              {
                order.status
              }
            </strong>
          </p>

          <select
            className=
            "form-select mb-2"
            defaultValue=
            {
              order.status
            }
            onChange={
              (e) =>
              updateStatus(
                order._id,
                e.target
                 .value
              )
            }
          >

            <option>
              Placed
            </option>

            <option>
              Shipped
            </option>

            <option>
              Delivered
            </option>

          </select>

        </div>

      ))}

    </div>
  );
};

export default AdminOrders;