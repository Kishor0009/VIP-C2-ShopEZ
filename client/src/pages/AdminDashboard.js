import React from "react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="container mt-5">

      <h2>Admin Dashboard</h2>

      <div className="row mt-4">

        <div className="col-md-4">
          <Link
            to="/admin/products"
            style={{
              textDecoration: "none"
            }}
          >
            <div className="card p-4 text-center">
              <h4>Products</h4>
            </div>
          </Link>
        </div>
        </div>

        <div className="col-md-4">

              <Link
                to="/admin/orders"
                style={{
                  textDecoration:
                  "none"
                }}
              >

                <div
                  className=
                  "card p-4 text-center"
                >
                  <h4>
                    Orders
                  </h4>
                </div>

              </Link>

            </div>

        <div className="col-md-4">
          <div className="card p-4 text-center">
            <h4>Users</h4>
          </div>
        </div>

      </div>
  );
};

export default AdminDashboard;