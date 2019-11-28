import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Publish = props => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(null);
  const [photo, setPhoto] = useState();

  const history = useHistory();

  const setShowModal = props.setShowModal;

  return (
    <div className="publish-content">
      <div className="publish-cart">
        <h1>Déposer une annonce</h1>
        <form
          onSubmit={async event => {
            event.preventDefault();

            const data = new FormData();
            data.append("title", title);
            data.append("description", description);
            data.append("price", price);
            data.append("files", photo);

            if (props.user) {
              const response = await axios.post(
                "https://leboncoinapp.herokuapp.com/publish",
                data,
                {
                  headers: {
                    Authorization: "Bearer " + props.user
                  }
                }
              );
              console.log(response.data);
            } else {
              setShowModal(true);
            }
          }}
        >
          <h2>Titre de l'annonce*</h2>
          <input
            className="input-title"
            type="text"
            value={title}
            onChange={event => {
              setTitle(event.target.value);
            }}
          ></input>
          <h2>Texte de l'annonce *</h2>
          <input
            className="input-description"
            type="text"
            value={description}
            onChange={event => {
              setDescription(event.target.value);
            }}
          ></input>
          <h2>Prix*</h2>
          <div className="inputPrice">
            <input
              className="input-price"
              type="number"
              value={price}
              onChange={event => {
                setPrice(event.target.value);
              }}
            ></input>
            <p>€</p>
          </div>
          <h2>Photo*</h2>
          <input
            className="input-file"
            type="file"
            onChange={event => {
              setPhoto(event.target.files[0]);
            }}
          ></input>
          <input className="activate" type="submit" value="valider"></input>
        </form>
      </div>
    </div>
  );
};

export default Publish;
