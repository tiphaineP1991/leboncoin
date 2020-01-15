import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import "moment/locale/fr";
import url from "../url";

const Offer = () => {
  const { id } = useParams();
  console.log(id);

  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState([]);

  const fetchData = async () => {
    const response = await axios.get(url.url + "/offer/" + id);
    setProduct(response.data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  //J'importe ma fonction pour convertir le format de la date
  const dateCreated = new Date(product.created);
  const date =
    dateCreated.toLocaleDateString() + " à " + dateCreated.toLocaleTimeString();

  return (
    <div>
      {isLoading === true ? (
        "chargement en cours"
      ) : (
        <div className="offer-page-content">
          <div className="block-product">
            <div className="cart-product">
              <img src={product.files[0]}></img>
              <div className="product-details">
                <h1>{product.title}</h1>
                <h2>{product.price}€</h2>
                <h3>{date}</h3>
              </div>
            </div>
            <div className="product-description">
              <h4>Description</h4>
              <p>{product.description}</p>
            </div>
          </div>
          <div className="block-user">
            <div className="info-user">
              <h4>{product.user.account.username}</h4>
              <h5>17 annonces en ligne</h5>
            </div>
            <div className="block-button">
              <button className="product-buy">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <circle cx="10" cy="20.5" r="1" />
                  <circle cx="18" cy="20.5" r="1" />
                  <path d="M2.5 2.5h3l2.7 12.4a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.6l1.6-8.4H7.1" />
                </svg>
                <p>Acheter</p>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Offer;
