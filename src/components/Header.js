import React from "react";
import Vinted from "../assets/images/vinted-logo.png";
import { Link, useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header = ({ token, setUser }) => {
  const history = useHistory();

  return (
    <div>
      <header className="header">
        <div
          className="logo"
          onClick={() => {
            history.push("/");
          }}
        >
          <img src={Vinted} alt="vinted-logo" />
        </div>

        <div className="search">
          <i className="search-icon" onSubmit={() => {}}>
            <FontAwesomeIcon icon="search" />
          </i>
          <input
            type="text"
            className="searchTerm"
            placeholder="Recherche des articles"
          />
        </div>
        <div className="header-button">
          <div className="log-container">
            {/* On vérifie si le token existe, si oui bouton "Se déconnecter" sinon boutons "S'inscrire & se connecter" */}
            {token ? (
              <button
                className="log-button logout-button"
                onClick={() => {
                  setUser(null);
                }}
              >
                Se déconnecter
              </button>
            ) : (
              <div style={{ display: "flex" }}>
                <Link className="log-button" to="/signup">
                  S'inscrire
                </Link>
                <Link className="log-button" to="/login">
                  Se connecter
                </Link>
              </div>
            )}
          </div>

          <Link className="sell-button" to="/publish">
            Vends tes articles
          </Link>
        </div>
      </header>
    </div>
  );
};

export default Header;
