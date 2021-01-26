import React, { useState } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";

const Signup = ({ setUser }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();

  const handleSubmit = async (event) => {
    // console.log(event); // Je reçois bien un objet
    // alert("Submit");
    event.preventDefault();
    // Requête axios pour envoyer les données à l'API
    try {
      const response = await axios.post(
        // "https://lereacteur-vinted-api.herokuapp.com/user/signup"
        "https://vinted-backend-v1.herokuapp.com/user/signup",
        {
          username: username,
          email: email,
          password: password,
        }
      );
      console.log(response.data); // Retourne bien l'objet créé
      // On vérifie si le token est retourné dans la console
      if (response.data.token) {
        // si oui, on modifie l'état de setUser
        setUser(response.data.token);
        // puis on renvoie l'utilisateur vers la homepage
        history.push("/");
      } else {
        alert("Une erreur est survenue");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="formulaire">
      <h2>S'inscrire</h2>
      <form className="form-content" onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          placeholder="Nom d'utilisateur"
          onChange={(event) => {
            // console.log(event);
            setUsername(event.target.value);
          }}
        />
        <input
          type="email"
          value={email}
          placeholder="Email"
          onChange={(event) => {
            // console.log(event);
            setEmail(event.target.value);
          }}
        />
        <input
          type="password"
          value={password}
          placeholder="Mot de passe"
          onChange={(event) => {
            // console.log(event);
            setPassword(event.target.value);
          }}
        />
        <div className="checkbox-container">
          <div>
            <input type="checkbox" />
            <span>S'inscrire à notre newsletter</span>
          </div>
          <p>
            En m'inscrivant je confirme avoir lu et accepté les Termes &
            Conditions et Politique de Confidentialité de Vinted. Je confirme
            avoir au moins 18 ans.
          </p>
        </div>
        <button type="submit">S'inscrire</button>

        <Link to="/login">Tu as déjà un compte ? Connecte-toi !</Link>
      </form>
    </div>
  );
};

export default Signup;
