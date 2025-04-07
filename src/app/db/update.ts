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
    console.log("EROR");
    return -1;
  } finally {
    if (conn) conn.end();
  }
}
