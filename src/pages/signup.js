import React, { useState } from "react";
import axios from "axios";

const Signup = ({ updateToken }) => {
  const [pseudo, setPseudo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="signUp">
      <div className="why">
        <h1>Pourquoi créer un compte?</h1>
      </div>
      <div className="createIncart">
        <h1>Créer son compte</h1>
        <form
          onSubmit={async event => {
            event.preventDefault();
            const response = await axios.post(
              "https://leboncoin-api.herokuapp.com/api/user/sign_up",
              {
                email: email,
                username: pseudo,
                password: password
              }
            );
            console.log(response.data);
            updateToken(response.data.token);
          }}
        >
          <div className="logInInput">
            <h2>Pseudo</h2>
            <input
              type="text"
              name="pseudo"
              value={pseudo}
              onChange={event => {
                setPseudo(event.target.value);
              }}
            ></input>
          </div>
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
              name="password"
              value={password}
              onChange={event => {
                setPassword(event.target.value);
              }}
            ></input>
          </div>
          <input
            type="submit"
            className="logInButton"
            value="Créer mon compte"
          ></input>
        </form>
      </div>
    </div>
  );
};

export default Signup;
