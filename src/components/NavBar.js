import React from "react";

import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();

  const AddNewOnClick = () => {
    navigate('/addbook');
  }

  const ShowAllOnClick = () => {
    navigate('/showbooks');
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-black">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Book Management
          </a>
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
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link" onClick={()=> AddNewOnClick()} href="#">
                  Add New
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" onClick={()=> ShowAllOnClick()} href="#">
                  Show All
                </a>
              </li>
            </ul>
            
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
