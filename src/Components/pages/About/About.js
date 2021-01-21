import React from "react";
import about from "../../../Assets/images/aboutPage1.jpg";
import styles from "./about.module.css";

export default function About() {
  return (
    <div
      className={styles.mainDiv}
      style={{ backgroundImage: `url(${about})` }}
    >
      <div className={styles.aboutText}>
        <div className={styles.aboutTitle}>Be Organized</div>
        <div className={styles.aboutTextOne}>
          <p>Organize your life in seconds</p>
        </div>
        <div className={styles.aboutTextTwo}>
          <p>Organize your tasks, lists and reminders in one place</p>
        </div>
        <div className={styles.aboutTextThree}>
          <p>Manage your to do list online</p>
        </div>
        <div className={styles.aboutTextFour}>
          <p>Make managing tasks easier</p>
        </div>
      </div>
    </div>
  );
}
