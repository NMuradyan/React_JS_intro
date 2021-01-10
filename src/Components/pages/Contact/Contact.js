import React from "react";
import styles from "./contact.module.css";
import { Button, Form, Row, Col } from "react-bootstrap";

export default function Contact() {
  return (
    <div className={styles.mainPage}>
        <div className={styles.divCentered}>
      <div className={styles.pageTitle}>Contact with us</div>
      <Form className={styles.formStylesFirst}>
        <Row>
          <Col>
            <Form.Control placeholder="First name" />
          </Col>
          <Col>
            <Form.Control placeholder="Last name" />
          </Col>
        </Row>
      </Form>
      <Form className={styles.formStylesSecond}>
        <Form.Group>
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>
        <Form.Group>
          <Form.Control as="textarea" placeholder="Your Message" rows={3} />
        </Form.Group>
        <Button className={styles.buttonStyles} variant="info">Get in touch </Button>
      </Form>
      </div>
    </div>
  );
}
