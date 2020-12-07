import React from "react";
import styles from "./notFound.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBomb } from "@fortawesome/free-solid-svg-icons";

export default function NotFound() {
  return (
    <div className={styles.notFoundDivStyle}>
      <div>
        <p className={styles.notFoundTextStyle}>
          4 <FontAwesomeIcon icon={faBomb} className={styles.bombStyle} />4
        </p>
      </div>
    </div>
  );
}
