import { db } from "../db.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { User } from "../mongoose_models.js"


export const register = async (req, res) => {
    console.log("register: called");

    // check if empty
    if (req.body.username === "" || req.body.password === "") {
        console.log("register: empty username or password");
        return res.status(422).json("Empty username or password");
    }

    // check for existing user
    let existingUsers;
    try {
        existingUsers = await User.find({username: req.body.username}).exec();
    } catch(err) {
        console.error("register: error checking for existing user:", err);
        return res.status(500).json("Server error while checking for existing user.");
    }

    if (existingUsers && existingUsers.length) {
        console.log("register: user already exists");
        return res.status(409).json("User already exists.");
    }

    // Hash the password with bcryptjs
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    // Create the user
    try {
        await User.create({
            username: req.body.username,
            password: hash
        });
        console.log("register: user created successfully");
        res.status(200).json("User has been created.");
    } catch(err) {
        console.error("register: error during user creation:", err);
        res.status(500).json("Server error while creating the user.");
    }
}

export const login = async (req, res) => {
    // check empty
    if (req.body.username == "" || req.body.password == "") {
        return res.status(422).json("Empty username or password")
    }
    
    // check for existing user
    try {
        const query = User.where({username: req.body.username})
        const user = await query.findOne()

        // terminate if user not found
        if (user === null) return res.status(404).json("User not found.")
    
        console.log("auth: " + user + " -- " + user._id)

        // Check Password
        const isPasswordCorrect = bcrypt.compareSync(req.body.password, user.password);
        if (!isPasswordCorrect) return res.status(400).json("Wrong username or password")
    
        // set cookie and local storage
        const token = jwt.sign({ id: user._id }, "jwtkey")
    
        res.cookie("access_token", token, {
            httpOnly: true
        }).status(200).json({id: user._id, username: user.username, image: user.image})
    
        return res.status(200).json("welcome " + user.username)
    
    } catch(err) {
        console.log(err)
    }
}

export const logout = (req, res) => {
    res.clearCookie("access_token",{
        sameSite:"none",
        secure:true
    }).status(200).json("logged out")
}