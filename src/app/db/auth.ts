import mariadb from "mariadb";
const pool = mariadb.createPool({
  host: "127.0.0.1",
  user: "root",
  password: "123",
  database: "dashboard",
  connectionLimit: 5,
});

export async function login(username: string, password: string) {
  const conn = await pool.getConnection();
  try {
    const rows = await conn.query(
      `SELECT * FROM users WHERE username='${username}' AND password='${password}'`
    );

    if (rows[0].username == username && rows[0].password == password) {
      if (conn) conn.end();
      return 1;
    }
  } catch (error) {
    console.log("EROR");
    return -1;
  } finally {
    if (conn) conn.end();
  }
}

export async function signup(username: string, password: string) {
  const conn = await pool.getConnection();
  try {
    await conn.query(`SELECT * FROM users WHERE username='${username}'`);
    await conn.query(
      `INSERT INTO users (username, password) VALUES ('${username}','${password}')`
    );
    return 1;
  } catch (error) {
    console.log("EROR");
    return -1;
  } finally {
    if (conn) conn.end();
  }
}
