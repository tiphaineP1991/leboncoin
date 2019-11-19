import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

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
            try {
              const response = await axios.post(
                "https://leboncoin-api.herokuapp.com/api/user/log_in",
                {
                  email: email,
                  password: password
                }
              );
              console.log("data", response.data);
              if (response.data.token) {
                Cookies.set("token", response.data.token);
                history.push("/offers");
                setShowModal(false);
                props.setUser(response.data);
              } else {
                alert("An eror occured");
              }
            } catch (error) {
              alert(error.message);
            }
          }}
        >
          <div className="logInInput">
            <h2>Adresse email</h2>
            <input
              type="email"
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
