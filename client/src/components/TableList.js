import React from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import ModalDetails from "../components/ModalDetails";

class TableList extends React.Component {
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
                {Object.values(person).map((col) => (
                  <td>{Array.isArray(col) ? col.map(c => c.name || c.number).join("\n") : col}</td>
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
