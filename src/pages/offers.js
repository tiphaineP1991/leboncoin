import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import moment from "moment";
import "moment/locale/fr";

const Offers = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [count, setCount] = useState();
  const [searchTitle, setSearchTitle] = useState("");
  const [searchMaxPrice, setSearchMaxPrice] = useState(null);
  const [searchMinPrice, setSearchMinPrice] = useState(null);

  const tab = [];
  const limit = 10;

  let search = "";
  if (searchTitle) {
    search = "title=" + searchTitle;
  }
  if (searchMaxPrice) {
    if (search.length > 0) {
      search = search + "&priceMax=" + searchMaxPrice;
    } else {
      search = "priceMax=" + searchMaxPrice;
    }
  }
  if (searchMinPrice) {
    if (search.length > 0) {
      search = search + "&priceMin=" + searchMinPrice;
    } else {
      search = "priceMin=" + searchMinPrice;
    }
  }

  const fetchData = async () => {
    const response = await axios.get(
      "https://leboncoin-api.herokuapp.com/api/offer/with-count?skip=" +
        page +
        "&limit=" +
        limit
    );
    setProducts(response.data.offers);
    setCount(response.data.count);

    setIsLoading(false);
  };

  for (let i = 0; i < count / limit; i++) {
    tab.push(i + 1);
  }

  useEffect(() => {
    fetchData();
  }, [page]);

  return (
    <div className="page">
      <div className="ellipse"></div>
      <form
        className="search"
        onSubmit={async event => {
          event.preventDefault();
          const response = await axios.get(
            "https://leboncoin-api.herokuapp.com/api/offer/with-count?" + search
          );
          setCount(response.data.count);
          setProducts(response.data.offers);
        }}
      >
        <div className="input-searchtitle">
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
          <input
            type="text"
            placeholder="Que recherchez-vous ?"
            value={searchTitle}
            onChange={event => setSearchTitle(event.target.value)}
          ></input>
        </div>
        <div className="input-searchnumber">
          <input
            type="Number"
            placeholder="Prix min"
            value={searchMinPrice}
            onChange={event => setSearchMinPrice(event.target.value)}
          ></input>
        </div>
        <div className="input-searchnumber">
          <input
            type="Number"
            placeholder="Prix max"
            value={searchMaxPrice}
            onChange={event => setSearchMaxPrice(event.target.value)}
          ></input>
        </div>

        <button>Rechercher</button>
      </form>
      <div className="search-results">
        {isLoading === true ? (
          <p>En cours de chargement</p>
        ) : (
          <div className="list-products">
            {products.map(product => {
              const dateCreated = new Date(product.created);
              const date =
                dateCreated.toLocaleDateString() +
                " à " +
                dateCreated.toLocaleTimeString();
              return (
                <Link className="product" to={"/offer/" + product._id}>
                  <>
                    <img
                      className="product-image"
                      src={product.pictures[0]}
                    ></img>
                    <div className="product-details">
                      <h1>{product.title}</h1>
                      <h2>{product.price}€</h2>
                      <h3>{date}</h3>
                    </div>
                  </>
                </Link>
              );
            })}
          </div>
        )}
      </div>
      <div className="boutons">
        {tab.map(pages => {
          return (
            <button
              className="bouton"
              onClick={() => {
                setPage(pages * limit - limit);
              }}
            >
              {pages}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Offers;
