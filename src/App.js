import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./containers/Home";
import Offer from "./containers/Offer";

function App() {
  const [data, setData] = useState({}); // Permet de gérer les données
  const [isLoading, setIsLoading] = useState(true); // Permet de gérer le fait que l'objet soit vide au chargement du composant

  const fectData = async () => {
    try {
      // A terme, je devrai mettre le lien de mon URL pour le backend
      const response = await axios.get(
        "https://lereacteur-vinted-api.herokuapp.com/offers"
      );
      // console.log(response.data); // Je vérifie que je récupère les données du backend qui est un objet
      setData(response.data);
      setIsLoading(false); // il faut passe ce state à false afin que la passe ne se charge pas indéfiniment
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
    <Router>
      <div>
        <Switch>
          <Route path="/offer">
            <Offer />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
