import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import TeacherModalFields from "./TeacherModalFields";
import Col from "react-bootstrap/Col";
import { createTeacher, deleteTeacher, updateTeacher } from "../services/teachers";
import { createClass, updateClass } from "../services/classes";
import { createSection, updateSection } from "../services/sections";

const ClassRow = (idx, data, state, handleChange) => (
  <Form.Row>
    <Form.Group as={Col} controlId="Class" key={"class" + idx}>
      <Form.Label>Class</Form.Label>
      <Form.Control
        as="select"
        defaultValue={data ? data.class : ""}
        values={state.classSections[idx] && state.classSections[idx].class}
        onChange={(e) => handleChange(e, "class", idx)}
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
      values={state.classSections[idx] && state.classSections[idx].section}
      onChange={(e) => handleChange(e, "section", idx)}
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
    <button
      type="button"
      class="close"
      aria-label="Close"
      style={{ paddingTop: "0.5rem", paddingLeft: "0.5rem" }}
    >
      <span aria-hidden="true">&times;</span>
    </button>
  </Form.Row>
);

class ModalDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classList: [],
      name: "",
      teacherId: "",
      classSections: [],
    };
  }

  componentDidMount() {
    if (!this.props.isEditing)
      this.setState({
        classList: [ClassRow(0, this.props.data, this.state, this.handleClass)],
        classSections: [{ class: "1", section: "A" }],
      });
    else {
      const currClasses = this.props.data.classes;
      const currSections = this.props.data.sections;
      console.log(this.props.data)

      const refactoredData = currClasses && currSections && currClasses.map(c => ({
        class: c.number,
        classId: c.id,
        section: currSections(s => s.class_num === c.id).name,
        sectionId: currSections(s => s.class_num === c.id).id,
        isDeleted: false,
      }))

      this.setState({
        classList: [ClassRow(0, refactoredData, this.state, this.handleClass)],
        classSections: refactoredData,
      });
    }
  }

  handleClick = (e) => {
    this.setState({
      classList: this.state.classList.concat(
        ClassRow(
          this.state.classList.length,
          this.props.data,
          this.state,
          this.handleClass
        )
      ),
      classSections: [
        this.state.classSections.concat({ class: "1", section: "A" }),
      ],
    });
  };

  handleChange = (e, key) => {
    this.setState({ [key]: e.target.value });
  };

  handleClass = (e, key, idx) => {
    const items = this.state.classSections;

    this.setState({
      classSections: [
        ...items.slice(0, idx),
        {
          ...items[idx],
          [key]: e.target.value,
        },
        ...items.slice(idx + 1),
      ],
    });
  };

  handleAdd = async (e) => {
    e.preventDefault();
    const teacher = await createTeacher({
      name: this.state.name,
      teacher_id: this.state.teacherId,
    });

    const teacherId = teacher.data.id;
    const classes = await Promise.all(
      this.state.classSections.map(
        async (curr) => {
          const newClass = await createClass({ number: curr.class, teacher: teacherId });
          const section = await createSection({ name: curr.section, class_num: newClass.data.id, teacher: teacherId });

          return { class: newClass, section };
        }
      )
    );

    window.location.reload();
  };

  handleUpdate = async (e) => {
    e.preventDefault();
    const teacher = await updateTeacher(this.props.data.id, {
      name: this.state.name,
      teacher_id: this.state.teacherId,
    });

    const teacherId = teacher.data.id;
    const classes = await Promise.all(
      this.state.classSections.map(
        async (curr) => {
          const newClass = await createClass({ number: curr.class, teacher: teacherId });
          const section = await createSection({ name: curr.section, class_num: newClass.data.id, teacher: teacherId });

          return { class: newClass, section };
        }
      )
    );

    window.location.reload();
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
              <Form.Group controlId="TeacherID">
                <Form.Label>Teacher ID</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Teacher ID"
                  defaultValue={data ? data.teacher_id : ""}
                  values={this.state.teacherId}
                  onChange={(e) => this.handleChange(e, "teacherId")}
                />
              </Form.Group>
              {this.state.classList}
              <Button
                variant="outline-primary"
                block
                onClick={this.handleClick}
              >
                Add Class and Section
              </Button>
            </React.Fragment>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.props.closeModal}>
              Close
            </Button>
            <Button
              variant="primary"
              onClick={this.handleAdd}
            >
              Submit
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    );
  }
}

export default ModalDetails;
