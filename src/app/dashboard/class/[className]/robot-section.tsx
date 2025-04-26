"use client";

import pageStyles from "./page.module.css";
import dashboardStyles from "@/app/dashboard/dashboard.module.css";
import { useState, useEffect } from "react";
import { useCookies } from "next-client-cookies";
import {
  calcBatteryPercent,
  fetchRobotBattery,
  fetchAllLatestRobotBatteryInClass,
} from "@/app/dashboard/battery-functions";
import { useRouter } from "next/navigation";

export default function RobotSection() {
  const cookies = useCookies();
  const [data, setData] = useState<Robot[]>([]);
  const [isLoading, setLoading] = useState(true);
  const router = useRouter();
  const [isTimeToUpdate, setTimeToUpdate] = useState(true);

  type Robot = {
    ID: number;
    name: string;
    battery: number;
    cardColor: string;
  };

  async function mapRobotBattery() {
    const batteryArr = await fetchAllLatestRobotBatteryInClass();
    let batteryMap = new Map<number, number>();
    for (let i = 0; i < batteryArr.length; i++) {
      const key = batteryArr[i].robotID;
      if (!batteryMap.has(key)) {
        const value = calcBatteryPercent(batteryArr[i].battery);
        batteryMap.set(key, value);
      }
    }
    return batteryMap;
  }

  async function updateAllCards() {
    const batteryMap = await mapRobotBattery();
    let newData: Robot[] = [];
    for (let i = 0; i < data.length; i++) {
      const battery = batteryMap.get(data[i].ID)!;
      const cardColor = calcCardColor(battery);
      newData.push({
        ID: data[i].ID,
        name: data[i].name,
        battery: battery,
        cardColor: cardColor,
      });
    }
    setData(newData);
  }

  function calcCardColor(batteryPercent: number) {
    if (batteryPercent >= 70) {
      return "green";
    } else if (batteryPercent >= 40) {
      return "yellow";
    } else if (batteryPercent >= 0) {
      return "red";
    }
    return "gray";
  }

  async function fetchRobotName() {
    const data = await fetch("/api/dashboard/robot/name/by-id", {
      method: "GET",
    });
    const name = (await data.json()).robotName;
    return name;
  }

  async function addCard(ID: number, name: string = "") {
    cookies.set("robotID", ID.toString());
    const battery = await fetchRobotBattery();
    const cardColor = calcCardColor(battery);

    if (name == "") {
      name = await fetchRobotName();
    }

    let arr: Robot = {
      ID: ID,
      name: name,
      battery: battery,
      cardColor: cardColor,
    };

    setData((data) => [...data, arr]);
  }

  async function fetchAllRobotIDs() {
    const data = await fetch("/api/dashboard/robot/id/by-class", {
      method: "GET",
    });
    const dataJSON = await data.json();
    const robotIDs = JSON.parse(dataJSON.robotIDs);
    const arr: number[] = [];

    for (let i = 0; i < robotIDs.length; i++) {
      arr.push(robotIDs[i].robotID);
    }

    return arr;
  }

  async function initCards() {
    const robotIDs = await fetchAllRobotIDs();
    for (let i = 0; i < robotIDs.length; i++) {
      await addCard(robotIDs[i]);
    }
  }

  function toRobotOutput(robotID: number) {
    cookies.set("currentRobotID", robotID.toString());
    router.push("/dashboard/robot/" + robotID);
  }

  useEffect(() => {
    if (isLoading) {
      initCards().then(() => setLoading(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  useEffect(() => {
    if (isTimeToUpdate) {
      setTimeToUpdate(false);

      updateAllCards();

      setTimeout(() => {
        setTimeToUpdate(true);
      }, 10000);
    }
  }, [isTimeToUpdate]);

  if (isLoading) {
    return (
      <div className={dashboardStyles.section}>
        <div className={dashboardStyles.section_header}>Robots</div>
        <h5>Loading...</h5>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className={dashboardStyles.section}>
        <div className={dashboardStyles.section_header}>Robots</div>
        <h5>No Robots yet!</h5>
      </div>
    );
  }

  return (
    <div className={dashboardStyles.section}>
      <div className={dashboardStyles.section_header}>Robots</div>
      <div>
        {data.map((d, i) => (
          <span
            key={i}
            className={pageStyles.robot_card}
            style={{ backgroundColor: `var(--${d.cardColor})` }}
          >
            {d.name}
            <div> Battery: {d.battery.toFixed(0)}% </div>
            <button
              onClick={() => toRobotOutput(d.ID)}
              className={pageStyles.robot_card_button}
            >
              View Output Log
            </button>
            <button onClick={() => {}} className={pageStyles.robot_card_button}>
              Mark as Done
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}
