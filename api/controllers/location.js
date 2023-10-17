import { db } from "../db.js"


export const getLocation = (req, res) => {   
    const q = {
        text: "SELECT id, parentid, title FROM blog_schema.posts WHERE id = $1",
        values: [req.params.id]
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