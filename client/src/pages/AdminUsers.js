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

const AdminUsers = () => {

  const [users,
    setUsers] =
    useState([]);

  const fetchUsers =
    async () => {

    const response =
      await axios.get(
        "http://localhost:5000/api/auth/users"
      );

    setUsers(
      response.data
    );
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const deleteUser =
    async (id) => {

    await axios.delete(
      `http://localhost:5000/api/auth/users/${id}`
    );

    toast.success(
      "User deleted"
    );

    fetchUsers();
  };

  return (
    <div className="container mt-4">

      <h2>
        Manage Users
      </h2>

      {users.map(
        (user) => (

        <div
          key={user._id}
          className=
          "card p-3 mb-3"
        >

          <h5>
            {user.name}
          </h5>

          <p>
            {user.email}
          </p>

          <p>
            Role:
            {" "}
            {user.role}
          </p>

          <button
            className=
            "btn btn-danger"
            onClick={() =>
              deleteUser(
                user._id
              )
            }
          >
            Delete
          </button>

        </div>

      ))}

    </div>
  );
};

export default AdminUsers;