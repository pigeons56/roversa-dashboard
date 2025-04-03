import mariadb from "mariadb";
const pool = mariadb.createPool({
  host: "44.192.207.89",
  user: "bitnami",
  password: "VvBREv3rwDV+",
  database: "OVLug0Q!Uol5",
  connectionLimit: 5,
});

export async function login(username: string, password: string) {
  console.log("I'M IN!!");
  const conn = await pool.getConnection();

  const rows = await conn.query(
    `SELECT * FROM users WHERE username='${username}' AND password='${password}'`
  );

  //TODO: see empty/successful output
  console.log(rows);

  if (conn) conn.end();
}
