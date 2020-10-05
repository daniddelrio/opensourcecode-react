import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import {
  createTeacher,
  deleteTeacher,
  updateTeacher,
} from "../services/teachers";
import { createClass, updateClass, deleteClass } from "../services/classes";
import {
  createSection,
  updateSection,
  deleteSection,
} from "../services/sections";

const ClassRow = (idx, data, state, handleChange, handleDeleteClass) => (
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
      onClick={(e) => handleDeleteClass(e, idx)}
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
      message: "",
    };
  }

  componentDidMount() {
    if (!this.props.isEditing)
      this.setState({
        classList: [
          ClassRow(
            0,
            this.props.data,
            this.state,
            this.handleClass,
            this.handleDeleteClass
          ),
        ],
        classSections: [{ class: "1", section: "A" }],
      });
  }

  handleClick = (e) => {
    this.setState({
      classList: this.state.classList.concat(
        ClassRow(
          this.state.classList.length,
          this.props.data,
          this.state,
          this.handleClass,
          this.handleDeleteClass
        )
      ),
      classSections: this.state.classSections.concat([
        { class: "1", section: "A" },
      ]),
    });
  };

  handleChange = (e, key) => {
    this.setState({ [key]: e.target.value });
  };

  handleDeleteClass = (e, idx) => {
    const items = this.state.classSections;

    if (items.length == 1) {
      this.setState({ message: "Teachers must have at least one class!" });
    } else {
      // Existing class or section
      if (items[idx].classId) {
        this.setState({
          classSections: [
            ...items.slice(0, idx),
            {
              ...items[idx],
              isDeleted: true,
            },
            ...items.slice(idx + 1),
          ],
          classList: [...this.state.classList.splice(idx, 1)],
        });
      } else {
        this.setState({
          classSections: [...items.splice(idx, 1)],
          classList: [...this.state.classList.splice(idx, 1)],
        });
      }
    }
  };

  handleClass = (e, item, idx) => {
    const items = this.state.classSections;

    this.setState({
      classSections: [
        ...items.slice(0, idx),
        {
          ...items[idx],
          [item]: e.target.value,
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
      this.state.classSections.map(async (curr) => {
        const newClass = await createClass({
          number: curr.class,
          teacher: teacherId,
        });
        const section = await createSection({
          name: curr.section,
          class_num: newClass.data.id,
          teacher: teacherId,
        });

        return { class: newClass, section };
      })
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
      this.state.classSections.map(async (curr) => {
        let finalClass, finalSection;
        if (curr.classId) {
          if (curr.isDeleted) {
            finalClass = await deleteClass(curr.classId);
            finalSection = await deleteSection(curr.sectionId);
          } else {
            finalClass = await updateClass(curr.classId, {
              teacher: teacherId,
              number: curr.class,
            });
            finalSection = await updateSection(curr.sectionId, {
              teacher: teacherId,
              class_num: finalClass.data.id,
              name: curr.section,
            });
          }
        } else {
          finalClass = await createClass({
            number: curr.class,
            teacher: teacherId,
          });
          finalSection = await createSection({
            name: curr.section,
            class_num: finalClass.data.id,
            teacher: teacherId,
          });
        }

        return { class: finalClass, section: finalSection };
      })
    );

    window.location.reload();
  };

  updateState = () => {
    const data = this.props.data;
    const currClasses = data && this.props.data.classes;
    const currSections = data && this.props.data.sections;

    const refactoredData =
      currClasses &&
      currSections &&
      currClasses.map((c) => ({
        class: c.number,
        classId: c.id,
        section: currSections.find((s) => s.class_num === c.id).name,
        sectionId: currSections.find((s) => s.class_num === c.id).id,
        isDeleted: false,
      }));

    this.setState({
      name: this.props.data.name,
      teacherId: this.props.data.teacher_id,
      classList: refactoredData.map((curr, idx) =>
        ClassRow(
          idx,
          curr,
          this.state,
          this.handleClass,
          this.handleDeleteClass
        )
      ),
      classSections: refactoredData,
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

export default ModalDetails;
