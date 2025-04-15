"use client";

import styles from "./page.module.css";
import { useCookies } from "next-client-cookies";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function Students() {
  const cookies = useCookies();
  const [data, setData] = useState<TableData[]>([]);
  const [studentIDs, setStudentIDs] = useState<string[]>([]);
  const searchParams = useSearchParams();
  const addStudent = searchParams.get("addStudent");
  const [isWaitingForStudentData, setWaitingForStudentData] = useState(true);
  const [isLoading, setLoading] = useState(true);

  type TableData = {
    lastName: string;
    firstName: string;
    studentID: number;
    enrolledClasses: string;
    assignedRoversas: string;
  };

  function fetchStudentIDs() {
    fetch("../../api/dashboard/students", { method: "GET" }).then(() => {
      const studentsJSON = JSON.parse(cookies.get("students")!);
      const arr: string[] = [];
      for (let i = 0; i < studentsJSON.length; i++) {
        arr.push(studentsJSON[i].studentID);
      }
      setStudentIDs(arr);
      setLoading(false);
      setWaitingForStudentData(false);
    });
  }

  async function setTable() {
    const arr: TableData[] = [];
    for (let i = 0; i < studentIDs.length; i++) {
      const response = await fetch("../../api/dashboard/students", {
        method: "POST",
        body: JSON.stringify({ studentID: studentIDs[i] }),
      });

      if (response.ok) {
        const namesJSON = JSON.parse(cookies.get("studentName")!);
        const firstName = namesJSON[0].firstName;
        const lastName = namesJSON[0].lastName;
        const studentID = parseInt(studentIDs[i]);

        const studentRoversasJSON = JSON.parse(cookies.get("studentRoversas")!);
        let studentRoversas = "";
        for (let j = 0; j < studentRoversasJSON.length; j++) {
          studentRoversas += `${studentRoversasJSON[j].roversaName} (${studentRoversasJSON[j].className}), `;
        }

        // strip last 2 chars
        studentRoversas = studentRoversas.substring(
          0,
          studentRoversas.length - 2
        );

        const studentClassesJSON = JSON.parse(cookies.get("studentClasses")!);
        let studentClasses = "";
        for (let j = 0; j < studentClassesJSON.length; j++) {
          studentClasses += `${studentClassesJSON[j].className}, `;
        }

        // strip last 2 chars
        studentClasses = studentClasses.substring(0, studentClasses.length - 2);

        const studentData: TableData = {
          lastName: lastName,
          firstName: firstName,
          studentID: studentID,
          enrolledClasses: studentClasses,
          assignedRoversas: studentRoversas,
        };
        arr.push(studentData);
      } else {
        // Handle errors
        console.log(response.status);
      }
    }
    setData(arr);
    setLoading(false);
  }

  useEffect(() => {
    fetchStudentIDs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  useEffect(() => {
    setTable();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isWaitingForStudentData]);

  if (isLoading || isWaitingForStudentData) {
    return (
      <div className={styles.content}>
        <div className={styles.title}>My Students</div>
        <div className={styles.section}>Loading...</div>
      </div>
    );
  } else if (data.length === 0) {
    return (
      <div className={styles.content}>
        <div className={styles.title}>My Students</div>
        <div className={styles.section}>No students yet!</div>
      </div>
    );
  }

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
            {data.map((d, i) => (
              <tr key={i}>
                <td>
                  <div className={styles.scrollable}>{d.firstName}</div>
                </td>
                <td>
                  <div className={styles.scrollable}>{d.lastName}</div>
                </td>
                <td>
                  <div className={styles.scrollable}>{d.studentID}</div>
                </td>
                <td>
                  <div className={styles.scrollable}>{d.enrolledClasses}</div>
                </td>
                <td>
                  <div className={styles.scrollable}>{d.assignedRoversas}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
