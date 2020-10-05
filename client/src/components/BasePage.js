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
    this.modalChild = React.createRef();
  }

  showModal = (e) => {
    this.setState({ isModalShowing: true });
  };

  closeModal = (e) => {
    this.setState({ isModalShowing: false });
  };

  showEditModal = async (e, editData) => {
    await this.setState({ isModalEditShowing: true, editData });
    this.modalChild.current.updateState();
  };

  closeEditModal = (e) => {
    this.setState({ isModalEditShowing: false, editData: [] });
  };

  render() {
    return (
      <div class="main-body">
        <h1 class="main-header">{this.props.title}</h1>
        <div class="main-table">
          {this.props.err && <span>{this.props.err}</span>}
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
            key="Add Modal"
          />
          <ModalDetails
            showModal={this.showEditModal}
            closeModal={this.closeEditModal}
            isModalShowing={this.state.isModalEditShowing}
            isEditing
            headers={this.props.headers}
            title={`Edit ${this.props.title}`}
            data={this.state.editData}
            key="Edit Modal"
            ref={this.modalChild}
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
