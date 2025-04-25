import { connect } from "./mariadb_setup";

const pool = await connect();

// get all students
export async function getStudentData(username: string) {
  const conn = await pool.getConnection();
  try {
    const rows = await conn.query(
      `SELECT studentID, firstName, lastName FROM students WHERE username="${username}"`
    );
    return rows;
  } catch (error) {
    console.log(error);
    return -1;
  } finally {
    if (conn) conn.end();
  }
}

// get classes of 1 student
export async function getStudentClasses(studentID: number, username: string) {
  const conn = await pool.getConnection();
  try {
    const rows = await conn.query(
      `SELECT className FROM student_classes WHERE studentID = ${studentID} AND username="${username}"`
    );
    return rows;
  } catch (error) {
    console.log(error);
    return -1;
  } finally {
    if (conn) conn.end();
  }
}

// get roversas of 1 student
export async function getStudentRoversas(studentID: number, username: string) {
  const conn = await pool.getConnection();
  try {
    const rows = await conn.query(
      `select roversaName, className from student_roversas where studentID=${studentID} AND username="${username}"`
    );
    return rows;
  } catch (error) {
    console.log(error);
    return -1;
  } finally {
    if (conn) conn.end();
  }
}

export async function getStudentName(studentID: number, username: string) {
  const conn = await pool.getConnection();
  try {
    const rows = await conn.query(
      `SELECT firstName, lastName FROM students WHERE studentID = ${studentID} AND username="${username}"`
    );
    return rows;
  } catch (error) {
    console.log(error);
    return -1;
  } finally {
    if (conn) conn.end();
  }
}

export async function addStudentData(
  firstName: string,
  lastName: string,
  studentID: number,
  username: string
) {
  const conn = await pool.getConnection();
  try {
    await conn.query(
      `INSERT INTO students (firstName, lastName, studentID, username) VALUES ("${firstName}", "${lastName}",${studentID}, "${username}")`
    );
    return 1;
  } catch (error) {
    console.log(error);
    return -1;
  } finally {
    if (conn) conn.end();
  }
}
