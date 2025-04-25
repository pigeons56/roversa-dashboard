"use client";

import pageStyles from "./page.module.css";
import dashboardStyles from "@/app/dashboard/dashboard.module.css";
import { useState, useEffect } from "react";
import { useCookies } from "next-client-cookies";
import Link from "next/link";
import ClassPopup from "./class-popup";
import { useRouter, useSearchParams } from "next/navigation";

export default function Classes() {
  const cookies = useCookies();
  const [data, setData] = useState<string[]>([]);
  const [isLoading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const createClass = searchParams.get("createClass");
  const router = useRouter();

  async function updateClasses() {
    const data = await fetch("/api/dashboard/classes", { method: "GET" });
    const dataJSON = await data.json();
    const classes = JSON.parse(dataJSON.classes);
    const arr: string[] = [];

    for (let i = 0; i < classes.length; i++) {
      arr.push(classes[i].className);
    }

    setData(arr);
    setLoading(false);
  }

  function handleClick(d: string) {
    cookies.set("currentClass", d);
    router.push("/dashboard/class");
  }

  useEffect(() => {
    updateClasses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  if (isLoading) {
    return (
      <div className={pageStyles.classes_section}>
        <div className={pageStyles.label_yellow}>Loading...</div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className={pageStyles.classes_section}>
        <div className={pageStyles.label_yellow}>No classes yet!</div>
        {createClass && <ClassPopup setLoading={setLoading} />}
        <Link
          href="?createClass=true"
          scroll={false}
          className={dashboardStyles.button_create}
        >
          Create New Class
        </Link>
      </div>
    );
  }

  return (
    <div className={pageStyles.classes_section}>
      {data.map((d, i) => (
        <button
          onClick={() => handleClick(d)}
          key={i}
          className={dashboardStyles.button_white}
        >
          {d}
        </button>
      ))}
      {createClass && <ClassPopup setLoading={setLoading} />}
      <Link
        href="?createClass=true"
        scroll={false}
        className={dashboardStyles.button_create}
      >
        Create New Class
      </Link>
    </div>
  );
}
