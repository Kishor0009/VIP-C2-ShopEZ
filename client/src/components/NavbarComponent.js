import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const NavbarComponent = ({ searchTerm, setSearchTerm }) => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const userInfo = JSON.parse(
    localStorage.getItem("userInfo")
  );

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    navigate("/login");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark navbar-custom" style={{ backgroundColor: "#2b2d42" }}>
      <div className="container">
        <Link className="navbar-brand d-flex flex-column align-items-start" to="/" style={{ lineHeight: "1.1" }}>
          <span style={{ fontWeight: "700", fontSize: "1.4rem",color: "#ff9f1c" }}>ShopEZ</span>
          <span style={{ fontSize: "0.75rem", opacity: 0.8, fontWeight: "500", textTransform: "uppercase",marginLeft: "49px", }}>Hardware Hub</span>
        </Link>


        <div className="d-flex align-items-center flex-grow-1" id="navbarContent">
          <form className="d-flex mx-auto" style={{ width: "100%", maxWidth: "350px" }}>
            <input
              type="text"
              className="form-control"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </form>

          <ul className="navbar-nav ms-auto align-items-center flex-row gap-3">
            {userInfo ? (
              <>
                {userInfo.role === "admin" && (
                  <li className="nav-item me-2">
                    <Link to="/admin" className="btn btn-outline-light btn-sm">
                      Admin
                    </Link>
                  </li>
                )}

                <li className="nav-item me-2">
                  <Link to="/cart" className="btn btn-warning btn-sm">
                    Cart
                  </Link>
                </li>

                <li className="nav-item me-2 position-relative" ref={dropdownRef}>
                  <button
                    className="btn btn-outline-light btn-sm d-flex align-items-center gap-1"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    style={{ fontWeight: "500" }}
                  >
                    <span className="d-flex align-items-center gap-1">
                      <i className="bi bi-person-fill"></i>
                      {userInfo.name}
                    </span>
                    <i className={`bi bi-chevron-${dropdownOpen ? 'up' : 'down'}`} style={{ fontSize: "0.75rem" }}></i>
                  </button>

                  {dropdownOpen && (
                    <div className="profile-dropdown">
                      <div className="profile-dropdown-info">
                        <div className="profile-dropdown-name text-truncate">
                          {userInfo.name}
                        </div>
                        {userInfo.email && (
                          <div className="profile-dropdown-email text-truncate">
                            {userInfo.email}
                          </div>
                        )}
                        <div className="mt-1">
                          <span className="badge bg-secondary text-capitalize" style={{ fontSize: "0.75rem" }}>
                            Role: {userInfo.role || "user"}
                          </span>
                        </div>
                      </div>
                      
                      <ul className="list-unstyled mb-0 d-flex flex-column gap-2">
                        <li>
                          <Link
                            to="/my-orders"
                            className="profile-dropdown-item"
                            onClick={() => setDropdownOpen(false)}
                          >
                            My Orders
                          </Link>
                        </li>
                        <li>
                          <button
                            className="btn btn-danger btn-sm w-100 mt-1 d-flex align-items-center justify-content-center gap-2"
                            onClick={() => {
                              setDropdownOpen(false);
                              logoutHandler();
                            }}
                          >
                            Logout
                          </button>
                        </li>
                      </ul>
                    </div>
                  )}
                </li>
              </>
            ) : (
              <>
                <li className="nav-item me-2">
                  <Link className="btn btn-outline-light btn-sm" to="/login">
                    Login
                  </Link>
                </li>

                <li className="nav-item">
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