import React, { useState } from "react";
import axios from "axios";
import { Redirect, useHistory } from "react-router-dom";

const Publish = ({ token }) => {
  const history = useHistory();

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
  const [preview, setPreview] = useState("");

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
        "https://vinted-backend-v1.herokuapp.com/offer/publish",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // console.log(response.data);
      // Vérifier si l'annonce existe
      if (response.data._id) {
        alert("Annonce créée!");
        // si oui, affichage de l'annonce
        history.push(`/offer/${response.data._id}`);
      } else {
        alert("Une erreur est survenue, veuillez réssayer");
      }
    } catch (error) {
      console.log(error.response); // pour obtenir le message provenant du backend
    }
  };

  return token ? (
    <div className="publish-wrapper">
      <div className="publish-container">
        <h2>Vends ton article</h2>

        <form onSubmit={handleSubmit}>
          <div className="file-select">
            {preview ? (
              <div className="dashed-preview-image">
                <img src={preview} alt="pré-visualisation" />
                <div
                  className="remove-img-button"
                  onClick={() => {
                    setPreview("");
                  }}
                >
                  X
                </div>
              </div>
            ) : (
              <div className="file-select-dashed">
                <div className="file-select-add">
                  <label htmlFor="file" className="label-file">
                    <span className="file-sign">+</span>
                    <span>Ajoute une photo</span>
                  </label>

                  <input
                    type="file"
                    id="file"
                    className="file-add"
                    onChange={(event) => {
                      //   console.log(event);
                      //   console.log(event.target.files);
                      setFile(event.target.files[0]);
                      setPreview(URL.createObjectURL(event.target.files[0]));
                    }}
                  />
                </div>
              </div>
            )}
          </div>

          <div className="publish-detail-wrapper">
            <div className="detail-input">
              <h3>Titre</h3>
              <input
                type="text"
                value={title}
                placeholder="ex : Sac Céline bleu"
                onChange={(event) => {
                  setTitle(event.target.value);
                }}
              />
            </div>
            <div className="detail-input">
              <h3>Décris ton article</h3>
              <textarea
                value={description}
                name="description"
                placeholder="ex : neuf"
                cols="30"
                rows="5"
                onChange={(event) => {
                  setDescription(event.target.value);
                }}
              />
            </div>
          </div>
          <div className="publish-detail-wrapper">
            <div className="detail-input">
              <h3>Marque</h3>
              <input
                type="text"
                value={brand}
                placeholder="ex : Céline"
                onChange={(event) => {
                  setBrand(event.target.value);
                }}
              />
            </div>
            <div className="detail-input">
              <h3>Taille</h3>
              <input
                type="text"
                value={size}
                placeholder="ex : M / 38 / 10"
                onChange={(event) => {
                  setSize(event.target.value);
                }}
              />
            </div>
            <div className="detail-input">
              <h3>Couleur</h3>
              <input
                type="text"
                value={color}
                placeholder="ex : Fuschia"
                onChange={(event) => {
                  setColor(event.target.value);
                }}
              />
            </div>
            <div className="detail-input">
              <h3>Etat</h3>
              <input
                type="text"
                value={condition}
                placeholder="ex : Neuf avec étiquette"
                onChange={(event) => {
                  setCondition(event.target.value);
                }}
              />
            </div>
            <div className="detail-input">
              <h3>Lieu</h3>
              <input
                type="text"
                value={city}
                placeholder="ex : Brétigny"
                onChange={(event) => {
                  setCity(event.target.value);
                }}
              />
            </div>
          </div>
          <div className="publish-detail-wrapper">
            <div className="detail-input">
              <h3>Prix</h3>
              <div className="checkbox-section">
                <input
                  type="text"
                  value={price}
                  placeholder="0,00 €"
                  onChange={(event) => {
                    setPrice(event.target.value);
                  }}
                />
                <div className="checkbox-input">
                  <input
                    type="checkbox"
                    name="exchange"
                    id="exchange"
                    value={exchange}
                    onChange={(event) => {
                      setExchange(!exchange);
                    }}
                  />
                  <span>Je suis intéressé(e) par les échanges</span>
                </div>
              </div>
            </div>
          </div>
          <div className="publish-button">
            <button className="publish-validation" type="submit">
              Ajouter
            </button>
          </div>
        </form>
      </div>
    </div>
  ) : (
    <Redirect to={{ pathname: "/login", state: { fromPublish: true } }} />
  );
};

export default Publish;
