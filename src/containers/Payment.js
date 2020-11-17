import React from "react";
import CheckoutForm from "../components/CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const Payment = () => {
  // Utilisation de la clé publique du Réacteur
  const stripePromise = loadStripe("pk_test_5z9rSB8XwuAOihoBixCMfL6X");

  return (
    <div>
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </div>
  );
};

export default Payment;
