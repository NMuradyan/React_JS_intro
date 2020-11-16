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
      text: event.target.value,
    });
  };

  handleSave = () => {
    const { text } = this.state;

    if (!text) {
      return;
    }
    this.props.onSave(this.state);
  };

  render() {
    const { props } = this;
    const { text } = this.state;
    return (
      <Modal show={true} onHide={props.onClose} centered>
        <Modal.Header closeButton>
          <Modal.Title className={styles.modalTitleStyle}>
            Edite Task
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="text"
            className={styles.inputStyle}
            value={text}
            onChange={this.handleChange}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={this.handleSave}>
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
