import { db } from "../db.js"
import { User, Post } from "../mongoose_models.js"


export const getLinks = async (req, res) => {
    try {
        const data = await Post.find({}, "_id parent title").sort({title: -1})
        
        // TODO: check permission to view private posts 

        return res.status(200).json(data)
    } catch (err) {
        console.log(err)
    }
}

export const getLink = async (req, res) => {
    try {
        const query = Post.where({_id: req.params.id}, "_id parent title")
        const data = await query.findOne()

        // TODO: check permission to view private posts 
        
        return res.status(200).json(data)
    } catch (err) {
        console.log(err)
    }
}