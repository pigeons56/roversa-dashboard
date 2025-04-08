"use client";

import styles from "./page.module.css";
import { useState, useEffect } from "react";
import { useCookies } from "next-client-cookies";
import Link from "next/link";
import RoversaPopup from "./roversa-popup";
import { useSearchParams } from "next/navigation";

export default function RoversaSection() {
  const cookies = useCookies();
  const [data, setData] = useState<string[]>([]);
  const [isLoading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const addRoversa = searchParams.get("addRoversa");

  function updateRoversas() {
    fetch("../../api/dashboard/roversas", { method: "GET" }).then(() => {
      const classesJSON = JSON.parse(cookies.get("roversas")!);
      const arr: string[] = [];

      for (let i = 0; i < classesJSON.length; i++) {
        arr.push(classesJSON[i].roversaName);
      }

      setData(arr);
      setLoading(false);
    });
  }

  useEffect(() => {
    updateRoversas();
  }, [isLoading]);

  if (isLoading) {
    return (
      <div className={styles.section}>
        <div className={styles.section_header}>Roversas</div>
        <h5>Loading...</h5>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className={styles.section}>
        <div className={styles.section_header}>
          Roversas
          <Link
            href="?addRoversa=true"
            className={styles.add_button}
            scroll={false}
          >
            +
          </Link>
        </div>
        {addRoversa && <RoversaPopup setLoading={setLoading} />}
        <h5>No Roversas yet!</h5>
      </div>
    );
  }

  return (
    <div className={styles.section}>
      <div className={styles.section_header}>
        Roversas
        <Link href="?addRoversa=true" className={styles.add_button}>
          +
        </Link>
      </div>
      <div>
        {addRoversa && <RoversaPopup setLoading={setLoading} />}
        <span className={styles.roversa_card}>Roversa1</span>
      </div>
    </div>
  );
}
