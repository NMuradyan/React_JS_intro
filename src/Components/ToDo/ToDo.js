import React from "react";
import styles from "./todo.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import idGenerator from "../../Helpers/idGenerator";
import Task from "../task/Task";
import {
  Button,
  InputGroup,
  FormControl,
  Container,
  Row,
  Col,
} from "react-bootstrap";

class ToDo extends React.PureComponent {
  state = {
    tasks: [],
    inputValue: "",
    selectedTasks: new Set(),
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

    const newTask = {
      text: inputValue,
      _id: idGenerator(),
    };

    const tasks = [newTask, ...this.state.tasks];
    this.setState({
      tasks: tasks,
      inputValue: "",
    });
  };

  removeTask = (taskId) => {
    const newTasks = this.state.tasks.filter((task) => task._id !== taskId);
    this.setState({
      tasks: newTasks,
    });
  };

  handleCheck = (taskId) => {
    const selectedTasks = new Set(this.state.selectedTasks);
    if (selectedTasks.has(taskId)) {
      selectedTasks.delete(taskId);
    } else {
      selectedTasks.add(taskId);
    }
    this.setState({
      selectedTasks,
    });
  };

  removeSelected = () => {
    let tasks = [...this.state.tasks];

    this.state.selectedTasks.forEach((id) => {
      tasks = tasks.filter((task) => task._id !== id);
    });

    this.setState({
      tasks,
      selectedTasks: new Set()
    });
  };

  render() {
    const { inputValue, tasks, selectedTasks } = this.state;
    const taskCard = tasks.map((task) => {
      return (
        <Col key={task._id} xs={12} sm={6} md={4} lg={3} xl={2}>
          <Task
            data={task}
            onRemove={this.removeTask}
            onCheck={this.handleCheck}
            disabled={!!selectedTasks.size}
          />
        </Col>
      );
    });

    return (
      <div>
        <Container className={styles.contStyle}>
          <Row className="justify-content-center">
            <Col xs={12} sm={10} md={8} lg={6}>
              <InputGroup className={styles.inputStyle}>
                <FormControl
                  onChange={this.handleChange}
                  value={inputValue}
                  placeholder="add task"
                  aria-label="add task"
                  aria-describedby="basic-addon2"
                  onKeyDown={this.handleKeyDown}
                  disabled={!!selectedTasks.size}
                />
                <InputGroup.Append>
                  <Button
                    onClick={this.addTask}
                    variant="info"
                    onKeyDown={this.handleKeyDown}
                    disabled={!!selectedTasks.size}
                  >
                    Add
                  </Button>
                </InputGroup.Append>
              </InputGroup>
            </Col>
          </Row>

          <Row>{taskCard}</Row>
          <Row className="justify-content-center">
            <Col xs={4}>
              <Button
                onClick={this.removeSelected}
                variant="outline-danger"
                disabled={!selectedTasks.size}
              >
                Remove selected
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default ToDo;
