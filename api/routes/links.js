import express from "express"
import { getLinks, getLink } from "../controllers/links.js"

const router = express.Router()

router.get("/", getLinks)
router.get("/:id", getLink)

export default router