import React from "react";
import { formatDate } from "../../../Helpers/utils";
import Spinner from "../../Spinner/Spinner";
import { Button, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import styles from "./taskPage.module.css";
import EditTaskModal from "../../editTaskModal/EditTaskModal";

export default class TaskPage extends React.PureComponent {
  state = {
    task: null,
    openEditModal: false,
  };

  componentDidMount() {
    const taskId = this.props.match.params.id;

    fetch(`http://localhost:3001/task/${taskId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.error) {
          throw response.error;
        }

        this.setState({
          task: response,
        });
      })
      .catch((error) => {
        console.log("error", error);
      });
  }

  toogleEditModal = () => {
    this.setState({
      openEditModal: !this.state.openEditModal,
    });
  };

  saveEditedTask = (editedTask) => {
    fetch(`http://localhost:3001/task/${editedTask._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedTask),
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.error) {
          throw response.error;
        }

        this.setState({
          task: response,
          openEditModal: false,
        });
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  removeTask = () => {
    const taskId = this.props.match.params.id;

    fetch(`http://localhost:3001/task/${taskId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.error) {
          throw response.error;
        }

        this.props.history.push("/");
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  render() {
    const { task, openEditModal } = this.state;
    return (
      <>
        {!!task ? (
          <Card className={`${styles.taskStyle}`}>
            <Card.Body className={styles.bodyBackground}>
              <Card.Title className={styles.cardTitle}>{task.title}</Card.Title>
              <Card.Text className={styles.cardTextsStlyles}>
                {task.description}
              </Card.Text>
              <Card.Text className={styles.cardDateStlyles}>
                First date: {formatDate(task.created_at)}
              </Card.Text>
              <Card.Text className={styles.cardDateStlyles}>
                Last date: {formatDate(task.date)}
              </Card.Text>
              <Button
                variant="warning"
                className={styles.actionButton}
                onClick={this.toogleEditModal}
              >
                <FontAwesomeIcon icon={faEdit} />
              </Button>
              <Button
                variant="danger"
                className={styles.actionButton}
                onClick={this.removeTask}
              >
                <FontAwesomeIcon icon={faTrash} />
              </Button>
            </Card.Body>
          </Card>
        ) : (
          <Spinner />
        )}
        {openEditModal && (
          <EditTaskModal
            data={task}
            onSave={this.saveEditedTask}
            onClose={this.toogleEditModal}
          />
        )}
      </>
    );
  }
}
