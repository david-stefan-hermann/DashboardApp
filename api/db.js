import pg from 'pg'
const { Pool, Client } = pg;

export const db = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'david-hermann-react-blog',
    password: 'wD8sGZR#OqVgfg^LiQ^XdTW7$skpP*Q8mzW',
    port: 5432,
    //max: 20,
    //idleTimeoutMillis: 30000,
    //connectionTimeoutMillis: 2000,
});

export const queryDB = (query, values) => {
    try {
        db.query(query, values)
    } catch(err) {
        console.log("connection unsuccessful")
        console.log(err)
    }
}

const qu = "INSERT INTO blog_schema.users(username, password, img) VALUES ($1, $2, $3)"
const values = ['sexy', 'nerd', 'i']

//queryDB(qu, values);

/*  MySQL Database

import mysql from "mysql2";


export const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "password",
    database: "blog_schema",
});

*/
