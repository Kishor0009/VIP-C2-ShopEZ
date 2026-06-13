import React from "react";
import { Link, useNavigate } from "react-router-dom";

const NavbarComponent = ({ searchTerm, setSearchTerm }) => {
  const navigate = useNavigate();

  const userInfo = JSON.parse(
    localStorage.getItem("userInfo")
  );

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark navbar-custom" style={{ backgroundColor: "#2b2d42" }}>
      <div className="container">
        <Link className="navbar-brand d-flex flex-column align-items-start" to="/" style={{ lineHeight: "1.1" }}>
          <span style={{ fontWeight: "700", fontSize: "1.4rem" }}>ShopEZ</span>
          <span style={{ fontSize: "0.75rem", opacity: 0.8, fontWeight: "500", textTransform: "uppercase" }}>Hardware Hub</span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">
          <form className="d-flex mx-auto my-2 my-lg-0" style={{ width: "100%", maxWidth: "350px" }}>
            <input
              type="text"
              className="form-control"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </form>

          <ul className="navbar-nav ms-auto align-items-lg-center">
            {userInfo ? (
              <>
                <li className="nav-item me-lg-2 mb-2 mb-lg-0">
                  <span className="badge bg-light text-dark px-3 py-2" style={{ fontSize: "0.85rem" }}>
                    <i className="bi bi-person-fill me-1"></i>
                    {userInfo.name}
                  </span>
                </li>

                {userInfo.role === "admin" && (
                  <li className="nav-item me-lg-2 mb-2 mb-lg-0">
                    <Link to="/admin" className="btn btn-outline-light btn-sm">
                      Admin
                    </Link>
                  </li>
                )}

                <li className="nav-item me-lg-2 mb-2 mb-lg-0">
                  <Link to="/cart" className="btn btn-warning btn-sm">
                    Cart
                  </Link>
                </li>

                <li className="nav-item me-lg-2 mb-2 mb-lg-0">
                  <Link to="/my-orders" className="btn btn-info btn-sm text-white">
                    My Orders
                  </Link>
                </li>

                <li className="nav-item mb-2 mb-lg-0">
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={logoutHandler}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item me-lg-2 mb-2 mb-lg-0">
                  <Link className="btn btn-outline-light btn-sm" to="/login">
                    Login
                  </Link>
                </li>

                <li className="nav-item mb-2 mb-lg-0">
                  <Link className="btn btn-warning btn-sm" to="/register">
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavbarComponent;