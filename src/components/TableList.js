import React from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

class TableList extends React.Component {
  render() {
    return (
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
                <Button variant="secondary" block>
                  Edit
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  }
}

export default TableList;
