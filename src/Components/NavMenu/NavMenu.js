import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./navMenu.module.css";
import { Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";

export default function NavMenu() {
  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <NavLink
              exact
              to="/"
              activeClassName={styles.activLink}
              className={styles.navLinkName}
            >
              Home
            </NavLink>
            
            <NavLink
              exact
              to="/about"
              activeClassName={styles.activLink}
              className={styles.navLinkName}
            >
              About
            </NavLink>
            <NavLink
              exact
              to="/contact"
              activeClassName={styles.activLink}
              className={styles.navLinkName}
            >
              Contact
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}
