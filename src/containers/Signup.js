import React, { useState } from "react";
import axios from "axios";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    // console.log(event); // Je reçois bien un objet
    // alert("Submit");
    event.preventDefault();
    // Requête axios pour envoyer les données à l'API
    try {
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/signup",
        {
          username: username,
          email: email,
          password: password,
        }
      );
      console.log(response.data); // Retourne bien l'objet créé
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="formulaire">
      <h1>S'inscrire</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-content">
          <input
            type="text"
            placeholder="Nom d'utilisateur"
            onChange={(event) => {
              // console.log(event);
              setUsername(event.target.value);
            }}
          />
          <input
            type="email"
            placeholder="Email"
            onChange={(event) => {
              // console.log(event);
              setEmail(event.target.value);
            }}
          />
          <input
            type="password"
            placeholder="Mot de passe"
            onChange={(event) => {
              // console.log(event);
              setPassword(event.target.value);
            }}
          />
          <input type="submit" value="S'inscrire" />
        </div>
      </form>
    </div>
  );
};

export default Signup;
