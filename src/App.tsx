import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import window from "./cordova";
import { Header } from "./components";
import { Home, Todo } from "./pages";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/todo/:id" exact>
          <Todo />
        </Route>
        <Route path="/" exact>
          <Header />
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
