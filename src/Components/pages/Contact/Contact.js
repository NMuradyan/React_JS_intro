import React, { useState, useEffect } from "react";
import styles from "./contact.module.css";
import { Button, Form } from "react-bootstrap";
import { connect } from "react-redux";
import { sendFormMessage } from "../../../store/actions";
import contact from "../../../Assets/images/contact.jpg";

const allValues = {
  name: "",
  email: "",
  message: "",
};

function Contact(props) {
  const [values, setValues] = useState(allValues);

  useEffect(
    (values) => {
      if (!props.sendSuccessMessage) {
        setValues(values);
      }
      setValues(allValues);
    },
    [props.sendSuccessMessage]
  );

  const sendFormMessage = () => {
    props.sendFormMessage(values);
  };

  const handleChange = (event) => {
    let { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  return (
    <div
      className={styles.mainPage}
      style={{ backgroundImage: `url(${contact})` }}
    >
      <div className={styles.divCentered}>
        <div className={styles.pageTitle}>Contact with us</div>
        <Form className={styles.formStylesFirst}>
          <Form.Control
            onChange={handleChange}
            placeholder="Name, Surname"
            name="name"
            value={values.name}
          />
        </Form>
        <Form className={styles.formStylesSecond}>
          <Form.Group>
            <Form.Control
              onChange={handleChange}
              type="email"
              placeholder="Enter email"
              name="email"
              value={values.email}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              onChange={handleChange}
              as="textarea"
              placeholder="Your Message"
              name="message"
              value={values.message}
              rows={3}
            />
          </Form.Group>
          <Button
            onClick={sendFormMessage}
            className={styles.buttonStyles}
            variant="info"
          >
            Get in touch
          </Button>
        </Form>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    sendSuccessMessage: state.sendSuccessMessage,
  };
};

const mapDispatchToProps = {
  sendFormMessage,
};

export default connect(mapStateToProps, mapDispatchToProps)(Contact);
