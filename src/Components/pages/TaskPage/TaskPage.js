import React, { useState, useEffect } from "react";
import { formatDate } from "../../../Helpers/utils";
import Spinner from "../../Spinner/Spinner";
import { Button, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import styles from "./taskPage.module.css";
import EditTaskModal from "../../editTaskModal/EditTaskModal";

export default function TaskPage(props) {
  const [task, setTask] = useState(null);
  const [openEditModal, setOpenEditModal] = useState(false);

  useEffect(() => {
    // const taskId = props.match.params.id;

    fetch(`http://localhost:3001/task/${props.match.params.id}`, {
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

        setTask(response);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, [props.match.params.id]);

  const toogleEditModal = () => {
    setOpenEditModal(!openEditModal);
  };

  const saveEditedTask = (editedTask) => {
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

        setTask(response);
        setOpenEditModal(false);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const removeTask = () => {
    const taskId = props.match.params.id;

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

        props.history.push("/");
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

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
              onClick={toogleEditModal}
            >
              <FontAwesomeIcon icon={faEdit} />
            </Button>
            <Button
              variant="danger"
              className={styles.actionButton}
              onClick={removeTask}
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
          onSave={saveEditedTask}
          onClose={toogleEditModal}
        />
      )}
    </>
  );
}
