"use client";

import styles from "./page.module.css";
import { useCookies } from "next-client-cookies";
import Roversas from "./roversas";

export default function Class() {
  const cookies = useCookies();
  const className = cookies.get("currentClass");

  return (
    <div>
      <div className={styles.title}>Class {className}</div>
      <div>
        <button className={styles.button_yellow}>Edit Class</button>
        <button className={styles.button_yellow}>Edit Students</button>
      </div>
      <div className={styles.section}>Class Overview</div>
      <div className={styles.section}>
        Roversas
        <div>
          <Roversas />
          <Roversas />
          <Roversas />
          <Roversas />
          <Roversas />
          <Roversas />
          <Roversas />
          <Roversas />
          <Roversas />
          <Roversas />
          <Roversas />
          <Roversas />
        </div>
      </div>
    </div>
  );
}
