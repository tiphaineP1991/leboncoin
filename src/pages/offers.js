import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
// import moment from "moment";
// import "moment/locale/fr";

const Offers = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);

  const fetchData = async () => {
    const response = await axios.get(
      "https://leboncoin-api.herokuapp.com/api/offer/with-count"
    );
    setProducts(response.data.offers);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="page">
      <div className="search">
        <div className="input">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="grey"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input type="text" placeholder="Que recherchez-vous ?"></input>
        </div>
        <button>Rechercher</button>
      </div>
      <div className="search-results">
        {isLoading === true ? (
          <p>En cours de chargement</p>
        ) : (
          <div className="list-products">
            {products.map(product => {
              return (
                <div className="product">
                  <img
                    className="product-image"
                    src={product.pictures[0]}
                  ></img>
                  <div className="product-details">
                    <h1>{product.title}</h1>
                    <h2>{product.price}€</h2>
                    <h3>{product.created}</h3>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Offers;

//<Link to={"/offer/" + product._id}></Link>
