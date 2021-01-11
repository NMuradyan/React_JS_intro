import React from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faEdit,
  faClipboardCheck,
  faHistory,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./task.module.css";
import { formatDate } from "../../Helpers/utils";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { removeTask,changeTaskStatus } from "../../store/actions";
import ShowMoreText from "react-show-more-text";
import { cutText } from "../../Helpers/utils";
// import showmoretextstyles from "./showMoreText.module.css";

class Task extends React.PureComponent {
  state = {
    checked: false,
  };

  handleSelected = () => {
    this.setState({
      checked: !this.state.checked,
    });
    const { onCheck, data } = this.props;
    onCheck(data._id);
  };

  render() {
    const task = this.props.data;
    const { checked } = this.state;
    const { disabled } = this.props;

    return (
      <Card className={`${styles.taskStyle} ${checked ? styles.selected : ""}`}>
        <Card.Body className={styles.bodyBackground}>
          <input type="checkbox" onClick={this.handleSelected} />
          <Card.Title className={styles.cardTitle}>
            <Link to={`/task-page/${task._id}`} className={styles.LinkName}>
              {cutText(task.title, 21)}
            </Link>
          </Card.Title>
          <ShowMoreText
            lines={3}
            more="Show more"
            less="Show less"
            // className="content-css"
            anchorClass="my-anchor-css-class"
            onClick={this.executeOnClick}
            className={`"content-css" ${styles.cardTextsStlyles}`}
            expanded={false}
            width={300}
          >
            {task.description}
            </ShowMoreText>
            {/* <Card.Text className={styles.cardTextsStlyles}>
            {task.description}
          </Card.Text> */}
          <Card.Text className={styles.cardStatusStlyles}>
            Status: {task.status}
          </Card.Text>
          <Card.Text className={styles.cardDateStlyles}>
            Created: {formatDate(task.created_at)}
          </Card.Text>
          <Card.Text className={styles.cardDateStlyles}>
            Until: {formatDate(task.date)}
          </Card.Text>

          {task.status === "active" ? (
            <Button
              variant="info"
              className={styles.actionButton}
              disabled={disabled}
              onClick={() => this.props.changeTaskStatus(task._id, {status: "done"}, "tasks")}
            >
              <FontAwesomeIcon icon={faClipboardCheck} />
            </Button>
          ) : (
            <Button
              variant="warning"
              className={styles.actionButton}
              disabled={disabled}
              onClick={() => this.props.changeTaskStatus(task._id, {status: "active"}, "tasks")}
            >
              <FontAwesomeIcon icon={faHistory} />
            </Button>
          )}

          <Button
            variant="success"
            className={styles.actionButton}
            disabled={disabled}
            onClick={() => this.props.onEdit(task)}
          >
            <FontAwesomeIcon icon={faEdit} />
          </Button>
          <Button
            variant="danger"
            className={styles.actionButton}
            onClick={() => this.props.removeTask(task._id)}
            disabled={disabled}
          >
            <FontAwesomeIcon icon={faTrash} />
          </Button>
        </Card.Body>
      </Card>
    );
  }
}

Task.propTypes = {
  onCheck: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  data: PropTypes.object.isRequired,
  onEdit: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  removeTask,
  changeTaskStatus
};

export default connect(null, mapDispatchToProps)(Task);
