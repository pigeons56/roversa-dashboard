"use client";

import styles from "./page.module.css";
import { useCookies } from "next-client-cookies";
import RoversaSection from "./roversa-section";
import OverviewSection from "./overview-section";

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
      <OverviewSection />
      <RoversaSection />
    </div>
  );
}
