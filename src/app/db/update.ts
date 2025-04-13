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
      `SELECT roversas.displayName, roversas.roversaID FROM roversas JOIN roversa_classes \
      ON roversas.roversaID = roversa_classes.roversaID \
      WHERE roversa_classes.className='${className}' \
      AND roversa_classes.username='${username}' \
      AND roversas.username='${username}'`
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
      `INSERT IGNORE INTO roversas (displayName, roversaID, username) VALUES ('${displayName}', '${roversaID}', '${username}')`
    );

    await conn.query(
      `INSERT INTO roversa_classes (roversaID, className, username) VALUES ('${roversaID}','${className}', '${username}')`
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

export async function getBattery(className: string, username: string) {
  const conn = await pool.getConnection();
  try {
    const rows =
      await conn.query(`SELECT roversaID, battery from roversa_output WHERE roversaID IN \n
      (SELECT roversaID FROM roversa_classes WHERE className = '${className}') ORDER BY datetime DESC`);
    return rows;
  } catch (error) {
    console.log(error);
    return -1;
  } finally {
    if (conn) conn.end();
  }
}
