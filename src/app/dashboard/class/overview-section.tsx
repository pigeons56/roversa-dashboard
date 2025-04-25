"use client";

import dashboardStyles from "@/app/dashboard/dashboard.module.css";
import { useState, useEffect } from "react";
import { useCookies } from "next-client-cookies";
import BatteryChart from "./battery-chart";

export default function OverviewSection() {
  const cookies = useCookies();
  const [data, setData] = useState<ChartData[]>([]);

  type ChartData = {
    name: string;
    value: number;
  };

  function updateBatteryData() {
    const robotsJSON = JSON.parse(cookies.get("robots")!);
    const batteryJSON = JSON.parse(cookies.get("battery")!);
    let high = 0;
    let mid = 0;
    let low = 0;
    for (let i = 0; i < robotsJSON.length; i++) {
      for (let j = 0; j < batteryJSON.length; j++) {
        if (batteryJSON[j].robotID == robotsJSON[i].robotID) {
          const batteryDecimal =
            (parseFloat(batteryJSON[j].battery) - 3.4) / 0.2;
          let batteryPercent = batteryDecimal * 100;
          if (batteryPercent > 100) batteryPercent = 100;
          if (batteryPercent < 0) batteryPercent = 0;
          // Set color according to battery
          if (batteryPercent > 70) high++;
          else if (batteryPercent > 40) mid++;
          else low++;
          break;
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

  useEffect(() => {
    setTimeout(() => {
      updateBatteryData();
    }, 3000);
  });

  return (
    <div className={dashboardStyles.section}>
      <div className={dashboardStyles.section_header}>Class Overview</div>
      <BatteryChart data={data} />
    </div>
  );
}
