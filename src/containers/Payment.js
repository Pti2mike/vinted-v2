import React from "react";
import CheckoutForm from "../components/CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useLocation } from "react-router-dom";

const Payment = () => {
  // Utilisation de ma clé publique
  const stripePromise = loadStripe(
    "pk_test_51HoUiDEStHEdh9Uwmtq8ryyaNtdDRzO05nItlcEVMWDhfpy6qRG2HehFoLsKaU0u5Mr1J6oc36DqK2FLaPwvRlh600oLuKayp7"
  );

  // Pour récupérer l'objet provenant d'history.push() de la page Offer
  const location = useLocation();
  const {
    productName,
    totalPrice,
    protectionFees,
    shippingFees,
    price,
  } = location.state;

  return (
    <div>
      <Elements stripe={stripePromise}>
        <CheckoutForm
          productName={productName}
          shippingFees={shippingFees}
          totalPrice={totalPrice}
          protectionFees={protectionFees}
          price={price}
        />
      </Elements>
    </div>
  );
};

export default Payment;
