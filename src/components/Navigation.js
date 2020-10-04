import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

class Navigation extends React.Component {
  render() {
    return (
      <Navbar bg="light" variant="light">
        <Navbar.Brand href="#home">School Database</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#features">Students</Nav.Link>
          <Nav.Link href="#pricing">Teachers</Nav.Link>
        </Nav>
      </Navbar>
    );
  }
}

export default Navigation;
