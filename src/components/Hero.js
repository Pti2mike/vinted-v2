import React from "react";
import Home from "../assets/images/home_image.jpeg";
import { useHistory } from "react-router-dom";

const Hero = () => {
  const history = useHistory();

  return (
    <div className="hero">
      <img src={Home} alt="home" className="home" />
      <div className="home-sell">
        <p>Prêts à faire du tri dans vos placards ?</p>
        <button
          onClick={() => {
            history.push("/publish");
          }}
        >
          Commencer à vendre
        </button>

        <p
          className="home-help"
          onClick={() => {
            history.push("/");
          }}
        >
          Découvrir comment ça marche
        </p>
      </div>
    </div>
  );
};

export default Hero;
