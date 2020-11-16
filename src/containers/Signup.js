import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

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
        "https://lereacteur-vinted-api.herokuapp.com/user/signup",
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
          <Link to="/login">Tu as déjà un compte ? Connecte-toi !</Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;
