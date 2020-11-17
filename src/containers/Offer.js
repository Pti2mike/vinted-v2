import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";

const Offer = () => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/offer/${id}`
        );
        // console.log(response.data); // Retourne l'objet renseigné dans :id
        setData(response.data);
        setIsLoading(false); //il faut passer ce state à false afin que la page ne se charge pas indéfiniment
      } catch (error) {
        console.log(error.message);
      }
    };
    // permet de charger les données une fois au chargement du composant
    fetchData(); // J'appelle la fonction fetchData qui va appeler le serveur
  }, [id]);

  return isLoading ? (
    <span>Loading...</span>
  ) : (
    <div className="offer-wrapper">
      <div>
        <div className="offer-item">
          <div className="offer-imgs">
            {/* {data.product_pictures[0]} ? (
            <img
              className="offer-img"
              src={data.product_pictures[0].secure_url}
              alt={data.product_name}
            />
            ) : ( */}
            <img
              className="offer-img"
              src={data.product_image.secure_url}
              alt={data.product_name}
            />
            {/* )} */}
          </div>
          <div className="offer-detail">
            <span>{data.product_price}€</span>
            <span>
              <p></p>
              {data.product_details.map((list, index) => {
                const keys = Object.keys(list);
                // console.log(list[keys]);
                // console.log(keys); // retourne chaque key du tableau  ==> ["MARQUE"] ["TAILLE"] ["ETAT"] ["COULEUR"] ["EMPLACEMENT"]
                return (
                  <p key={index}>
                    <span>{keys[0]} : </span>
                    <span>{list[keys[0]]}</span>
                  </p>
                ); // Je retourne le 1er élément de l'objet
              })}
            </span>
            <div className="split"></div>
            <div className="offer-user">
              <span>{data.product_name}</span>
              <span>{data.product_description}</span>

              <div className="offer-avatar">
                {data.owner.account.avatar ? (
                  <>
                    <img
                      src={data.owner.account.avatar.secure_url}
                      alt={data.owner.account.username}
                    />
                    <p>{data.owner.account.username}</p>
                  </>
                ) : (
                  <p>{data.owner.account.username}</p>
                )}
              </div>
              <button
                className="offer-buy"
                onClick={() => {
                  history.push("/payment");
                }}
              >
                Acheter
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Offer;
