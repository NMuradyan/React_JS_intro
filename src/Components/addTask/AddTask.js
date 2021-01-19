import React, { createRef } from "react";
import styles from "../addTask/AddTask.module.css";
import PropTypes from "prop-types";
import { Button, FormControl, Modal } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { connect } from "react-redux";
import { addTask } from "../../store/actions";

class AddTask extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      date: new Date(),
      showDate: false,
    };
    this.addTitleRef = createRef(null);
  }

  componentDidMount() {
    this.addTitleRef.current.focus();
  }

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
    const { title, description, date } = this.state;
    if (!title) {
      return;
    }
    const task = {
      title: title,
      description: description,
      date: date.toISOString().slice(0, 10),
    };

    this.props.addTask(task);
  };

  handleDateChange = (date) => {
    this.setState({
      date,
    });
  };

  toggleDateButton = () => {
    this.setState({
      showDate: !this.state.showDate,
    });
  };

  render() {
    const { onClose } = this.props;
    return (
      <>
        <Modal show={true} onHide={onClose} centered>
          <Modal.Header closeButton>
            <Modal.Title className={styles.titleStyle}>
              Add new Task
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className={styles.addModalStyle}>
            <FormControl
              className={styles.titleInputStyle}
              onChange={this.handleChange}
              ref={this.addTitleRef}
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
            <DatePicker
              selected={this.state.date}
              onChange={this.handleDateChange}
              minDate={new Date()}
            />
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
      </>
    );
  }
}

AddTask.propTypes = {
  onClose: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  addTask,
};

export default connect(null, mapDispatchToProps)(AddTask);
