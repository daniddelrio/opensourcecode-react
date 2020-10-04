import React from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import ModalDetails from "../components/ModalDetails";

class TableList extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Table striped bordered hover>
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
                  <td>{col}</td>
                ))}
                <td>
                  <Button variant="secondary" block onClick={this.props.showModal}>
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
