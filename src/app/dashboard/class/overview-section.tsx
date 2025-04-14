"use client";

import styles from "./page.module.css";
import { useState, useEffect } from "react";
import { useCookies } from "next-client-cookies";
import Link from "next/link";
import RoversaPopup from "./roversa-popup";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import BarChartComponent from "./battery-chart";

export default function OverviewSection() {
  const cookies = useCookies();
  const currentClass = cookies.get("currentClass");
  const [data, setData] = useState<ChartData[]>([]);

  type ChartData = {
    name: string;
    value: number;
  };

  function updateBatteryData() {
    const battery = cookies.get("battery");
  }

  return (
    <div className={styles.section}>
      <div className={styles.section_header}>Class Overview</div>
      <BarChartComponent data={data} />
    </div>
  );
}
