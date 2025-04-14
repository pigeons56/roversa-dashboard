"use client";

import styles from "./page.module.css";
import { useCookies } from "next-client-cookies";

export default function Welcome() {
  const cookies = useCookies();
  const username = cookies.get("username");

  return (
    <div className={styles.content}>
      <div className={styles.title}>My Students</div>
      <div className={styles.section}>
        <table>
          <tbody>
            <tr>
              <th style={{ width: "20%" }}>First Name</th>
              <th style={{ width: "20%" }}>Last Name</th>
              <th style={{ width: "10%" }}>ID</th>
              <th style={{ width: "25%" }}>Enrolled Classes</th>
              <th style={{ width: "25%" }}>Assigned Roversas</th>
            </tr>
            <tr>
              <td>
                <div className={styles.scrollable}>John</div>
              </td>
              <td>
                <div className={styles.scrollable}>Doe</div>
              </td>
              <td>
                <div className={styles.scrollable}>1</div>
              </td>
              <td>
                <div className={styles.scrollable}>class1, class2</div>
              </td>
              <td>
                <div className={styles.scrollable}>roversa2(class1)</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
