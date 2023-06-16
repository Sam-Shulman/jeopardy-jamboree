import express from "express"
import { Category } from "../../../models/index.js"


const customGamesRouter = new express.Router()

customGamesRouter.get("/", async (req,res) => {
    try{
        const allCategories = await Category.query()
        return res.status(200).json({categories: allCategories})
    } catch (error) {
        return res.status(401).json({ errors: error })
      }
})

export default customGamesRouter