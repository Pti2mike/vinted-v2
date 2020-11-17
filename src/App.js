import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./containers/Home";
import Offer from "./containers/Offer";
import Signup from "./containers/Signup";
import Login from "./containers/Login";
import Publish from "./containers/Publish";
import Payment from "./containers/Payment";
import Header from "./components/Header";
import Cookie from "js-cookie";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
library.add(faSearch);

function App() {
  const [token, setToken] = useState(Cookie.get("userToken") || null);

  const setUser = (tokenToSet) => {
    // est-ce que tokenToSet existe?
    if (tokenToSet) {
      // Créer un cookie
      Cookie.set("userToken", tokenToSet);
      // Je change l'état
      setToken(tokenToSet);
    } else {
      // Supprimer le cookie
      Cookie.remove("userToken");
      // Repasse l'état du token à null
      setToken(null);
    }
  };

  return (
    <div>
      <Router>
        <Header token={token} setUser={setUser} />
        <Switch>
          <Route path="/offer/:id">
            <Offer />
          </Route>
          <Route path="/signup">
            <Signup setUser={setUser} />
          </Route>
          <Route path="/login">
            <Login setUser={setUser} />
          </Route>
          <Route path="/publish">
            <Publish token={token} />
          </Route>
          <Route path="/payment">
            <Payment token={token} />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
