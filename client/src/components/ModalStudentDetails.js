import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import {
  createStudent,
  deleteStudent,
  updateStudent,
} from "../services/students";

class ModalStudentDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      rollNumber: "",
      class: "1",
      section: "A",
    };
  }

  handleChange = (e, key) => {
    this.setState({ [key]: e.target.value });
  };

  handleAdd = async (e) => {
    e.preventDefault();
    const student = await createStudent({
      name: this.state.name,
      roll_number: this.state.rollNumber,
      class_num: this.state.class,
      section: this.state.section,
    });
    window.location.reload();
  };

  handleUpdate = async (e) => {
    e.preventDefault();
    const student = await updateStudent(this.props.data.id, {
      name: this.state.name,
      roll_number: this.state.rollNumber,
      class_num: this.state.class,
      section: this.state.section,
    });

    window.location.reload();
  };

  updateState = () => {
    this.setState({
      name: this.props.data.name,
      rollNumber: this.props.data.roll_number,
      class: this.props.data.class_num,
      section: this.props.data.section,
    });
  };

  render() {
    const data = this.props.data;
    return (
      <Modal show={this.props.isModalShowing} onHide={this.props.closeModal}>
        <Form>
          <Modal.Header closeButton>
            <Modal.Title>{this.props.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <React.Fragment>
              {this.state.message && (
                <Alert key="alert" variant="danger">
                  {this.state.message}
                </Alert>
              )}
              <Form.Group controlId="Name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Name"
                  defaultValue={data ? data.name : ""}
                  values={this.state.name}
                  onChange={(e) => this.handleChange(e, "name")}
                />
              </Form.Group>
              <Form.Group controlId="RollNumber">
                <Form.Label>Roll No.</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter Roll No."
                  defaultValue={data ? data.roll_number : ""}
                  values={this.state.rollNumber}
                  onChange={(e) => this.handleChange(e, "rollNumber")}
                />
              </Form.Group>
              <Form.Row>
                <Form.Group as={Col} controlId="Class">
                  <Form.Label>Class</Form.Label>
                  <Form.Control
                    as="select"
                    defaultValue={data ? data.class_num : ""}
                    values={this.state.class}
                    onChange={(e) => this.handleChange(e, "class")}
                  >
                    {[...Array(12).keys()]
                      .map((i) => i + 1)
                      .map((i) => (
                        <option>{i}</option>
                      ))}
                  </Form.Control>
                </Form.Group>
                <Form.Group
                  as={Col}
                  controlId="Section"
                  values={this.state.section}
                  onChange={(e) => this.handleChange(e, "section")}
                >
                  <Form.Label>Section</Form.Label>
                  <Form.Control as="select" defaultValue={data ? data.section : ""}>
                    <option>A</option>
                    <option>B</option>
                    <option>C</option>
                    <option>D</option>
                    <option>E</option>
                    <option>F</option>
                  </Form.Control>
                </Form.Group>
              </Form.Row>
            </React.Fragment>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.props.closeModal}>
              Close
            </Button>
            <Button
              variant="primary"
              onClick={
                this.props.isEditing ? this.handleUpdate : this.handleAdd
              }
            >
              Submit
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    );
  }
}

export default ModalStudentDetails;
