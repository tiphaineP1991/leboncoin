import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./reset.css";
import "./App.css";
//import Header from "./components/Header";
import Offer from "./pages/offer";
import Offers from "./pages/offers";
import Header from "./components/Header";

function App() {
  return (
    <Router>
      <div className="App">
        <header className="header"></header>
        <div className="wrapper">
          <Header></Header>
          <Switch>
            <Route path="/offers">
              <Offers />
            </Route>
            <Route path="/offer/:id">
              <Offer />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
