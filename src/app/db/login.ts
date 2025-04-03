import mariadb from "mariadb";
const pool = mariadb.createPool({
  host: "127.0.0.1",
  user: "root",
  password: "VvBREv3rwDV+",
  database: "",
  connectionLimit: 5,
});

export async function login(username: string, password: string) {
  let conn;
  try {
    conn = await pool.getConnection();

    const rows = await conn.query(
      `SELECT * FROM users WHERE username='${username}' AND password='${password}'`
    );

    //TODO: see empty/successful output
    console.log(rows);
  } catch (err) {
    console.error(`Login error: ${err}`);
    return null;
  } finally {
    if (conn) conn.end();
  }
}
