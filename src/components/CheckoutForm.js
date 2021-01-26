import React, { useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";

const CheckoutForm = ({
  productName,
  totalPrice,
  protectionFees,
  shippingFees,
  price,
}) => {
  const [accept, setAccept] = useState(false);

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Stripe récupère les données bancaires indiquées par le user
      const cardElement = elements.getElement(CardElement);

      // Demander la création d'un token via l'API Stripe
      // en envoyant des données bancaires
      const stripeResponse = await stripe.createToken(cardElement, {
        name: "l'id de l'acheteur",
      });
      // console.log(stripeResponse);
      //Réception du token retourné au client
      const stripeToken = stripeResponse.token.id;

      // Requête vers notre serveur dans laquelle on envoie le token reçu
      const response = await axios.post(
        "https://vinted-backend-v1.herokuapp.com/payment",
        {
          stripeToken: stripeToken,
          amount: totalPrice,
          title: productName,
        }
      );
      console.log(response.data);
      if (response.data.status === "succeeded") {
        setAccept(true);
      } else {
        alert("Problème!!!!");
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <div>
      {accept ? (
        <span>Transaction acceptée!</span>
      ) : (
        <div>
          <div className="checkout-wrapper">
            <div className="checkout-container">
              <div className="checkout-summary">
                <h4>Résumé de la commande</h4>
                <div className="checkout-detail">
                  <span>Commande = {price.toFixed(2)} €</span>
                  <br />
                  <span>Frais protection acheteurs = {protectionFees} €</span>
                  <br />
                  <span>Frais de port = {shippingFees} €</span>
                  <br />
                  <div className="splitter"></div>
                  <span>Total = {totalPrice} €</span>
                </div>
                <div className="tobepaid">
                  <p>
                    Il ne vous reste plus qu'une étape pour vous offrir{" "}
                    <span>{productName}</span>.
                  </p>
                  <br />
                  <p>
                    Vous allez payer <span>{totalPrice} €</span> (frais de
                    protection et frais de port inclus).
                  </p>
                  <div className="splitter"></div>
                  <form onSubmit={handleSubmit}>
                    <div className="payment-content">
                      <div className="payment-step">
                        <CardElement />
                      </div>
                    </div>
                    <button type="submit" className="pay-button">
                      Payez !
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutForm;
