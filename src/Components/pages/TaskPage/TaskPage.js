import React, { useState, useEffect } from "react";
import { formatDate } from "../../../Helpers/utils";
import { Button, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import styles from "./taskPage.module.css";
import EditTaskModal from "../../editTaskModal/EditTaskModal";
import { connect } from "react-redux";
import { getSingleTask, removeTask } from "../../../store/actions";

function TaskPage(props) {
  const [openEditModal, setOpenEditModal] = useState(false);
  const { getSingleTask } = props;
  const taskId = props.match.params.id;

  useEffect(() => {
    getSingleTask(taskId);
  }, [taskId, getSingleTask]);

  useEffect(() => {
    setOpenEditModal(false);
  }, [props.editSuccessTask]);

  const toogleEditModal = () => {
    setOpenEditModal(!openEditModal);
  };

  return (
    <>
      {!!props.task ? (
        <Card className={`${styles.taskStyle}`}>
          <Card.Body className={styles.bodyBackground}>
            <Card.Title className={styles.cardTitle}>
              {props.task.title}
            </Card.Title>
            <Card.Text className={styles.cardTextsStlyles}>
              {props.task.description}
            </Card.Text>
            <Card.Text className={styles.cardDateStlyles}>
              First date: {formatDate(props.task.created_at)}
            </Card.Text>
            <Card.Text className={styles.cardDateStlyles}>
              Last date: {formatDate(props.task.date)}
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
              onClick={() =>
                props.removeTask(props.task._id, "single", props.history.push)
              }
            >
              <FontAwesomeIcon icon={faTrash} />
            </Button>
          </Card.Body>
        </Card>
      ) : (
        <h2>Task not found</h2>
      )}
      {openEditModal && (
        <EditTaskModal
          data={props.task}
          from="single"
          onClose={toogleEditModal}
        />
      )}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    task: state.task,
    editSuccessTask: state.editSuccessTask,
    removeSingleSuccessTask: state.removeSingleSuccessTask,
  };
};

const mapDispatchToProps = {
  getSingleTask,
  removeTask,
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskPage);
