import React from "react";
import styles from "../editTaskModal/editTaskModal.module.css";
import PropTypes from "prop-types";
import { Button, Modal } from "react-bootstrap";

export default class EditTaskModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ...props.data,
    };
  }

  handleChange = (event) => {
    this.setState({
      description: event.target.value,
      title: event.target.value.slice(0, 8) + "...",
    });
  };

  handleSave = () => {
    const { description } = this.state;
    console.log("title", description);

    if (!description) {
      return;
    }
    this.props.onSave(this.state);
  };

  render() {
    const { props } = this;
    const { description } = this.state;
    return (
      <Modal show={true} onHide={props.onClose} centered>
        <Modal.Header closeButton>
          <Modal.Title className={styles.modalTitleStyle}>
            Edit Task
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="text"
            className={styles.inputStyle}
            value={description}
            onChange={this.handleChange}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={this.handleSave}>
            Save
          </Button>
          <Button variant="secondary" onClick={props.onClose}>
            Cencel
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

EditTaskModal.propTypes = {
  data: PropTypes.object.isRequired,
  onSave: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired
};
