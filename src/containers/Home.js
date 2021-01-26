import React, { useState, useEffect } from "react";
import Hero from "../components/Hero";
import axios from "axios";
import { Link } from "react-router-dom";
import Loader from "react-loader-spinner";

const Home = () => {
  // console.log(offers);
  const [data, setData] = useState({}); // Permet de gérer les données
  const [isLoading, setIsLoading] = useState(true); // Permet de gérer le fait que l'objet soit vide au chargement du composant

  useEffect(() => {
    const fetchData = async () => {
      try {
        // A terme, je devrai mettre le lien de mon URL pour le backend
        const response = await axios.get(
          "https://vinted-backend-v1.herokuapp.com/offers" // Il faut gérer le problème de l'avatar qui n'existe pas dans le modèle du backend
        );
        // console.log(response.data); // Je vérifie que je récupère les données du backend qui est un objet
        setData(response.data);
        setIsLoading(false); // il faut passer ce state à false afin que la page ne se charge pas indéfiniment
      } catch (error) {
        console.log(error.message);
      }
    };
    // permet de charger les données une fois au chargement du composant
    fetchData(); // J'appelle la fonction fetchData qui va appeler le serveur
  }, []);

  return isLoading ? (
    <div className="loader">
      <Loader type="Puff" color="#2cb1ba" height={100} width={100} />
    </div>
  ) : (
    <div>
      <Hero />
      <div className="item-wrapper">
        {data.offers.map((offer, index) => {
          // on utilise data.offers qui est l'objet avec le détail des annonces pour faire le map()
          console.log(offer); // on reçoit toutes les annonces
          return (
            <div className="item" key={index}>
              <div className="item-avatar">
                {offer.owner && (
                  <p className="item-username">
                    {offer.owner.account.username}
                  </p>
                )}
              </div>
              <Link
                to={`/offer/${offer._id}`}
                key={offer._id}
                className="item-link"
              >
                {/* pour récupérer les ID de chaque offre, on utilise {objet._id} qui servira aussi de clé pour la liste d'enfant retournée */}
                <div className="item-img">
                  {/* on teste si une photo existe dans l'objet product_image et on la renvoie sinon rien */}
                  {offer.product_image && (
                    <img src={offer.product_image.secure_url} alt="" />
                  )}
                </div>
                <div className="item-detail">
                  <span>{offer.product_price} €</span>
                  <span>{offer.product_details[1].TAILLE}</span>
                  <span>{offer.product_details[0].MARQUE}</span>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
