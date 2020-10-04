import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";

class Navigation extends React.Component {
  render() {
    return (
      <Navbar bg="light" variant="light">
        <Navbar.Brand><Link to="/">School Database</Link></Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link><Link to="/">Home</Link></Nav.Link>
          <Nav.Link><Link to="/students">Students</Link></Nav.Link>
          <Nav.Link><Link to="/teachers">Teachers</Link></Nav.Link>
        </Nav>
      </Navbar>
    );
  }
}

export default Navigation;
