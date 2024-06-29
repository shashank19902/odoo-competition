import React from 'react'
import { Link } from 'react-router-dom';

export default function FacultyNavbar() {

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
            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton1">
              <li>
                <a className="dropdown-item" href="/myProfile">
                  My Profile
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="/myMaterials">
                  My Materials
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="/myProjects">
                  My Projects
                </a>
              </li>
            </ul>
          </span>
          <li className="btn btn-outline-danger login-signup-button">
            <Link className="nav-link" to="/logout">
              LOGOUT
            </Link>
          </li>
        </>
      );
    }
    else {
      return (
        <>
          <li className="btn btn-outline-primary mx-3 login-signup-button">
            <Link className="nav-link" to="/adminlogin">
              LOGIN
            </Link>
          </li>
        </>
      );
    }
  }


  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="/dashboard">Faculty</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/dashboard">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" aria-current="page" href="/mat4pl">Add Material</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/5bwghty">Add Project</a>
              </li>
            </ul>
            <RenderMenu />
          </div>
        </div>

      </nav>
    </div>
  )
}
