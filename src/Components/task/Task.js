import React from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import styles from "./task.module.css";
import { formatDate } from "../../Helpers/utils";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {removeTask} from "../../store/actions"

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
              {task.title}
            </Link>
          </Card.Title>
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
};

const mapDispatchToProps = {
  removeTask
}

export default connect(null, mapDispatchToProps)(Task);
