import React from "react";
import styles from "../Confirm/confirm.module.css";
import PropTypes from "prop-types";
import { Button, Modal } from "react-bootstrap";

export default function Confirm(props) {
  return (
    <Modal show={true} onHide={props.onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title className={styles.modalTitleStyle}>
          Are you sure to remove{" "}
          <span className={styles.countStyle}>{props.count}</span> tasks
        </Modal.Title>
      </Modal.Header>
      {/* <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body> */}
      <Modal.Footer>
        <Button variant="danger" onClick={props.onSubmit}>
          Remove all
        </Button>
        <Button variant="secondary" onClick={props.onClose}>
          Cencel
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

Confirm.propTypes = {
  count: PropTypes.number.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
