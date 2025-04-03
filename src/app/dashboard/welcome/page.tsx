"use client";

import styles from "./page.module.css";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

export default function Welcome() {
  const searchParams = useSearchParams();
  const username = searchParams.get("username");
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
      </div>
      <div className={styles.content}>
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
