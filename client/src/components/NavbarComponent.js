import React from "react";
import { Link, useNavigate } from "react-router-dom";

const NavbarComponent = () => {

  const navigate = useNavigate();

  const userInfo = JSON.parse(
    localStorage.getItem("userInfo")
  );



  const logoutHandler = () => {

    localStorage.removeItem("userInfo");

    navigate("/login");
  };



  return (

    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">

      <Link className="navbar-brand" to="/">
        ShopEZ
      </Link>

      <div className="ms-auto">

        {userInfo ? (

          <>
            <span className="text-white me-3">
              Hello, {userInfo.name}
            </span>

            <Link
              to="/cart"
                 className="btn btn-warning me-2"
            >
              Cart
            </Link>


            <button
              className="btn btn-danger"
              onClick={logoutHandler}
            >
              Logout
            </button>
          </>

        ) : (

          <>
            <Link
              className="btn btn-outline-light me-2"
              to="/login"
            >
              Login
            </Link>

            <Link
              className="btn btn-warning"
              to="/register"
            >
              Register
            </Link>
          </>

        )}

      </div>

    </nav>
  );
};

export default NavbarComponent;