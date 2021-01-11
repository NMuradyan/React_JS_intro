import React from "react";
import about from "../../../Assets/images/aboutPage.jpg";
import styles from "./about.module.css";

export default function About() {
  return (
    <div className={styles.mainDiv}>
      <div className={styles.aboutText}>
        <div className={styles.aboutTitle}>ABOUT US</div>
        <p>This page is created by Narek Muradyan.</p>
      </div>

      <div className={styles.aboutImage}>
        <img src={about} alt="about" />
      </div>
    </div>
  );
}
