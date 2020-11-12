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
          <button>S'inscrire</button>
          <button>Se connecter</button>
        </div>
        <button>Vends tes articles</button>
      </div>
    </header>
  );
};

export default Header;
