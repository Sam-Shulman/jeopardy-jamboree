import express from "express"

import JServiceClient from "../../../apiClient/jService.js"

const apiGameRouter = new express.Router()

apiGameRouter.get("/", async (req, res) => {
    try{
        const game = await JServiceClient.getSixCategories()
        
        return res
        .set({ "Content-Type": "application/json" })
        .status(200)
        .json(game)
    } catch (error) {
        return res.status(401).json({ errors: error })
    }
})

export default apiGameRouter