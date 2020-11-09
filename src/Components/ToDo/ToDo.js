import React from "react";
import styles from "./todo.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import idGenerator from "../../Helpers/_id.Generator";
// import Task from "./task/Task";
import {
  Button,
  InputGroup,
  FormControl,
  Container,
  Row,
  Col,
  Card,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";

class ToDo extends React.Component {
  state = {
    tasks: [],
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

  render() {
    const { inputValue, tasks } = this.state;
    const taskCard = tasks.map((task, _id) => {
      return (
        <Col key={_id} xs={12} sm={6} md={4} lg={3} xl={2}>
          <Card className={styles.taskStyle}>
            <Card.Body>
              <Card.Title className={styles.cardTitle}>{task.text.slice(0, 8) + "..."}</Card.Title>
              <Card.Text>{task.text}</Card.Text>
              <Button variant="warning" className={styles.actionButton}>
                <FontAwesomeIcon icon={faEdit} />
              </Button>
              <Button
                variant="danger"
                className={styles.actionButton}
                onClick={() => this.removeTask(task._id)}
              >
                <FontAwesomeIcon icon={faTrash} />
              </Button>
            </Card.Body>
          </Card>
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
                />
                <InputGroup.Append>
                  <Button
                    onClick={this.addTask}
                    variant="info"
                    onKeyDown={this.handleKeyDown}
                  >
                    Add
                  </Button>
                </InputGroup.Append>
              </InputGroup>
            </Col>
          </Row>

          <Row>{taskCard}</Row>
        </Container>
      </div>
    );
  }
}

export default ToDo;
