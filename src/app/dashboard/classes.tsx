"use client";

import styles from "./page.module.css";
import { useState, useEffect } from "react";
import { useCookies } from "next-client-cookies";
import Link from "next/link";
import ClassPopup from "./class-popup";
import { useRouter, useSearchParams } from "next/navigation";

export default function Classes() {
  const cookies = useCookies();
  const [data, setData] = useState<string[]>([]);
  const [isLoading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const createClass = searchParams.get("createClass");
  const router = useRouter();

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

  function handleClick(d: string) {
    cookies.set("currentClass", d);
    router.push("./class");
  }

  useEffect(() => {
    updateClasses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  if (isLoading) {
    return (
      <div className={styles.classes_bar}>
        <div className={styles.error_label}>Loading...</div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className={styles.classes_bar}>
        <div className={styles.error_label}>No classes yet!</div>
        {createClass && <ClassPopup setLoading={setLoading} />}
        <Link
          href="?createClass=true"
          scroll={false}
          className={styles.new_circle}
        >
          +
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.classes_bar}>
      {data.map((d, i) => (
        <button
          onClick={() => handleClick(d)}
          key={i}
          className={styles.button_white}
        >
          {d}
        </button>
      ))}
      {createClass && <ClassPopup setLoading={setLoading} />}
      <Link
        href="?createClass=true"
        scroll={false}
        className={styles.new_circle}
      >
        +
      </Link>
    </div>
  );
}
