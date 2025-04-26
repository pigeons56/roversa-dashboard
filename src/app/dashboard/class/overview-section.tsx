"use client";

import dashboardStyles from "@/app/dashboard/dashboard.module.css";
import { useState, useEffect } from "react";
import BatteryChart from "./battery-chart";
import {
  calcBatteryPercent,
  fetchAllLatestRobotBatteryInClass,
} from "../battery-functions";

export default function OverviewSection() {
  const [data, setData] = useState<ChartData[]>([]);
  const [isTimeToUpdate, setTimeToUpdate] = useState(true);

  type ChartData = {
    name: string;
    value: number;
  };

  async function getUpdatedBattery() {
    let high: number = 0,
      low: number = 0,
      mid: number = 0;
    const batteryArr = await fetchAllLatestRobotBatteryInClass();
    let seenIDs: number[] = [];
    for (let i = 0; i < batteryArr.length; i++) {
      const ID = batteryArr[i].robotID;
      if (!seenIDs.includes(ID)) {
        seenIDs.push(ID);
        const battery = calcBatteryPercent(batteryArr[i].battery);
        if (battery >= 70) {
          high++;
        } else if (battery >= 40) {
          mid++;
        } else if (battery >= 0) {
          low++;
        }
      }
    }
    const arr: ChartData[] = [
      { name: "Low Battery", value: low },
      { name: "Mid Battery", value: mid },
      { name: "High Battery", value: high },
    ];
    setData(arr);
  }

  // useEffect(() => {
  //   setTimeout(() => {
  //     updateBatteryData();
  //   }, 3000);
  // });

  useEffect(() => {
    if (isTimeToUpdate) {
      setTimeToUpdate(false);

      getUpdatedBattery();

      setTimeout(() => {
        setTimeToUpdate(true);
      }, 10000);
    }
  }, [isTimeToUpdate]);

  return (
    <div className={dashboardStyles.section}>
      <div className={dashboardStyles.section_header}>Class Overview</div>
      <BatteryChart data={data} />
    </div>
  );
}
