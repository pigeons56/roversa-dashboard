"use client";

import styles from "./page.module.css";
import { useCookies } from "next-client-cookies";

export default function Welcome() {
  const cookies = useCookies();
  const username = cookies.get("username");

  return (
    <div className={styles.content}>
      <div className={styles.title_centered}>
        Welcome to the Roversa Teacher Dashboard, {username}!
      </div>
      <div className={styles.subtitle_centered}>
        Use the navigation bar on the left to get started.
      </div>
    </div>
  );
}
