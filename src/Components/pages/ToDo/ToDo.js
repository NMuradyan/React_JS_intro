import React from "react";
import styles from "./todo.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Task from "../../task/Task";
import AddTask from "../../addTask/AddTask";
import Confirm from "../../Confirm/Confirm";
import EditTaskModal from "../../editTaskModal/EditTaskModal";
import { Button, Container, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { getTasks, removeSelected } from "../../../store/actions";

class ToDo extends React.PureComponent {
  state = {
    showConfirm: false,
    selectedTasks: new Set(),
    editTask: null,
    addTaskModal: false,
  };

  componentDidMount() {
    this.props.getTasks();
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.addSuccessTask && this.props.addSuccessTask) {
      this.toggleNewTaskModal();
    }
    if (!prevProps.removeSuccessTask && this.props.removeSuccessTask) {
      this.setState({
        selectedTasks: new Set(),
        showConfirm: false,
      });
    }
    if (!prevProps.editSuccessTask && this.props.editSuccessTask) {
      this.setState({
        editTask: null,
      });
    }
  }

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
    const taskIds = [...this.state.selectedTasks];

    this.props.removeSelected(taskIds);
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

  toggleNewTaskModal = () => {
    this.setState({
      addTaskModal: !this.state.addTaskModal,
    });
  };

  render() {
    const { selectedTasks, showConfirm, editTask, addTaskModal } = this.state;
    const taskCard = this.props.tasks.map((task) => {
      return (
        <Col key={task._id} xs={12} sm={6} md={4} lg={3} xl={2}>
          <Task
            data={task}
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
          <Row className="justify-content-center text-center">
            <Col
              xs={12}
              sm={10}
              md={8}
              lg={6}
              className={styles.todoButtonsStyles}
            >
              <Button
                onClick={this.toggleNewTaskModal}
                variant="outline-info"
                disabled={!!selectedTasks.size}
              >
                Add new task
              </Button>
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
            from="tasks"
            onClose={() => this.toogleEditModal(null)}
          />
        )}
        {addTaskModal && <AddTask onClose={this.toggleNewTaskModal} />}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    tasks: state.tasks,
    addSuccessTask: state.addSuccessTask,
    removeSuccessTask: state.removeSuccessTask,
    editSuccessTask: state.editSuccessTask
  };
};

const mapDispatchToProps = {
  getTasks,
  removeSelected,
};

export default connect(mapStateToProps, mapDispatchToProps)(ToDo);
