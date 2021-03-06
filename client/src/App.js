import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Navigation from "./components/Navigation";
import history from './history'

import StudentPage from "./views/StudentPage";
import TeacherPage from "./views/TeacherPage";
import HomePage from "./views/HomePage";

export default function App() {
  return (
    <Router history={history}>
      <Navigation />
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/students" exact component={StudentPage} />
        <Route path="/teachers" exact component={TeacherPage} />
      </Switch>
    </Router>
  );
}
