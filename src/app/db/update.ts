import { connect } from "./mariadb_setup";

const pool = await connect();

export async function getClasses(username: string) {
  const conn = await pool.getConnection();
  try {
    const rows = await conn.query(
      `SELECT className FROM classes WHERE username='${username}'`
    );
    return rows;
  } catch (error) {
    console.log(error);
    return -1;
  } finally {
    if (conn) conn.end();
  }
}

export async function addClass(className: string, username: string) {
  const conn = await pool.getConnection();
  try {
    await conn.query(
      `INSERT INTO classes (className, username) VALUES ('${className}', '${username}')`
    );
    return 1;
  } catch (error) {
    console.log(error);
    return -1;
  } finally {
    if (conn) conn.end();
  }
}

export async function getRobots(className: string, username: string) {
  const conn = await pool.getConnection();
  try {
    const rows = await conn.query(
      `SELECT robots.displayName, robots.robotID FROM robots \
      WHERE className='${className}' \
      AND username='${username}'`
    );
    return rows;
  } catch (error) {
    console.log(error);
    return -1;
  } finally {
    if (conn) conn.end();
  }
}

export async function addRobot(
  displayName: string,
  robotID: string,
  className: string,
  username: string
) {
  const conn = await pool.getConnection();
  try {
    await conn.query(
      `INSERT INTO robots (displayName, className, robotID, username) VALUES ('${displayName}','${className}', '${robotID}', '${username}')`
    );
    return 1;
  } catch (error) {
    console.log(error);
    return -1;
  } finally {
    if (conn) conn.end();
  }
}

export async function addRobotOutput(
  robotID: number,
  program: string,
  button: string,
  battery: number
) {
  const conn = await pool.getConnection();
  try {
    await conn.query(
      `INSERT INTO robot_output (robotID, program, button, battery) VALUES ("${robotID}","${program}","${button}","${battery}")`
    );
    return 1;
  } catch (error) {
    console.log(error);
    return -1;
  } finally {
    if (conn) conn.end();
  }
}

// get output of 1 robot
export async function getRobotOutput(robotID: number) {
  const conn = await pool.getConnection();
  try {
    const rows = await conn.query(
      `SELECT program,button,battery,DATE_FORMAT(datetime, '%m/%d/%Y %H:%i') FROM robot_output WHERE robotID = ${robotID} ORDER BY datetime DESC`
    );
    return rows;
  } catch (error) {
    console.log(error);
    return -1;
  } finally {
    if (conn) conn.end();
  }
}

export async function getBatteryByID(robotID: number) {
  const conn = await pool.getConnection();
  try {
    const rows = await conn.query(
      `SELECT battery from robot_output WHERE robotID = ${robotID} ORDER BY datetime DESC LIMIT 1`
    );
    return rows;
  } catch (error) {
    console.log(error);
    return -1;
  } finally {
    if (conn) conn.end();
  }
}

export async function getRobotNameByID(
  robotID: number,
  className: string,
  username: string
) {
  const conn = await pool.getConnection();
  try {
    const rows = await conn.query(
      `SELECT displayName from robots_classes WHERE robotID = ${robotID} AND className = "${className}" AND username="${username}"`
    );
    return rows;
  } catch (error) {
    console.log(error);
    return -1;
  } finally {
    if (conn) conn.end();
  }
}

export async function getBatteryByClass(className: string) {
  const conn = await pool.getConnection();
  try {
    const rows = await conn.query(
      ` SELECT robotID, battery FROM robot_output WHERE robotID IN (SELECT robotID FROM robots_classes WHERE className="${className}") ORDER BY datetime DESC`
    );
    return rows;
  } catch (error) {
    console.log(error);
    return -1;
  } finally {
    if (conn) conn.end();
  }
}

export async function getRobotClasses(robotID: number, username: string) {
  const conn = await pool.getConnection();
  try {
    const rows = await conn.query(
      `SELECT className, displayName FROM robots_classes WHERE robotID = ${robotID} AND username="${username}"`
    );
    return rows;
  } catch (error) {
    console.log(error);
    return -1;
  } finally {
    if (conn) conn.end();
  }
}

export async function getRobotStudents(robotID: number, username: string) {
  const conn = await pool.getConnection();
  try {
    const rows = await conn.query(
      `SELECT firstName, lastName, className FROM student_robots JOIN students ON student_robots.studentID = students.studentID WHERE robotID = ${robotID} and student_robots.username="${username}" and students.username="${username}"`
    );
    return rows;
  } catch (error) {
    console.log(error);
    return -1;
  } finally {
    if (conn) conn.end();
  }
}

export async function getRobotIDs(username: string) {
  const conn = await pool.getConnection();
  try {
    const rows = await conn.query(
      `SELECT robotID FROM robots WHERE username="${username}"`
    );
    return rows;
  } catch (error) {
    console.log(error);
    return -1;
  } finally {
    if (conn) conn.end();
  }
}

export async function getRobotIDsByClass(className: string, username: string) {
  const conn = await pool.getConnection();
  try {
    const rows = await conn.query(
      `SELECT robotID FROM robots WHERE username="${username}" AND robotID IN (SELECT robotID FROM robots_classes WHERE className = "${className}")`
    );
    return rows;
  } catch (error) {
    console.log(error);
    return -1;
  } finally {
    if (conn) conn.end();
  }
}

export async function getRobotIDsNotInClass(
  className: string,
  username: string
) {
  const conn = await pool.getConnection();
  try {
    const rows = await conn.query(
      `SELECT robotID FROM robots WHERE username="${username}" AND robotID NOT IN (SELECT robotID FROM robots_classes WHERE className = "${className}")`
    );
    return rows;
  } catch (error) {
    console.log(error);
    return -1;
  } finally {
    if (conn) conn.end();
  }
}

export async function getNotConnectedRobotIDs(username: string) {
  const conn = await pool.getConnection();
  try {
    const rows = await conn.query(
      `SELECT DISTINCT robotID from robot_output WHERE robotID \
      NOT IN ( SELECT robotID FROM robots WHERE username = "${username}")`
    );
    return rows;
  } catch (error) {
    console.log(error);
    return -1;
  } finally {
    if (conn) conn.end();
  }
}

export async function addRobotID(robotID: number, username: string) {
  const conn = await pool.getConnection();
  try {
    await conn.query(
      `INSERT INTO robots (robotID, username) VALUES (${robotID},"${username}")`
    );
    return 1;
  } catch (error) {
    console.log(error);
    return -1;
  } finally {
    if (conn) conn.end();
  }
}

export async function addRobotToClass(
  robotID: number,
  robotName: string,
  className: string,
  username: string
) {
  const conn = await pool.getConnection();
  try {
    await conn.query(
      `INSERT INTO robots_classes (robotID, displayName, className, username) VALUES (${robotID},"${robotName}","${className}","${username}")`
    );
    return 1;
  } catch (error) {
    console.log(error);
    return -1;
  } finally {
    if (conn) conn.end();
  }
}
