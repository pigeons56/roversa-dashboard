"use client";

import dashboardStyles from "@/app/dashboard/dashboard.module.css";
import { useCookies } from "next-client-cookies";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import StudentsPopup from "./students-popup";
import Link from "next/link";

export default function Students() {
  const cookies = useCookies();
  const [data, setData] = useState<TableData[]>([]);
  const [studentDataArr, setStudentDataArr] = useState<studentData[]>([]);
  const searchParams = useSearchParams();
  const addStudent = searchParams.get("addStudent");
  const [isLoading, setLoading] = useState(true);

  type TableData = {
    studentData: studentData;
    enrolledClasses: string[];
    assignedRoversas: string[];
  };

  type studentData = {
    lastName: string;
    firstName: string;
    ID: number;
  };

  async function fetchStudentClasses() {
    const data = await fetch("/api/dashboard/student/classes", {
      method: "GET",
    });
    const classes = (await data.json()).studentClasses;
    let arr: string[] = [];
    for (let i = 0; i < classes.length; i++) {
      arr.push(classes[i].className);
    }
    return arr;
  }

  async function fetchStudentRoversas() {
    const data = await fetch("/api/dashboard/student/roversas", {
      method: "GET",
    });
    const roversas = (await data.json()).studentRoversas;
    console.log(roversas);
    let arr: string[] = [];
    for (let i = 0; i < roversas.length; i++) {
      arr.push(`${roversas[i].roversaName} (${roversas[i].className})`);
    }
    console.log(arr);
    return arr;
  }

  async function addStudentToTable(studentData: studentData) {
    cookies.set("studentID", studentData.ID.toString());
    const classes = await fetchStudentClasses();
    const roversas = await fetchStudentRoversas();

    const arr: TableData = {
      studentData: studentData,
      enrolledClasses: classes,
      assignedRoversas: roversas,
    };

    setData([...data, arr]);
  }

  async function fetchAllStudentData() {
    const data = await fetch("/api/dashboard/student/data", { method: "GET" });
    const dataJSON = await data.json();
    const studentData = JSON.parse(dataJSON.studentData);
    const arr: studentData[] = [];

    for (let i = 0; i < studentData.length; i++) {
      arr.push({
        ID: studentData[i].studentID,
        firstName: studentData[i].firstName,
        lastName: studentData[i].lastName,
      });
    }

    setStudentDataArr(arr);
  }

  useEffect(() => {
    fetchAllStudentData().then(() => {
      for (let i = 0; i < studentDataArr.length; i++) {
        addStudentToTable(studentDataArr[i]);
      }
      setLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  if (isLoading) {
    return (
      <div>
        <div className={dashboardStyles.title}>My Students</div>
        <div className={dashboardStyles.section}>Loading...</div>
      </div>
    );
  } else if (data.length === 0) {
    return (
      <div>
        <div className={dashboardStyles.title}>My Students</div>
        <Link className={dashboardStyles.button_purple} href="?addStudent=true">
          Add
        </Link>
        {addStudent && <StudentsPopup setLoading={setLoading} />}
        <div className={dashboardStyles.section}>No students yet!</div>
      </div>
    );
  }

  return (
    <div>
      <div className={dashboardStyles.title}>My Students</div>
      <Link className={dashboardStyles.button_purple} href="?addStudent=true">
        Add
      </Link>
      <button className={dashboardStyles.button_purple}>Edit</button>
      <button className={dashboardStyles.button_red}>Remove</button>
      {addStudent && <StudentsPopup addStudentToTable={addStudentToTable} />}
      <div className={dashboardStyles.section}>
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
                  <div className={dashboardStyles.scrollable}>
                    {d.studentData.firstName}
                  </div>
                </td>
                <td>
                  <div className={dashboardStyles.scrollable}>
                    {d.studentData.lastName}
                  </div>
                </td>
                <td>
                  <div className={dashboardStyles.scrollable}>
                    {d.studentData.ID}
                  </div>
                </td>
                <td>
                  {d.enrolledClasses.map((c, j) => (
                    <span key={j} className={dashboardStyles.scrollable}>
                      {c}
                      {j < d.enrolledClasses.length - 1 ? ", " : " "}
                    </span>
                  ))}
                </td>
                <td>
                  {d.assignedRoversas.map((r, j) => (
                    <span key={j} className={dashboardStyles.scrollable}>
                      {r}
                      {j < d.assignedRoversas.length - 1 ? ", " : " "}
                    </span>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
