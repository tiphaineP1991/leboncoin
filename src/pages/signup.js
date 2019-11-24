import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";

const Signup = props => {
  const [pseudo, setPseudo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verifiedPassword, setVerifiedPassword] = useState("");
  const [isCheck, setIsCheck] = useState(false);
  const [isErrorMessageDisplay, setIsErrorMessageDisplay] = useState(false);

  const history = useHistory();

  let disable = false;
  if (
    isCheck === true &&
    password === verifiedPassword &&
    pseudo &&
    email &&
    password &&
    verifiedPassword
  ) {
    disable = true;
  }

  console.log(isCheck);

  return (
    <div className="signUp">
      <div className="why">
        <h1>Pourquoi créer un compte?</h1>
        <div className="whypara">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100"
            height="100"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#4183D7"
            stroke-width="1"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
          </svg>
          <div className="whyparatext">
            <h2>Gagnez du temps</h2>
            <p>
              Publiez vos annonces rapidement, avec vos informations
              pré-remplies chaque fois que vous souhaitez déposer une nouvelle
              annonce.
            </p>
          </div>
        </div>
        <div className="whypara">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="80"
            height="80"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#4183D7"
            stroke-width="1"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M22 17H2a3 3 0 0 0 3-3V9a7 7 0 0 1 14 0v5a3 3 0 0 0 3 3zm-8.27 4a2 2 0 0 1-3.46 0"></path>
          </svg>
          <div className="whyparatext">
            <h2>Soyez les premiers informés</h2>
            <p>
              Créez des alertes Immo ou Emploi et ne manquez jamais l’annonce
              qui vous intéresse.
            </p>
          </div>
        </div>
        <div className="whypara">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100"
            height="100"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#4183D7"
            stroke-width="1"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
            <circle cx="12" cy="12" r="3"></circle>
          </svg>
          <div className="whyparatext">
            <h2>Visibilité</h2>
            <p>
              Suivez les statistiques de vos annonces (nombre de fois où votre
              annonce a été vue, nombre de contacts reçus).
            </p>
          </div>
        </div>
      </div>
      <div className="createIncart">
        <h1>Créer son compte</h1>
        <form
          onSubmit={async event => {
            event.preventDefault();

            if (password !== verifiedPassword) {
              return alert("les mots de passe doivent être similaires");
            } else if (isCheck === false) {
              return alert("Vous devez accepter les CGU");
            } else {
              const response = await axios.post(
                "http://localhost:4000/signup",
                {
                  email: email,
                  username: pseudo,
                  password: password
                }
              );
              Cookies.set("token", response.data.token);
              props.setUser(response.data);
              history.push("/offers");
              console.log("data", response.data);
            }
          }}
        >
          <div className="logInInput">
            <h2>Pseudo*</h2>
            <input
              required
              type="text"
              name="pseudo"
              value={pseudo}
              onChange={event => {
                setPseudo(event.target.value);
              }}
            ></input>
          </div>
          <div className="logInInput">
            <h2>Adresse email*</h2>
            <input
              required
              type="email"
              name="email"
              value={email}
              onChange={event => {
                setEmail(event.target.value);
              }}
            ></input>
          </div>
          <div className="motdepasse">
            <div className="logInInput">
              <h2>Mot de passe*</h2>
              <input
                required
                type="password"
                name="password"
                value={password}
                onChange={event => {
                  setPassword(event.target.value);
                }}
              ></input>
            </div>
            <div className="logInInput">
              <h2>Confirmer le mot de passe*</h2>
              <input
                onBlur={() => {
                  setIsErrorMessageDisplay(true);
                }}
                onFocus={() => {
                  setIsErrorMessageDisplay(false);
                }}
                required
                type="password"
                name="verifiedPassword"
                value={verifiedPassword}
                onChange={event => {
                  setVerifiedPassword(event.target.value);
                }}
              ></input>
            </div>
          </div>
          {password !== verifiedPassword && isErrorMessageDisplay === true && (
            <div className="errorPassword">
              Les mots de passe doivent être identiques
            </div>
          )}
          <div>
            <input
              type="checkbox"
              id="conditions"
              name="conditions"
              value={isCheck}
              onChange={event => setIsCheck(event.target.checked)}
            ></input>
            <label className="labelconditions" for="conditions">
              « J’accepte les Conditions Générales de Vente et les Conditions
              Générales d’Utilisation»
            </label>
          </div>

          <input
            type="submit"
            value="Créer mon compte"
            className={disable === true ? "activate" : "disable"}
          ></input>
        </form>
      </div>
    </div>
  );
};

export default Signup;
