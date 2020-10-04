import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import history from './history'

export default function App() {
  return (
    <Router history={history}>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/register" exact component={Register} />
          <Route path="/login" exact component={Login} />
          <Route path="/verify_email" exact component={VerifyEmail} />
          <Route path="/activate/:uidb64/:token" exact component={VerifyToken} />
          <Route path="/details" exact component={Details} />
        </Switch>
    </Router>
  );
}
