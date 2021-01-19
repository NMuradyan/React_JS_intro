import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./footer.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  return (
    <div className={styles.mainFooter}>
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
      <div>
        <div className={styles.divLinks}>
          <a
            href="/"
            rel="noreferrer noopener"
            target="_blank"
            className={styles.linksStyles}
          >
            Home
          </a>
        </div>
        <div className={styles.divLinks}>
          <a
            href="/about"
            rel="noreferrer noopener"
            target="_blank"
            className={styles.linksStyles}
          >
            About
          </a>
        </div>
        <div className={styles.divLinks}>
          <a
            href="/contact"
            rel="noreferrer noopener"
            target="_blank"
            className={styles.linksStyles}
          >
            Contact
          </a>
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
  );
}
