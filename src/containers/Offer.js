import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Offer = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://lereacteur-vinted-api.herokuapp.com/offer/${id}`
      );
      console.log({ id });
      // console.log(response.data); // Retourne l'objet renseigné dans :id
      setData(response.data);
      setIsLoading(false); //il faut passer ce state à false afin que la page ne se charge pas indéfiniment
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    // permet de charger les données une fois au chargement du composant
    fetchData(); // J'appelle la fonction fetchData qui va appeler le serveur
  }, [id]);

  return isLoading ? (
    <span>Loading...</span>
  ) : (
    <div className="offer-wrapper">
      <div>
        <img
          className="offer-img"
          src={data.product_pictures[0].secure_url}
          alt={data.product_name}
        />
      </div>
      <span>{data.product_price}</span>
      <span>
        <p></p>
        {data.product_details.map((list, index) => {
          const keys = Object.keys(list);
          // console.log(list[keys]);
          // console.log(keys); // retourne chaque key du tableau  ==> ["MARQUE"] ["TAILLE"] ["ETAT"] ["COULEUR"] ["EMPLACEMENT"]
          return (
            <p key={index}>
              {keys[0]} {list[keys[0]]}
            </p>
          ); // Je retourne le 1er élément de l'objet
        })}
      </span>
      <div>
        {data.product_name}
        {data.product_description}
        <div className="offer-avatar">
          <img
            src={data.owner.account.avatar.secure_url}
            alt={data.owner.account.username}
          />
          <span>{data.owner.account.username}</span>
        </div>
        <button>Acheter</button>
      </div>
    </div>
  );
};

export default Offer;
