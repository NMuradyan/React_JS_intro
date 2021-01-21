import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./footer.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { NavLink } from "react-router-dom";

export default function Footer() {
  return (
    <div className={styles.mainFooter}>
      <div className={styles.secondMainFooter}>
        <div className={styles.divSocials}>
          <div className={styles.divLinkedin}>
            <a
              href="https://www.linkedin.com/in/narmuradian/"
              target="_blank"
              rel="noreferrer noopener"
            >
              <FontAwesomeIcon
                icon={faLinkedin}
                className={styles.navIconLinkedinStyle}
              />
            </a>
          </div>

          <div className={styles.divGithub}>
            <a
              href="https://github.com/NMuradyan"
              target="_blank"
              rel="noreferrer noopener"
            >
              <FontAwesomeIcon
                icon={faGithub}
                className={styles.navIconGithubStyle}
              />
            </a>
          </div>
        </div>
        <div className={styles.divButtons}>
          <div className={styles.divLinks}>
            <NavLink
              exact
              to="/"
              target="_blank"
              className={styles.linksStyles}
            >
              Home
            </NavLink>
          </div>
          <div className={styles.divLinks}>
            <NavLink
              exact
              to="/about"
              target="_blank"
              className={styles.linksStyles}
            >
              About
            </NavLink>
          </div>
          <div className={styles.divLinks}>
            <NavLink
              exact
              to="/contact"
              target="_blank"
              className={styles.linksStyles}
            >
              Contact
            </NavLink>
          </div>
        </div>
        <div className={styles.copyrightStyles}>
          <p>
            ©2021 NMuradyan &{" "}
            <a
              href="https://bitschool.am/"
              rel="noreferrer noopener"
              target="_blank"
              className={styles.bitschoolStyles}
            >
              Bitschool
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
