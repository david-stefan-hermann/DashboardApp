import mysql from "mysql2";

export const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "password",
    database: "blog_schema",
});
