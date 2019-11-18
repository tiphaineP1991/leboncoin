import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

const Modal = props => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();
  const setShowModal = props.setShowModal;

  console.log(email);
  console.log(password);

  return (
    <div className="modal">
      <div className="logIncart">
        <h1>Connexion</h1>
        <form
          onSubmit={async event => {
            event.preventDefault();
            const response = await axios.post(
              "https://leboncoin-api.herokuapp.com/api/user/log_in",
              {
                email: email,
                password: password
              }
            );
            console.log(response.data);
            if (response.data === response.data) {
              history.push("/offers");
            }
            setShowModal(false);
          }}
        >
          <div className="logInInput">
            <h2>Adresse email</h2>
            <input
              type="text"
              name="email"
              value={email}
              onChange={event => {
                setEmail(event.target.value);
              }}
            ></input>
          </div>
          <div className="logInInput">
            <h2>Mot de passe</h2>
            <input
              type="password"
              value={password}
              onChange={event => {
                setPassword(event.target.value);
              }}
            ></input>
          </div>
          <input
            type="submit"
            className="logInButton"
            value="Se connecter"
          ></input>
        </form>
        <div className="borderlogin"></div>
        <h2 className="noAccount">Vous n'avez pas de compte ?</h2>
        <Link to="/signup">
          <button className="createaccount" onClick={() => setShowModal(false)}>
            Créer un compte
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Modal;
