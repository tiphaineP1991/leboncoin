import React, { useState, useEffect } from "react";
import Logo from "../images/Logo.png";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

const Header = props => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="header-content">
      <div className="content-left">
        <Link to="/offers/">
          <img className="logo" alt="logo" src={Logo}></img>
        </Link>
        <Link to="/publish/">
          <button className="publish-button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M3 3h18v18H3zM12 8v8m-4-4h8" />
            </svg>
            <p>Déposer une annonce</p>
          </button>
        </Link>
        <Link to="/offers/">
          <button
            className={
              isActive === false ? "search-button" : "search-button-underline"
            }
            onClick={() => {
              setIsActive(true);
              console.log(isActive);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="black"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <p>Recherche</p>
          </button>
        </Link>
      </div>
      {props.user.token ? (
        <button
          className="connection-button"
          onClick={() => {
            props.setUser({});
            Cookies.remove("token");
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="black"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
          <p>Se déconnecter</p>
        </button>
      ) : (
        <button className="connection-button" onClick={props.event}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="black"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
          <p>Se connecter</p>
        </button>
      )}
    </div>
  );
};
export default Header;
