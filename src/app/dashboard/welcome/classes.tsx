"use client";

import styles from "./page.module.css";
import { useState, useEffect } from "react";
import { useCookies } from "next-client-cookies";
import Link from "next/link";

export default function Classes() {
  const cookies = useCookies();
  const [data, setData] = useState<string[]>([]);
  const [isLoading, setLoading] = useState(true);

  function updateClasses() {
    fetch("../../api/dashboard/classes", { method: "GET" }).then(() => {
      const classesJSON = JSON.parse(cookies.get("classes")!);
      const arr: string[] = [];

      for (let i = 0; i < classesJSON.length; i++) {
        arr.push(classesJSON[i].className);
      }

      setData(arr);
      setLoading(false);
    });
  }

  useEffect(() => {
    updateClasses();
  }, []);

  if (isLoading) {
    return (
      <div className={styles.classes_bar}>
        <div className={styles.my_classes_label}>My Classes</div>
        <div className={styles.error_label}>Loading...</div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className={styles.classes_bar}>
        <div className={styles.my_classes_label}>My Classes</div>
        <div className={styles.error_label}>No classes yet!</div>
      </div>
    );
  }

  return (
    <div className={styles.classes_bar}>
      <div className={styles.my_classes_label}>My Classes</div>
      {data.map((d, i) => (
        <div key={i} className={styles.button_white}>
          {d}
        </div>
      ))}
      <Link href="?createClass=true" className={styles.new_circle}>
        +
      </Link>
    </div>
  );
}
