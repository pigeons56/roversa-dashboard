"use client";

import styles from "./page.module.css";
import { useState, useEffect } from "react";
import { useCookies } from "next-client-cookies";
import Link from "next/link";
import RoversaPopup from "./roversa-popup";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

export default function RoversaSection() {
  const cookies = useCookies();
  const currentClass = cookies.get("currentClass");
  const [data, setData] = useState<string[]>([]);
  const [isLoading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const addRoversa = searchParams.get("addRoversa");
  const router = useRouter();

  function updateRoversas() {
    fetch("../../api/dashboard/roversas", { method: "GET" }).then(() => {
      const roversasJSON = JSON.parse(cookies.get("roversas")!);
      const arr: string[] = [];

      for (let i = 0; i < roversasJSON.length; i++) {
        arr.push(roversasJSON[i].displayName);
      }

      setData(arr);
      setLoading(false);
    });
  }

  function handleClick(d: string) {
    cookies.set("currentRoversa", d);
    router.push("/dashboard/class/roversa");
  }

  useEffect(() => {
    updateRoversas();
  }, [isLoading, currentClass]);

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
        <Link
          href="?addRoversa=true"
          scroll={false}
          className={styles.add_button}
        >
          +
        </Link>
      </div>
      <div>
        {addRoversa && <RoversaPopup setLoading={setLoading} />}
        {data.map((d, i) => (
          <button
            onClick={() => handleClick(d)}
            key={i}
            className={styles.roversa_card}
          >
            {d}
          </button>
        ))}
      </div>
    </div>
  );
}
