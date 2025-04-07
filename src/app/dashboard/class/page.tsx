"use client";

import styles from "./page.module.css";
import { useCookies } from "next-client-cookies";

export default function Class() {
  const cookies = useCookies();
  const className = cookies.get("currentClass");

  return <div className={styles.title}>Class {className}</div>;
}
