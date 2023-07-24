import React from "react";
import "./style.css";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  console.log(currentPath);
  return (
    <div className="nav">
      <div className="gradient"></div>
      <div class="links">
        <Link to="/" className={currentPath ==="/"? "active": "default-color"}>Signup</Link>
        <Link to="/podcast" className={currentPath ==="/podcast"? "active": "default-color"}>Podcast</Link>
        <Link to="/start-a-podcast" className={currentPath ==="/start-a-podcast"? "active": "default-color"}>Start A Podcast</Link>
        <Link to="/profile" className={currentPath ==="/profile"? "active": "default-color"}>Profile</Link>
      </div>
    </div>
  );
};

export default Header;
