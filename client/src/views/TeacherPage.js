import React from "react";
import BasePage from "../components/BasePage";
import { getTeachers, createTeacher } from "../services/teachers";

class TeacherPage extends React.Component {
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
          name: "Teacher ID",
          value: "teacher_id",
          type: "text",
        },
        {
          name: "Class",
          value: "class_num",
          type: "number",
          mainField: "number",
        },
        {
          name: "Section",
          value: "section",
          type: "select",
          mainField: "name",
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
    const teachers = await getTeachers();
    const data = teachers.data;
    this.setState({ data });
  }

  handleAdd = async (payload) => {
    try {
      const teachers = await createTeacher(payload);
    }
    catch(err) {
      this.setState({ err });
    }
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
