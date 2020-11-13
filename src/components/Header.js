import React from "react";
import Vinted from "../assets/images/vinted-logo.png";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="header">
      <Link to="/" className="logo">
        <img src={Vinted} alt="vinted-logo" />
      </Link>
      <div>
        <input type="search" name="" id="" />
      </div>
      <div className="header-button">
        <div className="log-button">
          <Link to="/signup">S'inscrire</Link>
          <Link to="/login">Se connecter</Link>
        </div>
        <Link to="">Vends tes articles</Link>
      </div>
    </header>
  );
};

export default Header;
