import React from "react";
import Vinted from "../assets/images/vinted-logo.png";

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <img src={Vinted} alt="vinted-logo" />
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
