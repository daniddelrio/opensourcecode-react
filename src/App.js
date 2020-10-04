import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Navigation from "./components/Navigation";
import history from './history'

import StudentPage from "./views/StudentPage";

export default function App() {
  return (
    <Router history={history}>
      <Navigation />
      <Switch>
        <Route path="/" exact component={StudentPage} />
      </Switch>
    </Router>
  );
}
