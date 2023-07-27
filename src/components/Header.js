import React from "react";

import "../App.css";

import { useNavigate } from "react-router-dom";

function Header({ setaction }) {
  const navigate = useNavigate();

  const handleRoute = () => {
    navigate("/home");
    setaction(false);
  };

  const handleRoute2 = () => {
    setaction(true);
  };

  return (
    <div className="header">
      <div className="route">
        <div onClick={handleRoute}>Home</div>

        <div onClick={handleRoute2}>Favourite</div>
      </div>
    </div>
  );
}

export default Header;
