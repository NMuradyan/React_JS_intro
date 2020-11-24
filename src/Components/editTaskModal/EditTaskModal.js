import React from "react";
import styles from "../editTaskModal/editTaskModal.module.css";
import PropTypes from "prop-types";
import { Button, Modal, FormControl } from "react-bootstrap";

export default class EditTaskModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ...props.data,
    };
  }

  handleChange = (event) => {
    let { name, value } = event.target;
    this.setState({
      // description: event.target.value,
      // title: event.target.value
      [name]: value,
    });
  };

  handleSave = () => {
    const { title, description } = this.state;
    console.log("title", title);
    console.log("description", description);

    if (!title) {
      return;
    }
    this.props.onSave(this.state);
  };

  render() {
    const { props } = this;
    const { description, title } = this.state;
    return (
      <Modal show={true} onHide={props.onClose} centered>
        <Modal.Header closeButton>
          <Modal.Title className={styles.modalTitleStyle}>
            Edit Task
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormControl
            className={styles.editTitleStyle}
            onChange={this.handleChange}
            name="title"
            value={title}
            placeholder="Title"
            bsPrefix
          />
          {/* <input
            type="text"
            className={styles.inputStyle}
            value={description}
            onChange={this.handleChange}
          /> */}
          <FormControl
            className={styles.editDescriptionStyle}
            onChange={this.handleChange}
            name="description"
            value={description}
            placeholder="Task"
            as="textarea"
            aria-label="With textarea"
            bsPrefix
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
  onClose: PropTypes.func.isRequired,
};
