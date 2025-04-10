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

export async function getRoversas(username: string) {
  const conn = await pool.getConnection();
  try {
    const rows = await conn.query(
      `SELECT displayName FROM roversas WHERE username='${username}'`
    );
    return rows;
  } catch (error) {
    console.log(error);
    return -1;
  } finally {
    if (conn) conn.end();
  }
}

export async function addRoversaOutput(
  roversaID: number,
  program: string,
  battery: number
) {
  const conn = await pool.getConnection();
  try {
    await conn.query(
      `INSERT INTO roversaOutput (roversaID, program, battery) VALUES ("${roversaID}","${program}","${battery}")`
    );
    return 1;
  } catch (error) {
    console.log(error);
    return -1;
  } finally {
    if (conn) conn.end();
  }
}

export async function getUnassignedRoversaIDs(
  username: string,
  currentClass: string
) {
  const conn = await pool.getConnection();
  try {
    const unassignedRoversaIDs = await conn.query(
      `SELECT roversaID from roversa_output WHERE roversaID \
      NOT IN ( \
      SELECT roversaID FROM roversa_classes \
      WHERE className = "${currentClass}" AND username = "${username}")`
    );
    return unassignedRoversaIDs;
  } catch (error) {
    console.log(error);
    return -1;
  } finally {
    if (conn) conn.end();
  }
}
