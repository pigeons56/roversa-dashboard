"use client";

import dashboardStyles from "@/app/dashboard/dashboard.module.css";
import { useCookies } from "next-client-cookies";
import { useState, useEffect } from "react";
import { calcBatteryPercent } from "@/app/dashboard/battery-functions";

export default function Robot() {
  const cookies = useCookies();
  const robotID = cookies.get("currentRobotID");
  const [data, setData] = useState<TableData[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [isTimeToUpdate, setTimeToUpdate] = useState(true);

  type TableData = {
    time: string;
    button: string;
    program: string;
    battery: number;
  };

  async function fetchRobotOutput() {
    const data = await fetch("/api/dashboard/robot/output", {
      method: "GET",
    });
    const robotOutput = (await data.json()).robotOutput;
    const arr: TableData[] = [];

    for (let i = 0; i < robotOutput.length; i++) {
      const time = robotOutput[i]["DATE_FORMAT(datetime, '%m/%d/%Y %H:%i')"];
      const button = robotOutput[i].button;
      const program = robotOutput[i].program;
      const battery = robotOutput[i].battery;

      const row: TableData = {
        time: time,
        button: button,
        program: program,
        battery: calcBatteryPercent(battery),
      };
      arr.push(row);
    }
    setData(arr);
    setLoading(false);
  }

  useEffect(() => {
    if (isLoading) {
      fetchRobotOutput().then(() => setLoading(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  useEffect(() => {
    if (isTimeToUpdate) {
      setTimeToUpdate(false);

      fetchRobotOutput();

      setTimeout(() => {
        setTimeToUpdate(true);
      }, 10000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTimeToUpdate]);

  if (isLoading) {
    return (
      <div>
        <div className={dashboardStyles.title}>
          Robot Output (ID: {robotID})
        </div>
        <div className={dashboardStyles.section_table}>Loading...</div>
      </div>
    );
  }

  return (
    <div>
      <div className={dashboardStyles.title}>Robot Output (ID: {robotID})</div>
      <div className={dashboardStyles.section_table}>
        <div className={dashboardStyles.section_header}>Output</div>
        <table>
          <tbody>
            <tr>
              <th style={{ width: "20%" }}>Datetime</th>
              <th style={{ width: "10%" }}>Button</th>
              <th style={{ width: "64%" }}>Program</th>
              <th style={{ width: "6%" }}>Battery</th>
            </tr>
            {data.map((d, i) => (
              <tr key={i}>
                <td>
                  <div className={dashboardStyles.scrollable}>{d.time}</div>
                </td>
                <td>
                  <div className={dashboardStyles.scrollable}>{d.button}</div>
                </td>
                <td>
                  <div className={dashboardStyles.scrollable}>{d.program}</div>
                </td>
                <td>
                  <div className={dashboardStyles.scrollable}>
                    {d.battery.toFixed(0)}%
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
