"use client";

import styles from "./page.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCookies } from "next-client-cookies";
import { useEffect } from "react";
import Classes from "./classes";

export default function SidebarLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookies = useCookies();
  const router = useRouter();
  const username = cookies.get("username");

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
          <button type="button" className={styles.button_purple}>
            My Students
          </button>
        </div>
        <div className={styles.my_classes_label}>My Classes</div>
        <Classes />
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  );
}
