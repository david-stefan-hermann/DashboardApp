import { db } from "../db.js"


export const getLinks = (req, res) => {
    console.log("fetching links")
    const q = {
        text: "SELECT * FROM blog_schema.posts"
    } 

    // TODO: check permission to view private posts 

    db.query(q)
    .then(result => {
        return res.status(200).json(result.rows)
    })
    .catch(err => {
        return console.log(err)
    })
}