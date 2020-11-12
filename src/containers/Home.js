import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  // console.log(offers);
  const [data, setData] = useState({}); // Permet de gérer les données
  const [isLoading, setIsLoading] = useState(true); // Permet de gérer le fait que l'objet soit vide au chargement du composant

  const fectData = async () => {
    try {
      // A terme, je devrai mettre le lien de mon URL pour le backend
      const response = await axios.get(
        "https://lereacteur-vinted-api.herokuapp.com/offers"
      );
      console.log(response.data); // Je vérifie que je récupère les données du backend qui est un objet
      setData(response.data);
      setIsLoading(false); // il faut passer ce state à false afin que la page ne se charge pas indéfiniment
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    // permet de charger les données une fois au chargement du composant
    fectData(); // J'appelle la fonction fetchData qui va appeler le serveur
  }, []);

  return isLoading ? (
    <span>Loading...</span>
  ) : (
    <div>
      {data.offers.map((offer, index) => {
        // on utilise data.offers qui est l'objet avec le détail des annonces pour faire le map()
        // console.log(offer); // on reçoit toutes les annonces
        return (
          <Link to={`/offer/${offer._id}`} key={offer._id}>
            {/* pour récupérer les ID de chaque offre, on utilise {objet._id} qui servira aussi de clé pour la liste d'enfant retournée */}
            <div className="item">
              {/* {offer.owner.account.avatar} */}
              {offer.owner.account.username}
              {/* Image */}
              <div className="item-img">
                {offer.product_pictures.map((list, index) => {
                  const keys = Object.keys(list);
                  console.log(keys[16]);
                  return <img key={index} src={list[keys[16]]} alt="" />;
                })}
              </div>
              {offer.product_price} €
              {offer.product_details.map((list, index) => {
                const keys = Object.keys(list);
                // console.log(list[keys]);
                // console.log(keys); // retourne chaque key du tableau  ==> ["MARQUE"] ["TAILLE"] ["ETAT"] ["COULEUR"] ["EMPLACEMENT"]
                return <p key={index}>{list[keys[0]]}</p>; // Je retourne le 1er élément de l'objet
              })}
              {offer.product_name}
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default Home;
