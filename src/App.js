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
import Publish from "./pages/publish";

function App() {
  const token = Cookies.get("token");
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState({ token: token });

  return (
    <Router>
      <div className="App">
        <header className="header"></header>
        {showModal === true && (
          <Modal setShowModal={setShowModal} setUser={setUser}></Modal>
        )}
        <div className="wrapper">
          <Header
            event={() => setShowModal(true)}
            user={user}
            setUser={setUser}
          ></Header>
          <Switch>
            <Route path="/offer/:id">
              <Offer />
            </Route>
            <Route path="/signup">
              <Signup setUser={setUser} />
            </Route>
            <Route path="/publish">
              <Publish user={user.token} setShowModal={setShowModal} />
            </Route>
            <Route path="/">
              <Offers />
            </Route>
          </Switch>
        </div>
        <Footer></Footer>
      </div>
    </Router>
  );
}

export default App;
