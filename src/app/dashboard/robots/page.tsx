"use client";

import dashboardStyles from "@/app/dashboard/dashboard.module.css";
import pageStyles from "./page.module.css";
import { useCookies } from "next-client-cookies";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { fetchRobotBattery } from "@/app/dashboard/battery";
import RobotPopup from "./robot-popup";
import Link from "next/link";

export default function Robots() {
  const cookies = useCookies();
  const [data, setData] = useState<TableData[]>([]);
  const searchParams = useSearchParams();
  const connectRobot = searchParams.get("connectRobot");
  const [isLoading, setLoading] = useState(true);
  const router = useRouter();

  type TableData = {
    robotID: number;
    battery: number;
    assignedClasses: string[];
    assignedStudents: string[];
  };

  async function fetchRobotClasses() {
    const data = await fetch("/api/dashboard/robot/classes", {
      method: "GET",
    });
    const classes = (await data.json()).robotClasses;
    const arr: string[] = [];
    for (let i = 0; i < classes.length; i++) {
      arr.push(`${classes[i].className} (${classes[i].displayName})`);
    }
    return arr;
  }

  async function fetchRobotStudents(classes: string[]) {
    const data = await fetch("/api/dashboard/robot/students", {
      method: "GET",
    });
    const students = (await data.json()).robotStudents;
    const arr: string[] = [];
    let strBuilder: string = "";

    for (let i = 0; i < classes.length; i++) {
      strBuilder += classes[i] + ": ";
      let classHasStudent = false;
      for (let j = 0; j < students.length; j++) {
        if (classes[i].includes(students[j].className)) {
          strBuilder +=
            students[j].firstName + " " + students[j].lastName + ", ";
          classHasStudent = true;
        }
      }
      if (classHasStudent) {
        strBuilder = strBuilder.slice(0, -2);
        arr.push(strBuilder);
      }
      strBuilder = "";
    }
    return arr;
  }

  async function addRobotToTable(ID: number) {
    cookies.set("robotID", ID.toString());
    const classes = await fetchRobotClasses();
    const students = await fetchRobotStudents(classes);
    const battery = await fetchRobotBattery();

    const arr: TableData = {
      robotID: ID,
      battery: battery,
      assignedClasses: classes,
      assignedStudents: students,
    };

    setData((data) => [...data, arr]);
  }

  async function fetchAllRobotIDs() {
    const data = await fetch("/api/dashboard/robot/id/all", { method: "GET" });
    const dataJSON = await data.json();
    const robotIDs = JSON.parse(dataJSON.robotIDs);
    const arr: number[] = [];

    for (let i = 0; i < robotIDs.length; i++) {
      arr.push(robotIDs[i].robotID);
    }

    return arr;
  }

  async function initTable() {
    const robotIDs = await fetchAllRobotIDs();
    for (let i = 0; i < robotIDs.length; i++) {
      await addRobotToTable(robotIDs[i]);
    }
  }

  function toRobotOutput(robotID: number) {
    cookies.set("currentRobotID", robotID.toString());
    router.push("/dashboard/robot/" + robotID);
  }

  useEffect(() => {
    if (isLoading) {
      initTable().then(() => setLoading(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  if (isLoading) {
    return (
      <div>
        <div className={dashboardStyles.title}>My Robots</div>
        <div className={dashboardStyles.section_table}>Loading...</div>
      </div>
    );
  } else if (data.length === 0) {
    return (
      <div>
        <div className={dashboardStyles.title}>My Robots</div>
        <Link
          scroll={false}
          className={dashboardStyles.button_purple}
          href="?connectRobot=true"
        >
          Add
        </Link>
        {connectRobot && <RobotPopup addRobotToTable={addRobotToTable} />}
        <div className={dashboardStyles.section_table}>
          No robots connected yet!
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className={dashboardStyles.title}>My Robots</div>
      <Link
        className={dashboardStyles.button_purple}
        scroll={false}
        href="?connectRobot=true"
      >
        Add
      </Link>
      <button className={dashboardStyles.button_purple}>Edit</button>
      <button className={dashboardStyles.button_red}>Remove</button>
      {connectRobot && <RobotPopup addRobotToTable={addRobotToTable} />}
      <div className={dashboardStyles.section_table}>
        <table>
          <tbody>
            <tr>
              <th style={{ width: "15%" }}>ID</th>
              <th style={{ width: "6%" }}>Battery</th>
              <th style={{ width: "31%" }}>Assigned Classes (Display Name)</th>
              <th style={{ width: "31%" }}>Assigned Students</th>
              <th style={{ width: "12%" }}></th>
            </tr>
            {data.map((d, i) => (
              <tr key={i}>
                <td>
                  <div className={dashboardStyles.scrollable}>{d.robotID}</div>
                </td>
                <td>
                  <div className={dashboardStyles.scrollable}>
                    {d.battery.toFixed(0)}%
                  </div>
                </td>
                <td>
                  {d.assignedClasses.map((c, j) => (
                    <span key={j} className={dashboardStyles.scrollable}>
                      {c}
                      {j < d.assignedClasses.length - 1 ? ", " : " "}
                    </span>
                  ))}
                </td>
                <td>
                  {d.assignedStudents.map((r, j) => (
                    <div key={j} className={dashboardStyles.scrollable}>
                      {r}
                    </div>
                  ))}
                </td>
                <td>
                  <button
                    className={pageStyles.table_button}
                    onClick={() => toRobotOutput(d.robotID)}
                  >
                    View Output
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
