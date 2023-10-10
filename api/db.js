import pg from 'pg'
const { Pool } = pg;

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