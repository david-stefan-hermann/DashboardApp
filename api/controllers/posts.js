import { db } from "../db.js"
import jwt from "jsonwebtoken"

export const getPosts = (req, res) => {

    const q = req.query.parentId > 0 ? {
        text: "SELECT * FROM blog_schema.posts WHERE parentid = ($1)",
        values: [req.query.parentId]
    } : {
        text: "SELECT * FROM blog_schema.posts WHERE parentid is null OR parentid = 0"
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

export const getPost = (req, res) => { 
    const q = {
        text: "SELECT username, img, uid, title, content, image, parentid, updated FROM blog_schema.users JOIN blog_schema.posts ON blog_schema.users.id = blog_schema.posts.uid WHERE blog_schema.posts.id = $1",
        values: [req.params.id]
    }

    // TODO: check permission to view private posts 

    db.query(q)
    .then(result => {
        return res.status(200).json(result.rows[0])
    })
    .catch(err => {
        return console.log(err)
    })
}

export const addPost = (req, res) => {
    const token = req.cookies.access_token
    if(!token) return res.status(401).json("Authentication failure: try to log in.")

    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if(err) return res.status(403).json("Token is not valid!")
    
        const userId = userInfo.id
        
        const q = {
            text: "INSERT INTO blog_schema.posts(title, short, content, created, updated, uid, image, is_private, parentid) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)",
            values: [req.body.title, req.body.short, req.body.content, req.body.date, req.body.date, userId, req.body.image, req.body.is_private, req.body.parentid]
        }
        db.query(q)
        .then(result => {
            return res.status(200).json("Post created successfully.")
        })
        .catch(err => {
            return console.log(err)
        })
    })
}

export const deletePost = (req, res) => {
    const token = req.cookies.access_token
    if(!token) return res.status(401).json("Authentication failure: try to log in.")

    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if(err) return res.status(403).json("Token is not valid!")
    
        const userId = userInfo.id
        const postId = req.params.id

        const q = {
            text: "DELETE FROM blog_schema.posts WHERE blog_schema.posts.id = $1 AND blog_schema.posts.uid = $2",
            values: [postId, userId]
        }
        db.query(q)
        .then(result => {
            return res.status(200).json("Post deleted successfully.")
        })
        .catch(err => {
            return console.log(err)
        })
    })
}

export const updatePost = (req, res) => {
    const token = req.cookies.access_token
    if(!token) return res.status(401).json("Authentication failure: try to log in.")

    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if(err) return res.status(403).json("Token is not valid!")
    
        const userId = userInfo.id
        const postId = req.params.id

        const q = {
            text: "UPDATE blog_schema.posts SET title = $1, short = $2, content = $3, updated = $4, image = $5, is_private = $6, parentid = $7 WHERE id = $8 AND uid = $9",
            values: [req.body.title, req.body.short, req.body.content, req.body.date, req.body.image, req.body.is_private, req.body.parentid, postId, userId]
        }
        db.query(q)
        .then(result => {
            return res.status(200).json("Post updated successfully.")
        })
        .catch(err => {
            return console.log(err)
        })
    })
}