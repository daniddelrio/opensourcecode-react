import React from "react";
import TableList from "../components/TableList";
import ModalDetails from "../components/ModalDetails";
import Button from "react-bootstrap/Button";
import "../css/style.css";

class StudentPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      headers: [
        {
          name: "Name",
        },
        {
          name: "Roll #",
        },
        {
          name: "Class",
        },
        {
          name: "Section",
        },
      ],
      data: [
        {
          name: "Juan Dela Cruz",
          rollNumber: 2,
          class: 4,
          section: "A",
        },
        {
          name: "Juana Dela Cruz",
          rollNumber: 4,
          class: 2,
          section: "C",
        },
        {
          name: "John Doe",
          rollNumber: 2,
          class: 8,
          section: "C",
        },
      ],
      isModalShowing: false,
    };
  }

  showModal = (e) => {
    this.setState({ isModalShowing: true });
  };

  closeModal = (e) => {
    this.setState({ isModalShowing: false });
  };

  render() {
    return (
      <div class="main-body">
        <h1 class="main-header">Students</h1>
        <div class="main-table">
          <TableList headers={this.state.headers} data={this.state.data} />
          <ModalDetails showModal={this.showModal} closeModal={this.closeModal} isModalShowing={this.state.isModalShowing} />
          <Button block onClick={this.showModal}>
            Add Student
          </Button>
        </div>
      </div>
    );
  }
}

export default StudentPage;
