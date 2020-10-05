import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";

class Navigation extends React.Component {
  render() {
    return (
      <Navbar bg="light" variant="light" expand="lg">
        <Navbar.Brand>
          <Link to="/">School Database</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link>
              <Link to="/">Home</Link>
            </Nav.Link>
            <Nav.Link>
              <Link to="/students">Students</Link>
            </Nav.Link>
            <Nav.Link>
              <Link to="/teachers">Teachers</Link>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Navigation;
