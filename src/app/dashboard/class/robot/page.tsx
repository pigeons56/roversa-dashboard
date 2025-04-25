"use client";

import pageStyles from "./page.module.css";
import dashboardStyles from "@/app/dashboard/dashboard.module.css";
import { useCookies } from "next-client-cookies";
import { useState, useEffect } from "react";

export default function Robot() {
  const cookies = useCookies();
  const robotName = cookies.get("currentRobot");
  const robotID = cookies.get("currentRobotID");
  const [data, setData] = useState<TableData[]>([]);
  const [isLoading, setLoading] = useState(true);

  type TableData = {
    time: string;
    button: string;
    program: string;
    battery: number;
  };

  function fetchRobotOutput() {
    fetch("/api/dashboard/robots/output", { method: "GET" }).then(() => {
      const robotOutputJSON = JSON.parse(cookies.get("robotOutput")!);
      const arr: TableData[] = [];
      for (let i = 0; i < robotOutputJSON.length; i++) {
        const time =
          robotOutputJSON[i]["DATE_FORMAT(datetime, '%m/%d/%Y %H:%i')"];
        const button = robotOutputJSON[i].button;
        const program = robotOutputJSON[i].program;
        const battery = robotOutputJSON[i].battery;
        const row: TableData = {
          time: time,
          button: button,
          program: program,
          battery: battery,
        };
        arr.push(row);
      }
      setData(arr);
      setLoading(false);
    });
  }

  useEffect(() => {
    fetchRobotOutput();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  if (isLoading) {
    return (
      <div>
        <div className={dashboardStyles.title}>Robot {robotName}</div>
        <div className={dashboardStyles.section}>Loading...</div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div>
        <div className={dashboardStyles.title}>
          Robot {robotName} (ID: {robotID})
        </div>
        <div className={dashboardStyles.section}>No data yet!</div>
      </div>
    );
  }

  return (
    <div>
      <div className={dashboardStyles.title}>
        Robot {robotName} (ID: {robotID})
      </div>
      <div>
        <button className={dashboardStyles.button_purple}>Refresh</button>
      </div>
      <div className={dashboardStyles.section}>
        <div className={dashboardStyles.section_header}>Output</div>
        <table>
          <tbody>
            <tr>
              <th style={{ width: "30%" }}>Datetime</th>
              <th style={{ width: "10%" }}>Button</th>
              <th style={{ width: "50%" }}>Program</th>
              <th style={{ width: "10%" }}>Battery</th>
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
                    {d.battery < 3.4
                      ? 0
                      : d.battery > 3.65
                      ? 100
                      : (((d.battery - 3.4) / 0.25) * 100).toFixed(0)}
                    %
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
