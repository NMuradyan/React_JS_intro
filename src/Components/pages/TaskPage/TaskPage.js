import React, { useState, useEffect } from "react";
import { formatDate } from "../../../Helpers/utils";
import { Button, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit, faHistory, faClipboardCheck } from "@fortawesome/free-solid-svg-icons";
import styles from "./taskPage.module.css";
import EditTaskModal from "../../editTaskModal/EditTaskModal";
import { connect } from "react-redux";
import { getSingleTask, removeTask, changeTaskStatus } from "../../../store/actions";

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
        <div className={styles.mainDivStyle}>
        <Card className={`${styles.taskStyle}`}>
          <Card.Body className={styles.bodyBackground}>
            <Card.Title className={styles.cardTitle}>
              {props.task.title}
            </Card.Title>
            <Card.Text className={styles.cardTextsStlyles}>
              {props.task.description}
            </Card.Text>
            <Card.Text className={styles.cardStatusStlyles}>
            Status: {props.task.status}
          </Card.Text>
            <Card.Text className={styles.cardDateStlyles}>
              Created: {formatDate(props.task.created_at)}
            </Card.Text>
            <Card.Text className={styles.cardDateStlyles}>
              Until: {formatDate(props.task.date)}
            </Card.Text>

            {props.task.status === "active" ? (
            <Button
              variant="info"
              className={styles.actionButton}
              onClick={() => props.changeTaskStatus(props.task._id, {status: "done"}, "single")}
            >
              <FontAwesomeIcon icon={faClipboardCheck} />
            </Button>
          ) : (
            <Button
              variant="warning"
              className={styles.actionButton}
              onClick={() => props.changeTaskStatus(props.task._id, {status: "active"}, "single")}
            >
              <FontAwesomeIcon icon={faHistory} />
            </Button>
          )}
            <Button
              variant="success"
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
        </div>
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
  changeTaskStatus
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskPage);
