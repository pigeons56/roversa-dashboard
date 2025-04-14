"use client";

import styles from "./page.module.css";
import { useCookies } from "next-client-cookies";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function Welcome() {
  const cookies = useCookies();
  const username = cookies.get("username");
  const [data, setData] = useState<TableData[]>([]);
  const [isLoading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const addStudent = searchParams.get("addStudent");

  type TableData = {
    lastName: string;
    firstName: string;
    studentID: number;
    enrolledClasses: string[];
    assignedRoversas: string[];
  };

  function updateStudents() {
    fetch("../../api/dashboard/students", { method: "GET" }).then(() => {
      const studentsJSON = JSON.parse(cookies.get("students")!);
      const arr: TableData[] = [];

      for (let i = 0; i < studentsJSON.length; i++) {
        const studentID = studentsJSON[i].studentID;
      }

      //setData(arr);
      //setLoading(false);
    });
  }

  useEffect(() => {
    updateStudents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

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
            {/* {data.map((d, i) => (
              <button
                key={i}
                className={styles.button_white}
              >
                {d}
              </button>
            ))}
            {addStudent && <AddStudentPopup setLoading={setLoading} />} */}
          </tbody>
        </table>
      </div>
    </div>
  );
}
