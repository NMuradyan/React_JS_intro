import React from "react";
import { formatDate } from "../../../Helpers/utils";
import Spinner from "../../Spinner/Spinner";
import { Button, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import styles from "../../task/task.module.css";

export default class TaskPage extends React.PureComponent {
  state = {
    task: null,
    tasks: [],
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

  // toogleEditModal = (task) => {
  //   this.setState({
  //     editTask: task,
  //   });
  // };

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

        const newTasks = this.state.tasks.filter((task) =>task._id !== taskId);
        this.setState({
          tasks: newTasks,
        });
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  render() {
    const { task } = this.state;
    return (
      <>
        {!!task ? (
          // <div>
          //   <h2>Title: {task.title}</h2>
          //   <p>Description: {task.description}</p>
          //   <p>Date: {formatDate(task.date)}</p>
          //   <p>Created Date: {formatDate(task.created_at)}</p>
          // </div>
          <Card className={`${styles.taskStyle}`}>
        <Card.Body className={styles.bodyBackground}>
          <Card.Title className={styles.cardTitle}>
              {task.title}
          </Card.Title>
          <Card.Text className={styles.cardTextsStlyles}>
            {task.description}
          </Card.Text>
          <Card.Text className={styles.cardTextsStlyles}>
            First date: {formatDate(task.created_at)}
          </Card.Text>
          <Card.Text className={styles.cardTextsStlyles}>
            Last date: {formatDate(task.date)}
          </Card.Text>
          <Button
            variant="warning"
            className={styles.actionButton}
            onClick={() => this.props.onEdit(task)}
          >
            <FontAwesomeIcon icon={faEdit} />
          </Button>
          <Button
            variant="danger"
            className={styles.actionButton}
            onClick={() => this.removeTask(task._id) }
          >
            <FontAwesomeIcon icon={faTrash} />
          </Button>
        </Card.Body>
      </Card>
        ) : (
          <Spinner />
        )}
      </>
    );
  }
}
