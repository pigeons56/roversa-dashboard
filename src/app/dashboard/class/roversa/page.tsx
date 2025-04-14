"use client";

import styles from "./page.module.css";
import { useCookies } from "next-client-cookies";

export default function Roversa() {
  const cookies = useCookies();
  const username = cookies.get("username");
  const currentRoversa = cookies.get("currentRoversa");

  return (
    <div>
      <div className={styles.title}>Roversa {currentRoversa}</div>
    </div>
  );
}
