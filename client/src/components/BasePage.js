import React from "react";
import TableList from "../components/TableList";
import ModalDetails from "../components/ModalDetails";
import Button from "react-bootstrap/Button";
import "../css/style.css";

class BasePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalShowing: false,
      isModalEditShowing: false,
      editData: [],
    };
  }

  showModal = (e) => {
    this.setState({ isModalShowing: true });
  };

  closeModal = (e) => {
    this.setState({ isModalShowing: false });
  };

  showEditModal = (e, editData) => {
    this.setState({ isModalEditShowing: true, editData });
  };

  closeEditModal = (e) => {
    this.setState({ isModalEditShowing: false, editData: [] });
  };

  render() {
    return (
      <div class="main-body">
        <h1 class="main-header">{this.props.title}</h1>
        <div class="main-table">
          <TableList
            headers={this.props.headers}
            data={this.props.data}
            showModal={this.showEditModal}
            closeModal={this.closeEditModal}
            isModalShowing={this.state.isModalEditShowing}
          />
          <ModalDetails
            showModal={this.showModal}
            closeModal={this.closeModal}
            isModalShowing={this.state.isModalShowing}
            headers={this.props.headers}
            title={`Add ${this.props.title}`}
          />
          <ModalDetails
            showModal={this.showEditModal}
            closeModal={this.closeEditModal}
            isModalShowing={this.state.isModalEditShowing}
            headers={this.props.headers}
            title={`Edit ${this.props.title}`}
            data={this.state.editData}
          />
          <Button block onClick={this.showModal}>
            {`Add ${this.props.title}`}
          </Button>
        </div>
      </div>
    );
  }
}

export default BasePage;