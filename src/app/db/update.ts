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

export async function getRoversas(className: string, username: string) {
  const conn = await pool.getConnection();
  try {
    const rows = await conn.query(
      `SELECT roversas.displayName, roversas.roversaID FROM roversas \
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

export async function addRoversa(
  displayName: string,
  roversaID: string,
  className: string,
  username: string
) {
  const conn = await pool.getConnection();
  try {
    await conn.query(
      `INSERT INTO roversas (displayName, className, roversaID, username) VALUES ('${displayName}','${className}', '${roversaID}', '${username}')`
    );
    return 1;
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
  button: string,
  battery: number
) {
  const conn = await pool.getConnection();
  try {
    await conn.query(
      `INSERT INTO roversa_output (roversaID, program, button, battery) VALUES ("${roversaID}","${program}","${button}","${battery}")`
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
      `SELECT DISTINCT roversaID from roversa_output WHERE roversaID \
      NOT IN ( \
      SELECT roversaID FROM roversas_classes \
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

// get output of 1 roversa
export async function getRoversaOutput(roversaID: number) {
  const conn = await pool.getConnection();
  try {
    const rows = await conn.query(
      `SELECT program,button,battery,DATE_FORMAT(datetime, '%m/%d/%Y %H:%i') FROM roversa_output WHERE roversaID = ${roversaID} ORDER BY datetime DESC`
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
      await conn.query(`SELECT roversaID, battery from roversa_output WHERE roversaID IN \
      (SELECT roversaID FROM roversas_classes WHERE className = '${className}') ORDER BY datetime DESC`);
    return rows;
  } catch (error) {
    console.log(error);
    return -1;
  } finally {
    if (conn) conn.end();
  }
}
