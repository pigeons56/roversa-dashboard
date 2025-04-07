"use client";

import styles from "./page.module.css";
import { useSearchParams } from "next/navigation";
import { useCookies } from "next-client-cookies";

export default function Class() {
  const cookies = useCookies();
  const searchParams = useSearchParams();
  const key = searchParams.get("key")!;
  const classesJSON = JSON.parse(cookies.get("classes")!);
  const className = classesJSON[key].className;

  return <div className={styles.title}>Class {className}</div>;
}
