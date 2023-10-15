import { db } from "../db.js"


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
    console.log("getPost call, id: " + req.params.id)
    
    const q = {
        //text: "SELECT 'username', 'img', 'uid', 'title', 'content', 'image', 'parent', 'updated' FROM 'blog_schema.users' JOIN 'blog_schema.posts' ON 'blog_schema.users'.'id' = 'blog_schema.posts'.'uid' WHERE 'blog_schema.posts'.id = $1",
        text: "SELECT * FROM blog_schema.posts WHERE blog_schema.posts.id = ($1)",
        values: [req.params.id]
    }

    // TODO: check permission to view private posts 

    db.query(q)
    .then(result => {
        console.log(">>>> " + result.rows[0])
        return res.status(200).json(result.rows[0])
    })
    .catch(err => {
        return console.log(err)
    })
}

export const addPost = (req, res) => {
    res.json("posts - from controller")
}

export const deletePost = (req, res) => {
    res.json("posts - from controller")
}

export const updatePost = (req, res) => {
    res.json("posts - from controller")
}