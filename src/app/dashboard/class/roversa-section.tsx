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
  const [batteryData, setBatteryData] = useState<string[]>([]);
  const [roversaCardColor, setroversaCardColor] = useState<string[]>([]);
  const [isLoading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const addRoversa = searchParams.get("addRoversa");
  const router = useRouter();

  function updateBatteryLevel() {
    fetch("../../api/dashboard/roversas/battery", { method: "GET" }).then(
      () => {
        const roversasJSON = JSON.parse(cookies.get("roversas")!);
        const batteryJSON = JSON.parse(cookies.get("battery")!);
        const battery_arr: string[] = [];
        const color_arr: string[] = [];

        for (let i = 0; i < roversasJSON.length; i++) {
          battery_arr.push("Data Not Found");
          color_arr.push("gray");
          for (let j = 0; j < batteryJSON.length; j++) {
            if (batteryJSON[j].roversaID == roversasJSON[i].roversaID) {
              // Set battery percent
              let batteryPercent =
                (parseFloat(batteryJSON[j].battery) / 5.1) * 100;
              if (batteryPercent > 100) batteryPercent = 100;

              // Set color according to battery
              if (batteryPercent > 70) color_arr[i] = "green";
              else if (batteryPercent > 40) color_arr[i] = "yellow";
              else color_arr[i] = "red";

              battery_arr[i] = "%" + batteryPercent.toFixed(0);
              break;
            }
          }
        }

        setBatteryData(battery_arr);
        setroversaCardColor(color_arr);
      }
    );
  }

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

  useEffect(() => {
    setTimeout(() => {
      updateBatteryLevel();
    }, 20000);
  });

  useEffect(() => {
    updateBatteryLevel();
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
            style={{ backgroundColor: `var(--${roversaCardColor[i]})` }}
          >
            {d}
            <div> {batteryData[i]} </div>
          </button>
        ))}
      </div>
    </div>
  );
}
