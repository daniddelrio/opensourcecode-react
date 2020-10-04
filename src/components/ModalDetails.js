import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

class TableList extends React.Component {
  render() {
    return (
      <Modal show={this.props.isModalShowing} onHide={this.props.closeModal}>
        <Form>
          <Modal.Header closeButton>
            <Modal.Title>{this.props.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {this.props.headers.map((header) => (
              <Form.Group controlId={header.name}>
                <Form.Label>{header.name}</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={`Enter ${header.name}`}
                />
              </Form.Group>
            ))}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.props.closeModal}>
              Close
            </Button>
            <Button
              variant="primary"
              type="submit"
              onClick={this.props.closeModal}
            >
              Submit
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    );
  }
}

export default TableList;
