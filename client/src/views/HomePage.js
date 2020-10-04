import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

class HomePage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container>
        <Row>
          <Col>
            <div class="home-main">
              <h3>Do you want to view the <strong>students</strong>?</h3>
              <Link to="/students">
                <Button variant="primary">
                  View Student Page
                </Button>
              </Link>
            </div>
          </Col>
          <Col>
            <div class="home-main">
              <h3>Do you want to view the <strong>teachers</strong>?</h3>
              <Link to="/students">
                <Button variant="primary">
                  View Teacher Page
                </Button>
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default HomePage;
