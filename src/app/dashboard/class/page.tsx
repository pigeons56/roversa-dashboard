"use client";

import dashboardStyles from "@/app/dashboard/dashboard.module.css";
import { useCookies } from "next-client-cookies";
import RoversaSection from "./roversa-section";
import OverviewSection from "./overview-section";

export default function Class() {
  const cookies = useCookies();
  const className = cookies.get("currentClass");

  return (
    <div>
      <div className={dashboardStyles.title}>Class {className}</div>
      <div>
        <button className={dashboardStyles.button_purple}>Edit Class</button>
        <button className={dashboardStyles.button_purple}>Edit Students</button>
      </div>
      <OverviewSection />
      <RoversaSection />
    </div>
  );
}
