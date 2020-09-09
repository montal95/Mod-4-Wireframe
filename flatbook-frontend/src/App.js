import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import New from "./pages/New";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path="/notes" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/new" component={New} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
