import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState } from "react";
import axios from "axios";

const CheckoutForm = () => {
  const [accept, setAccept] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Stripe récupère les données bancaires indiquées par le user
      const cardElement = elements.getElement(CardElement);

      // Demander la création d'un token via l'API Stripe
      const stripeResponse = await stripe.createToken(cardElement, {
        name: "l'id de l'acheteur",
      });
      console.log(stripeResponse);
      //Réception du token retourné au client
      const stripeToken = stripeResponse.token.id;

      // Requête vers notre serveur
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/payment",
        {
          stripeToken: stripeToken,
          //   amount: product_price, // A vérifier
          //   title: product_name, // A vérifier
        }
      );
      console.log(response.data);
      if (response.data) {
        setAccept(true);
      } else {
        alert("Problème!!!!");
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  return accept ? (
    <span>Transaction acceptée!</span>
  ) : (
    <div>
      <div className="checkout-wrapper">
        <div className="checkout-container">
          <div className="checkout-summary">
            <h4>Résumé de la commande</h4>
            <div className="checkout-detail">
              <span>Commande = </span>
              <br />
              <span>Frais protection acheteurs = </span>
              <br />
              <span>Frais de port = </span>
              <br />
              <div className="splitter"></div>
              <span>Total = </span>
            </div>
            <div className="tobepaid">
              <p>
                Il ne vous reste plus qu'une étape pour vous offrir{" "}
                <span>[MARQUE]</span>.
              </p>
              <br />
              <p>
                Vous allez payer <span>[PRIX]</span> (frais de protection et
                frais de port inclus).
              </p>
              <div className="splitter"></div>
              <form onSubmit={handleSubmit}>
                <div className="payment-content">
                  <div className="payment-step">
                    <CardElement />
                  </div>
                </div>
                <button type="submit" className="pay-button">
                  Pay
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
