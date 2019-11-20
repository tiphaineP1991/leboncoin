import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import moment from "moment";
import "moment/locale/fr";

const Offers = () => {
  const [isLoading, setIsLoading] = useState(true); //Etat pour le chargement des données
  const [products, setProducts] = useState([]); // Etat pour définir la liste des produits à afficher
  const [skip, setSkip] = useState(0); // Etat pour définir le skip
  const [count, setCount] = useState(); // Etat pour définir le nombre total de résultats
  const [searchTitle, setSearchTitle] = useState(""); // Etat pour définir ce que j'écris dans l'input de recherche title
  const [searchMaxPrice, setSearchMaxPrice] = useState(null); // Etat pour définir ce que j'écris dans l'input de recherche maxPrice
  const [searchMinPrice, setSearchMinPrice] = useState(null); // Etat pour définir ce que j'écris dans l'input de recherche minPrice
  const [sort, setSort] = useState("");

  // Pour la pagination, je créée un tableau vide me permettant de stocker le nombre de pages
  // En fonction de la limit correspondant au nombre de résultats par page
  const skipTab = [];
  const limit = 10;

  const sortTab = ["", "price-desc", "price-asc", "date-desc", "date-asc"];
  const dropdown = [];
  for (let i = 0; i < sortTab.length; i++) {
    dropdown.push(<option value={sortTab[i]}>{sortTab[i]}</option>);
  }

  // Je définis une chaîne de caractère correspondant à l'url qui s'affiche en fonction de ce que j'entre dans mes critères de recherche
  let search = "";
  if (searchTitle) {
    search = "&title=" + searchTitle;
  }
  if (searchMaxPrice) {
    if (search.length > 0) {
      search = search + "&priceMax=" + searchMaxPrice;
    } else {
      search = "&priceMax=" + searchMaxPrice;
    }
  }
  if (searchMinPrice) {
    if (search.length > 0) {
      search = search + "&priceMin=" + searchMinPrice;
    } else {
      search = "&priceMin=" + searchMinPrice;
    }
  }
  if (sort) {
    if (search.length > 0) {
      search = search + "&sort=" + sort;
    } else {
      search = "&sort=" + sort;
    }
  }

  // Je définis ma recherche avec l'url concatené à mon skip, limit ainsi que search
  const fetchData = async () => {
    const response = await axios.get(
      "https://leboncoin-api.herokuapp.com/api/offer/with-count?skip=" +
        skip +
        "&limit=" +
        limit +
        search
    );

    // Je mets à jour le nombre de résultats de ma recherche pour afficher le bon nombre de pages
    // Ainsi que la valeur de product correspondant à la liste de resultats de ma recherche
    setCount(response.data.count);
    setProducts(response.data.offers);

    setIsLoading(false);
  };

  // je créé un tableau contenant le nombre de pages de ma recherche
  for (let i = 0; i < count / limit; i++) {
    skipTab.push(i + 1);
  }

  useEffect(() => {
    fetchData();
  }, [skip]);

  return (
    <div className="page">
      <div className="ellipse"></div>
      <form
        className="search"
        onSubmit={event => {
          event.preventDefault();
          fetchData();
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
        <select
          className="sort"
          onChange={event => setSort(event.target.value)}
        >
          {dropdown}
        </select>

        <button>Rechercher</button>
      </form>
      <div className="search-results">
        {isLoading === true ? (
          <p>En cours de chargement</p>
        ) : (
          <div className="list-products">
            {/* J'importe ma fonction pour convertir le format de la date */}
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
        {skipTab.map(pageNumber => {
          return (
            <button
              className="bouton"
              onClick={() => {
                setSkip(pageNumber * limit - limit);
              }}
            >
              {pageNumber}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Offers;
