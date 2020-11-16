import React from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import styles from "./task.module.css";

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
            {task.text.slice(0, 8) + "..."}
          </Card.Title>
          <Card.Text>{task.text}</Card.Text>
          <Button
            variant="warning"
            className={styles.actionButton}
            disabled={disabled}
            onClick={()=>this.props.onEdit(task)}
          >
            <FontAwesomeIcon icon={faEdit} />
          </Button>
          <Button
            variant="danger"
            className={styles.actionButton}
            onClick={() => this.props.onRemove(task._id)}
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
  onRemove: PropTypes.func.isRequired,
  onCheck: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  data: PropTypes.object.isRequired,
};

export default Task;
