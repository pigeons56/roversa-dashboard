"use client";

import styles from "./page.module.css";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useCookies } from "next-client-cookies";
import { useEffect } from "react";
import Classes from "./classes";
import ClassPopup from "./class-popup";

export default function Welcome() {
  const cookies = useCookies();
  const router = useRouter();
  const username = cookies.get("username");
  const searchParams = useSearchParams();
  const createClass = searchParams.get("createClass");

  useEffect(() => {
    if (username == null) {
      router.push("../../");
    }
  }, [username]);

  return (
    <div className={styles.page}>
      <div className={styles.sidebar}>
        <div>
          <Image
            src="/images/roversalogowithwords-transparent.png"
            width={243}
            height={100}
            className={styles.img}
            alt="Roversa logo"
          />
        </div>
        <div>
          <a className={styles.button_purple}>My Students</a>
        </div>
        <Classes />
      </div>
      <div className={styles.content}>
        {createClass && <ClassPopup />}
        <div className={styles.title_centered}>
          Welcome to the Roversa Teacher Dashboard, {username}!
        </div>
        <div className={styles.subtitle_centered}>
          Use the sidebar to get started.
        </div>
      </div>
    </div>
  );
}
