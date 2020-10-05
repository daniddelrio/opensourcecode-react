import React from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import ModalDetails from "../components/ModalDetails";
import { deleteTeacher } from "../services/teachers";

class TableList extends React.Component {
  handleDelete = async (e, id) => {
    await deleteTeacher(id);
    window.location.reload();
  }

  render() {
    return (
      <React.Fragment>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              {this.props.headers.map((header) => (
                <th>{header.name}</th>
              ))}
              <th />
            </tr>
          </thead>
          <tbody>
            {this.props.data.map((person) => (
              <tr>
                {Object.entries(person).map((col) => (
                  col[0] !== "id" && <td>{Array.isArray(col[1]) ? col[1].map(c => c.name || c.number).join("\n") : col[1]}</td>
                ))}
                <td>
                  <Button
                    size="sm"
                    variant="secondary"
                    block
                    onClick={(e) => this.props.showModal(e, person)}
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="danger"
                    block
                    onClick={(e) => this.handleDelete(e, person.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </React.Fragment>
    );
  }
}

export default TableList;
