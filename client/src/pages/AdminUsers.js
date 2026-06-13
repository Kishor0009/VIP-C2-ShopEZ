import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { getAuthConfig } from "../utils/authConfig";

const AdminUsers = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleAuthError = useCallback((error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      localStorage.removeItem("userInfo");
      toast.error(error.response?.data?.message || "Please login again.");
      navigate("/login");
      return true;
    }

    return false;
  }, [navigate]);

  const fetchUsers = useCallback(async () => {
    try {
      const response = await axios.get(
        "https://shopez-backend-7mm7.onrender.com/api/auth/users",
        getAuthConfig()
      );

      setUsers(response.data);
    } catch (error) {
      console.error(error);

      if (!handleAuthError(error)) {
        toast.error(
          error.response?.data?.message ||
          "Failed to load users"
        );
      }
    }
  }, [handleAuthError]);

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    if (!userInfo || userInfo.role !== "admin") {
      toast.error("Access denied. Admin role required.");
      navigate("/login");
      return;
    }

    fetchUsers();
  }, [fetchUsers, navigate]);

  const deleteUser = async (id) => {
    try {
      await axios.delete(
        `https://shopez-backend-7mm7.onrender.com/api/auth/users/${id}`,
        getAuthConfig()
      );

      setUsers((currentUsers) =>
        currentUsers.filter((user) => user._id !== id)
      );

      const userInfo = JSON.parse(localStorage.getItem("userInfo"));

      if (userInfo?._id === id) {
        localStorage.removeItem("userInfo");
        toast.error("Your account has been removed. Please login again.");
        navigate("/login");
        return;
      }

      toast.success("User deleted");
    } catch (error) {
      console.error(error);

      if (!handleAuthError(error)) {
        toast.error(
          error.response?.data?.message ||
          "Failed to delete user"
        );
      }
    }
  };

  const filteredUsers = users.filter((user) =>
    user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-4 mb-5">
      <h2 className="section-title">
        Manage Users
      </h2>

      {users.length === 0 ? (
        <div className="empty-state">
          <p className="mt-3">No users found.</p>
        </div>
      ) : (
        <>
          <div className="row mb-3">
            <div className="col-4">
              <div className="input-group">
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
