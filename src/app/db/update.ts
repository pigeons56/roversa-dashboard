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
