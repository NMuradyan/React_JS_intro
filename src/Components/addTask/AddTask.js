import React from "react";
import styles from "../addTask/AddTask.module.css";
import PropTypes from "prop-types";
import { Button, FormControl, Modal } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class AddTask extends React.PureComponent {
  state = {
    title: "",
    description: "",
    date: new Date(),
  };

  handleChange = (event) => {
    let { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  };

  handleKeyDown = (event) => {
    if (event.key === "Enter") {
      this.addTask();
    }
  };

  addTask = () => {
    const { title, description } = this.state;
    if (!title) {
      return;
    }

    const task = {
      title: title,
      description: description,
    };

    this.props.onAdd(task);
  };

  handleDateChange = (date) => {
    this.setState({
      date,
    });
  };

  render() {
    const { onClose } = this.props;
    return (
      <Modal show={true} onHide={onClose} centered>
        <Modal.Header closeButton>
          <Modal.Title className={styles.titleStyle}>Add new Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormControl
            className={styles.titleInputStyle}
            onChange={this.handleChange}
            name="title"
            placeholder="Title"
            onKeyDown={this.handleKeyDown}
            bsPrefix
          />
          <FormControl
            className={styles.textareaStyle}
            onChange={this.handleChange}
            name="description"
            placeholder="Task text"
            as="textarea"
            aria-label="With textarea"
            bsPrefix
          />
          <DatePicker selected={new Date()} onChange={this.handleDateChange} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="info" onClick={this.addTask}>
            Add
          </Button>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

AddTask.propTypes = {
  onAdd: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

export default AddTask;
