"use client";

import pageStyles from "./page.module.css";
import dashboardStyles from "@/app/dashboard/dashboard.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCookies } from "next-client-cookies";
import { useEffect } from "react";
import Classes from "./classes";
import Link from "next/link";

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
  }, [router, username]);
  return (
    <div className={pageStyles.page}>
      <div className={pageStyles.sidebar}>
        <div>
          <Link href="/dashboard/welcome">
            <Image
              src="/images/roversalogowithwords-transparent.png"
              width={243}
              height={100}
              className={pageStyles.img}
              alt="Robot logo"
            />{" "}
          </Link>
        </div>
        <div>
          <button
            type="button"
            className={dashboardStyles.button_dpurple}
            onClick={() => router.push("/dashboard/students")}
          >
            My Students
          </button>
        </div>
        <div>
          <button
            type="button"
            className={dashboardStyles.button_dpurple}
            onClick={() => router.push("/dashboard/robots")}
          >
            My Robots
          </button>
        </div>
        <Classes />
      </div>
      <div className={pageStyles.content}>{children}</div>
    </div>
  );
}
