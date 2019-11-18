import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./reset.css";
import "./App.css";
import Offer from "./pages/offer";
import Offers from "./pages/offers";
import Signup from "./pages/signup";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Cookies from "js-cookie";
import Modal from "./components/Modal";

function App() {
  const [showModal, setShowModal] = useState(false);

  function updateToken(token) {
    console.log("token", token);
    Cookies.set("token", token);
  }

  return (
    <Router>
      <div className="App">
        <header className="header"></header>
        {showModal === true && <Modal setShowModal={setShowModal}></Modal>}
        <div className="wrapper">
          <Header event={() => setShowModal(true)}></Header>
          <Switch>
            <Route path="/offers">
              <Offers />
            </Route>
            <Route path="/offer/:id">
              <Offer />
            </Route>
            <Route path="/signup">
              <Signup updateToken={updateToken} />
            </Route>
          </Switch>
        </div>
        <Footer></Footer>
      </div>
    </Router>
  );
}

export default App;
