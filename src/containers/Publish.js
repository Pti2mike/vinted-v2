import React, { useState } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

const Publish = ({ token }) => {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState({});
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [condition, setCondition] = useState("");
  const [city, setCity] = useState("");
  const [price, setPrice] = useState("");
  const [exchange, setExchange] = useState(false);

  const formData = new FormData();
  formData.append("picture", file);
  formData.append("title", title);
  formData.append("description", description);
  formData.append("brand", brand);
  formData.append("size", size);
  formData.append("color", color);
  formData.append("condition", condition);
  formData.append("city", city);
  formData.append("price", price);

  //   console.log(formData);

  const handleSubmit = async (event) => {
    // console.log(event);
    event.preventDefault();
    // Requête axios pour envoyer les données à l'API
    try {
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/offer/publish",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      // Vérifier si l'annonce existe
      if (response.data._id) {
        alert("Annonce créée!");
      }
      // Retourner l'annonce sinon un alert
    } catch (error) {
      console.log(error.response); // pour obtenir le message provenant du backend
    }
  };

  return token ? (
    <div className="publish-wrapper">
      <div>
        <h2>Vends ton article</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <div>
            <div>
              <span>Ajoute une photo</span>
              <input
                type="file"
                id="file"
                onChange={(event) => {
                  //   console.log(event);
                  //   console.log(event.target.files);
                  setFile(event.target.files[0]);
                }}
              />
            </div>
          </div>
        </div>
        <div>
          <div className="publish-title">
            <h3>Titre</h3>
            <input
              type="text"
              value={title}
              placeholder="ex : Sac Céline bleu"
              onChange={(event) => {
                // console.log(event);
                setTitle(event.target.value);
              }}
            />
          </div>
          <div>
            <h3>Décris ton article</h3>
            <textarea
              value={description}
              name="description"
              placeholder="ex : neuf"
              cols="30"
              rows="5"
              onChange={(event) => {
                // console.log(event);
                setDescription(event.target.value);
              }}
            />
          </div>
        </div>
        <div>
          <div>
            <h3>Marque</h3>
            <input
              type="text"
              value={brand}
              placeholder="ex : Céline"
              onChange={(event) => {
                // console.log(event);
                setBrand(event.target.value);
              }}
            />
          </div>
          <div>
            <h3>Taille</h3>
            <input
              type="text"
              value={size}
              placeholder="ex : M / 38 / 10"
              onChange={(event) => {
                // console.log(event);
                setSize(event.target.value);
              }}
            />
          </div>
          <div>
            <h3>Couleur</h3>
            <input
              type="text"
              value={color}
              placeholder="ex : Fuschia"
              onChange={(event) => {
                // console.log(event);
                setColor(event.target.value);
              }}
            />
          </div>
          <div>
            <h3>Etat</h3>
            <input
              type="text"
              value={condition}
              placeholder="ex : Neuf avec étiquette"
              onChange={(event) => {
                // console.log(event);
                setCondition(event.target.value);
              }}
            />
          </div>
          <div>
            <h3>Lieu</h3>
            <input
              type="text"
              value={city}
              placeholder="ex : Brétigny"
              onChange={(event) => {
                console.log(event);
                setCity(event.target.value);
              }}
            />
          </div>
        </div>
        <div>
          <div>
            <h3>Prix</h3>
            <input
              type="number"
              value={price}
              placeholder="0,00 €"
              onChange={(event) => {
                // console.log(event);
                setPrice(event.target.value);
              }}
            />
          </div>
          <input
            type="checkbox"
            name=""
            id=""
            onChange={(event) => {
              //   console.log(event);
              setExchange(!exchange);
            }}
          />
          <span>Je suis intéressé(e) par les échanges</span>
        </div>
        <div>
          <button type="submit">Ajouter</button>
        </div>
      </form>
    </div>
  ) : (
    <Redirect to={{ pathname: "/login", state: { fromPublish: true } }} />
  );
};

export default Publish;
