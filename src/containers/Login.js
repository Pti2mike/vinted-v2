import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Login = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();

  const handleSubmit = async (event) => {
    // console.log(event);
    // alert("Connected");
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/login",
        {
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
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-content">
          <input
            type="email"
            placeholder="Email"
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
          <input
            type="password"
            placeholder="Mot de passe"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
          <input type="submit" value="Se connecter" />
        </div>
      </form>
    </div>
  );
};

export default Login;
