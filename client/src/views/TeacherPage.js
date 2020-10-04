import React from "react";
import BasePage from "../components/BasePage";

class TeacherPage extends React.Component {
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
      isModalEditShowing: false,
    };
  }

  render() {
    return (
      <BasePage 
        title="Teacher"
        headers={this.state.headers}
        data={this.state.data}
      />
    );
  }
}

export default TeacherPage;
