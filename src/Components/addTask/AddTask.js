import React from "react";
import styles from "./AddTask.module.css";
import PropTypes from "prop-types";
import { Button, InputGroup, FormControl } from "react-bootstrap";

class AddTask extends React.PureComponent {
  state = {
    inputValue: "",
  };

  handleChange = (event) => {
    this.setState({
      inputValue: event.target.value,
    });
  };

  handleKeyDown = (event) => {
    if (event.key === "Enter") {
      this.addTask();
    }
  };

  addTask = () => {
    const { inputValue } = this.state;
    if (!inputValue) {
      return;
    }

    const task = {
      title: inputValue
    };
    
    this.props.onAdd(task);
    this.setState({
      inputValue: "",
    });
  };

  render() {
    const { inputValue } = this.state;
    const { disabled } = this.props;
    return (
      <InputGroup className={styles.inputStyle}>
        <FormControl
          onChange={this.handleChange}
          value={inputValue}
          placeholder="add task"
          aria-label="add task"
          aria-describedby="basic-addon2"
          onKeyDown={this.handleKeyDown}
          disabled={disabled}
        />
        <InputGroup.Append>
          <Button
            onClick={this.addTask}
            variant="info"
            onKeyDown={this.handleKeyDown}
            disabled={disabled}
          >
            Add
          </Button>
        </InputGroup.Append>
      </InputGroup>
    );
  }
}

AddTask.propTypes = {
  onAdd: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

export default AddTask;
