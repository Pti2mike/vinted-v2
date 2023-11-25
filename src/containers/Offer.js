import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import Loader from "react-loader-spinner";

const Offer = () => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();
  const history = useHistory();

  const price = Number(data.product_price).toFixed(2);
  const protectionFees = (price / 10).toFixed(2);
  const shippingFees = (protectionFees * 2).toFixed(2);
  const total = Number(price) + Number(protectionFees) + Number(shippingFees);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://vinted-backend-v1.vercel.app/offer/${id}`
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
    <div className="loader">
      <Loader type="Puff" color="#2cb1ba" height={100} width={100} />
    </div>
  ) : (
    <div className="offer-container">
      <div className="offer-wrapper">
        <div>
          <div className="offer-item">
            <div className="offer-imgs">
              <img
                className="offer-img"
                src={data.product_image.secure_url}
                alt={data.product_name}
              />
            </div>
            <div className="offer-detail">
              <span>{data.product_price.toFixed(2)} €</span>
              <div>
                {data.product_details.map((list, index) => {
                  const keys = Object.keys(list);
                  // console.log(list[keys]);
                  // console.log(keys); // retourne chaque key du tableau  ==> ["MARQUE"] ["TAILLE"] ["ETAT"] ["COULEUR"] ["EMPLACEMENT"]
                  return (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <span style={{ color: "lightgrey" }}>{keys[0]} : </span>
                      <span>{list[keys[0]]}</span>
                    </div>
                  ); // Je retourne le 1er élément de l'objet
                })}
              </div>
              <div className="split"></div>
              <div className="offer-user">
                <span>{data.product_name}</span>
                <span>{data.product_description}</span>

                <div className="offer-avatar">
                  {data.owner && data.owner.account.avatar ? (
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
                    history.push({
                      pathname: "/payment",
                      state: {
                        productName: data.product_name,
                        totalPrice: total,
                        protectionFees: protectionFees,
                        shippingFees: shippingFees,
                        price: data.product_price,
                      },
                    });
                  }}
                >
                  Acheter
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Offer;
