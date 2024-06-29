import React from "react";
// import React, { useContext } from "react";
import { NavLink, Link } from "react-router-dom";
// import { UserContext } from "../../App";
import "./Navbar.css";

export default function Navbar() {
  // const { state } = useContext(UserContext);
  // console.log(state);
  const isLoggedIn = window.localStorage.getItem("isLoggedIn") === "true";

  const RenderMenu = () => {
    // console.log(typeof isLoggedIn);
    if (isLoggedIn) {
      return (
        <>
          <span className="dropdown dropdown-button">
            <button
              className="dropdown-toggle "
              type="button"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="fas fa-user"></i>
            </button>
            <ul
              className="dropdown-menu dropdown-menu-end"
              aria-labelledby="dropdownMenuButton1"
            >
              <Link className="dropdown-link" to="/myProfile">
                <li className="dropdown-list">
                  My Profile
                  <i class="fa-solid fa-address-card dropdown-icons"></i>
                </li>
              </Link>
              <Link className="dropdown-link" to="/myForums">
                <li className="dropdown-list">
                  My Forums
                  <i class="fa-solid fa-book dropdown-icons"></i>
                </li>
              </Link>
              <Link className="dropdown-link" to="/logout">
                <li className="dropdown-list">
                  Logout
                  <i class="fa-solid fa-right-from-bracket dropdown-icons"></i>
                </li>
              </Link>
            </ul>
          </span>
        </>
      );
    } else {
      return (
        <>
          <li className="btn btn-outline-primary mx-3 login-signup-button">
            <Link className="nav-link" to="/login">
              LOGIN
            </Link>
          </li>
          <li className="btn btn-outline-secondary login-signup-button">
            <Link className="nav-link" to="/register">
              SIGNUP
            </Link>
          </li>
        </>
      );
    }
  };

  return (
    <div>
      <div>
        <nav
          style={{ zIndex: "99" }}
          className="navbar navbar-expand-lg bg-light shadow"
        >
          <div className="container-fluid nav-bg">
            <NavLink
              className="navbar-brand"
              to="/"
              style={{ textDecoration: "none" }}
            >
              Scholar's Shelf
            </NavLink>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse "
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <NavLink className="nav-link" aria-current="page" to="/">
                    Home
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink className="nav-link" to="/Materials">
                    Materials
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/Projects">
                    Projects
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/forum">
                    Forum
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/about">
                    About Us
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/join">
                    Join Our Community
                  </NavLink>
                </li>
              </ul>
              <RenderMenu />
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}
