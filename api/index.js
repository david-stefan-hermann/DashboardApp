import express from "express"
import cookieParser from "cookie-parser"
import dotenv from 'dotenv/config.js'
import authRoutes from "./routes/auth.js"
import usersRoutes from "./routes/users.js"
import postRoutes from "./routes/posts.js"
import linkRoutes from "./routes/links.js"
import locationRoutes from "./routes/location.js"
import cors from "cors"
import { connectDB } from "./db.js"
import mongoose from 'mongoose';


const app = express()

app.use(express.json())
app.use(cors({
    origin: ["http://localhost:3000/"]
}))
app.use(cookieParser())
app.use("/api/auth", authRoutes)
//app.use("/api/users", usersRoutes)
app.use("/api/posts", postRoutes)
app.use("/api/links", linkRoutes)
//app.use("/api/location", locationRoutes)

connectDB()


mongoose.connection.once("open", () => {
    console.log("connected to MongoDB")
    app.listen(8800, () => {
        console.log('Running on p 8800')
    })
})

