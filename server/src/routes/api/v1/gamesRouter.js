import express from "express"
import { Game } from "../../../models/index.js"
import GameSerializer from "../../../serializers/GameSerializer.js"
import rateLimit from "express-rate-limit"

const gamesRouter = new express.Router()

const limiter = rateLimit({
  windowMs: 15 * 1000, 
  max: 1, 
  message: "Too many requests. Please wait a moment and try again."
})

gamesRouter.get("/", async (req, res) => {
  try {
    const userId = req.user.id
    const game = await Game.query().insertAndFetch({ userId: userId, score: 0 })
    return res
      .set({ "Content-Type": "application/json" })
      .status(200)
      .json({ game: game })
  } catch (error) {
    return res.status(401).json({ errors: error })
  }
})

gamesRouter.get("/:id", limiter, async (req, res) => {
  const { id } = req.params
  try {
    const showGame = await Game.query().findById(id)
    const showGameWithCategories = await GameSerializer.getSummary(showGame)
    
    return res.status(200).json({ game: showGameWithCategories })
  } catch (err) {
    return res.status(500).json({ errors: err })
  }
})


gamesRouter.patch("/:id", async (req, res) => {
  const { id } = req.params
  const { score } = req.body
  try { 
    const game = await Game.query().findById(id)
    const updatedScore = game.score + score
    const updatedGame =  await Game.query().patchAndFetchById( id, { score: updatedScore })
    return res.status(201).json({ game: updatedGame })
  } catch (err) {
    return res.status(500).json({ errors: err })
  }
})

gamesRouter.post("/:id", async (req, res) => {
  const { id } = req.params
  const { score } = req.body
  const userId = req.user.id
  try {
    const finalizedGame = await Game.query().patchAndFetchById( id, { score: score, userId: userId })
    return res.status(201).json({ game: finalizedGame })
  } catch (err) {
    return res.status(500).json({ errors: err })
  }
})

export default gamesRouter