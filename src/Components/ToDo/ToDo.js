import React from "react";
import styles from "./todo.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import idGenerator from "../../Helpers/idGenerator";
import Task from "../task/Task";
import AddTask from "../addTask/AddTask";
import Confirm from "../Confirm/Confirm";
import EditTaskModal from "../editTaskModal/EditTaskModal";
import { Button, Container, Row, Col } from "react-bootstrap";

class ToDo extends React.PureComponent {
  state = {
    tasks: [],
    inputValue: "",
    showConfirm: false,
    selectedTasks: new Set(),
    editTask: null,
  };

  addTask = (value) => {
    const newTask = {
      text: value,
      _id: idGenerator(),
    };

    const tasks = [newTask, ...this.state.tasks];
    this.setState({
      tasks: tasks,
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
      selectedTasks: new Set(),
      showConfirm: false,
    });
  };

  toggleConfirm = () => {
    this.setState({
      showConfirm: !this.state.showConfirm,
    });
  };

  toogleEditModal = (task) => {
    this.setState({
      editTask: task,
    });
  };

  saveEdited = (editedTask) => {
    const tasks = [...this.state.tasks];
    let getTaskIndex = tasks.findIndex((task) => task._id === editedTask._id);
    tasks[getTaskIndex] = editedTask;

    this.setState({
      tasks: tasks,
      editTask: null
    });
  };

  render() {
    const { tasks, selectedTasks, showConfirm, editTask } = this.state;
    const taskCard = tasks.map((task) => {
      return (
        <Col key={task._id} xs={12} sm={6} md={4} lg={3} xl={2}>
          <Task
            data={task}
            onRemove={this.removeTask}
            onCheck={this.handleCheck}
            disabled={!!selectedTasks.size}
            onEdit={this.toogleEditModal}
          />
        </Col>
      );
    });

    return (
      <div>
        <Container className={styles.contStyle}>
          <Row className="justify-content-center">
            <Col xs={11} sm={10} md={8} lg={6}>
              <AddTask onAdd={this.addTask} disabled={!!selectedTasks.size} />
            </Col>
            <Col xs={1} md={4}>
              <Button
                onClick={this.toggleConfirm}
                variant="outline-danger"
                disabled={!selectedTasks.size}
              >
                Remove selected
              </Button>
            </Col>
          </Row>
          <Row>{taskCard}</Row>
        </Container>
        {showConfirm && (
          <Confirm
            onSubmit={this.removeSelected}
            onClose={this.toggleConfirm}
            count={selectedTasks.size}
          />
        )}
        {!!editTask && (
          <EditTaskModal
            data={editTask}
            onSave={this.saveEdited}
            onClose={() => this.toogleEditModal(null)}
          />
        )}
      </div>
    );
  }
}

export default ToDo;
