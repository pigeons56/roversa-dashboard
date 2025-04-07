import mariadb from "mariadb";

export async function connect() {
  const pool = mariadb.createPool({
    host: "127.0.0.1",
    user: "root",
    password: "123",
    database: "dashboard",
    connectionLimit: 5,
  });
  return pool;
}
