import React, { createRef } from "react";
import styles from "../editTaskModal/editTaskModal.module.css";
import PropTypes from "prop-types";
import { Button, Modal, FormControl } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { connect } from "react-redux";
import { saveEdited } from "../../store/actions";

class EditTaskModal extends React.Component {
  constructor(props) {
    super(props);
    const { date } = props.data;

    this.state = {
      ...props.data,
      date: date ? new Date(date) : new Date(),
    };
    this.titleRef = createRef(null);
  }

  componentDidMount() {
    this.titleRef.current.focus();
  }

  handleChange = (event) => {
    let { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleSave = () => {
    const { title, date } = this.state;

    if (!title) {
      return;
    }
    const editedTask = {
      ...this.state,
      date: date.toISOString().slice(0, 10),
    };
    this.props.saveEdited(editedTask, this.props.from);
  };

  handleDateChange = (date) => {
    this.setState({
      date,
    });
  };

  render() {
    const { props } = this;
    const { description, title, date } = this.state;
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
            ref={this.titleRef}
            placeholder="Title"
            bsPrefix
          />
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
          <DatePicker
            selected={date}
            onChange={this.handleDateChange}
            startDate={new Date()}
            minDate={new Date()}
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
  onClose: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  saveEdited,
};

export default connect(null, mapDispatchToProps)(EditTaskModal);
