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

export async function getUnassignedRobotIDs(
  username: string,
  currentClass: string
) {
  const conn = await pool.getConnection();
  try {
    const unassignedRobotIDs = await conn.query(
      `SELECT DISTINCT robotID from robot_output WHERE robotID \
      NOT IN ( \
      SELECT robotID FROM robots_classes \
      WHERE className = "${currentClass}" AND username = "${username}")`
    );
    return unassignedRobotIDs;
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

export async function getBattery(className: string) {
  const conn = await pool.getConnection();
  try {
    const rows =
      await conn.query(`SELECT robotID, battery from robot_output WHERE robotID IN \
      (SELECT robotID FROM robots_classes WHERE className = '${className}') ORDER BY datetime DESC`);
    return rows;
  } catch (error) {
    console.log(error);
    return -1;
  } finally {
    if (conn) conn.end();
  }
}
