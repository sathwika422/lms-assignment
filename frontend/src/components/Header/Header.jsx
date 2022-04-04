import React from "react";
import { Link } from "react-router-dom";

import "./header.styles.scss";

const Header = () => {
  return (
    <div className="header-container">
      <div className="header px-5 mx-5 flex flex-row justify-content-between">
        <div className="logo-container">
          <h4>Library</h4>
        </div>
        <div className="links-container flex flex-row align-items-center justify-content-center ">
          <div>
            <Link to="/admin" className="header-link">
              Home
            </Link>
          </div>
          <div>
            <Link to="/admin/users" className="header-link">
              Users
            </Link>
          </div>
          <div>
            <Link to="/student" className="header-link">
              Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
