import React from "react";
import BasePage from "../components/BasePage";
import { getStudents, createStudent } from "../services/students";

class StudentPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      headers: [
        {
          name: "Name",
          value: "name",
          type: "text",
        },
        {
          name: "Roll #",
          value: "roll_number",
          type: "number",
        },
        {
          name: "Class",
          value: "class_num",
          type: "number",
        },
        {
          name: "Section",
          value: "section",
          type: "select",
          options: [
            "A",
            "B",
            "C",
            "D",
            "E",
            "F",
          ]
        },
      ],
      data: [],
      err: "",
      isModalShowing: false,
      isModalEditShowing: false,
    };
  }

  async componentDidMount() {
    const students = await getStudents();
    const data = students.data.map(student => {
      const { id, ...studentData } = student;
      return { ...studentData };
    });
    this.setState({ data });
  }

  handleAdd = async (payload) => {
    try {
      const students = await createStudent(payload);
    }
    catch(err) {
      this.setState({ err });
    }
  }

  render() {
    return (
      <BasePage 
        title="Student"
        headers={this.state.headers}
        data={this.state.data}
        err={this.state.err}
      />
    );
  }
}

export default StudentPage;
