"use client";

import styles from "./page.module.css";
import { useCookies } from "next-client-cookies";
import { useState, useEffect } from "react";

export default function Roversa() {
  const cookies = useCookies();
  const roversaName = cookies.get("currentRoversa");
  const roversaID = cookies.get("currentRoversaID");
  const [data, setData] = useState<TableData[]>([]);
  const [isLoading, setLoading] = useState(true);

  type TableData = {
    time: string;
    button: string;
    program: string;
    battery: number;
  };

  function fetchRoversaOutput() {
    fetch("../../api/dashboard/roversas/output", { method: "GET" }).then(() => {
      const roversaOutputJSON = JSON.parse(cookies.get("roversaOutput")!);
      const arr: TableData[] = [];
      for (let i = 0; i < roversaOutputJSON.length; i++) {
        const time =
          roversaOutputJSON[i]["DATE_FORMAT(datetime, '%m/%d/%Y %H:%i')"];
        const button = roversaOutputJSON[i].button;
        const program = roversaOutputJSON[i].program;
        const battery = roversaOutputJSON[i].battery;
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
    fetchRoversaOutput();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  useEffect(() => {
    setTimeout(() => {
      fetchRoversaOutput();
    }, 20000);
  });

  if (isLoading) {
    return (
      <div className={styles.content}>
        <div className={styles.title}>Roversa {roversaName}</div>
        <div className={styles.section}>Loading...</div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className={styles.content}>
        <div className={styles.title}>
          Roversa {roversaName} (ID: {roversaID})
        </div>
        <div className={styles.section}>No data yet!</div>
      </div>
    );
  }

  return (
    <div className={styles.content}>
      <div className={styles.title}>
        Roversa {roversaName} (ID: {roversaID})
      </div>
      <div className={styles.section}>
        <div className={styles.section_header}>Output</div>
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
                  <div className={styles.scrollable}>{d.time}</div>
                </td>
                <td>
                  <div className={styles.scrollable}>{d.button}</div>
                </td>
                <td>
                  <div className={styles.scrollable}>{d.program}</div>
                </td>
                <td>
                  <div className={styles.scrollable}>
                    %{((d.battery / 5.1) * 100).toFixed(0)}
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
