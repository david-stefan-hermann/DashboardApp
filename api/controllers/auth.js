import { db, queryDB } from "../db.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"


export const register = (req, res) => {
    // check if empty
    if (req.body.username == "" || req.body.password == "") {
        return res.status(422).json("Empty username or password")
    }

    // check for existing user
    const user_query = "SELECT * FROM blog_schema.users WHERE username = $1"

    db.query(user_query, [req.body.username])
    .then(result => {
        // terminate if empty
        if(result.rows.length) return res.status(409).json("User already exists.")
    })
    .catch(err => {
        return console.log(err)
    })

    // Hash the pw with bcryptjs
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(req.body.password, salt)

    const insert_query = "INSERT INTO blog_schema.users(username, password) VALUES ($1, $2) RETURNING *"
    const values = [
        req.body.username,
        hash,
    ]

    db.query(insert_query, values)
    .then(result => {        
        return res.status(200).json("user has been created.")
    })
    .catch(err => {
        return console.log(err)
    })
}

export const login = (req, res) => {
    // check empty
    if (req.body.username == "" || req.body.password == "") {
        return res.status(422).json("Empty username or password")
    }

    // check for existing user
    const user_query = "SELECT * FROM blog_schema.users WHERE username = $1"

    db.query(user_query, [req.body.username])
    .then(result => {
        // terminate if user not found
        if(result.rows.length === 0) return res.status(404).json("User not found.")

        // Check Password
        const isPasswordCorrect = bcrypt.compareSync(req.body.password, result.rows[0].password);
        if (!isPasswordCorrect) return res.status(400).json("Wrong username or password")

        // set cookie and local storage
        const token = jwt.sign({ id: result.rows[0].id }, "jwtkey")
        const {password, ...other} = result.rows[0]

        res.cookie("access_token", token, {
            httpOnly: true
        }).status(200).json(other)

        return res.status(200).json("welcome " + result.rows[0].username)
    })
    .catch(err => {
        return console.log(err)
    })
}

export const logout = (req, res) => {
    res.clearCookie("access_token",{
        sameSite:"none",
        secure:true
    }).status(200).json("logged out")
}