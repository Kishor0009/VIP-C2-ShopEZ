import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { getAuthConfig } from "../utils/authConfig";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchUsers = async () => {
    const response = await axios.get(
      "http://localhost:5000/api/auth/users",
      getAuthConfig()
    );

    setUsers(response.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const deleteUser = async (id) => {
    await axios.delete(
      `http://localhost:5000/api/auth/users/${id}`,
      getAuthConfig()
    );

    toast.success("User deleted");
    fetchUsers();
  };

  const filteredUsers = users.filter((user) =>
    user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-4 mb-5">
      <h2 className="section-title">
        <i className="bi bi-people me-2"></i>
        Manage Users
      </h2>

      {users.length === 0 ? (
        <div className="empty-state">
          <i className="bi bi-person-x" style={{ fontSize: "3rem" }}></i>
          <p className="mt-3">No users found.</p>
        </div>
      ) : (
        <>
          <div className="row mb-3">
            <div className="col-md-6 col-lg-4">
              <div className="input-group">
                <span className="input-group-text bg-white border-end-0">
                  <i className="bi bi-search text-muted"></i>
                </span>
                <input
                  type="text"
                  className="form-control border-start-0"
                  placeholder="Search users by name, email, role..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>

          {filteredUsers.length === 0 ? (
            <div className="empty-state">
              <i className="bi bi-search" style={{ fontSize: "3rem" }}></i>
              <p className="mt-3">No users match your search.</p>
            </div>
          ) : (
            <div className="card form-card">
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead className="table-light">
                    <tr>
                      <th style={{ width: "5%" }}>#</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th style={{ width: "15%" }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((user, index) => (
                      <tr key={user._id}>
                        <td>{index + 1}</td>
                        <td className="fw-semibold">{user.name}</td>
                        <td className="text-muted">{user.email}</td>
                        <td>
                          <span
                            className={`badge ${
                              user.role === "admin" ? "bg-danger" : "bg-primary"
                            }`}
                          >
                            {user.role}
                          </span>
                        </td>
                        <td>
                          <button
                            className="btn btn-outline-danger btn-sm"
                            onClick={() => deleteUser(user._id)}
                          >
                            <i className="bi bi-trash me-1"></i>
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AdminUsers;