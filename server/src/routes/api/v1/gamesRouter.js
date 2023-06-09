import express from "express"
import { Game } from "../../../models/index.js"
import GameSerializer from "../../../serializers/GameSerializer.js"
import rateLimit from "express-rate-limit"
import { Category} from "../../../models/index.js"
import getRandomCategoryId from "../../../../services/randomCategoryGenerator.js"

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
    const categoryLengthCheck = showGameWithCategories.categories.length
    const properCategoryLength = 6

    if (categoryLengthCheck < properCategoryLength) {
      const differenceInLength = properCategoryLength - categoryLengthCheck

      for (let i = 1; i <= differenceInLength; i++) {
        const randomCategoryId = await getRandomCategoryId()
        const addCategory = await Category.query().findById(randomCategoryId)
        const fullyAddedCategories = await addCategory.$relatedQuery("clues")

        if (fullyAddedCategories.length > 5) {
          const clueValues = [200, 400, 600, 800, 1000]
          const categoryClues = []

          for (const value of clueValues) {
            const clue = fullyAddedCategories.find((c) => c.value === value)
            if (clue) {
              categoryClues.push(clue)
            }
          }

          addCategory.clues = categoryClues
        } else {
          addCategory.clues = fullyAddedCategories.slice(0, 5)
        }

        showGameWithCategories.categories.push(addCategory)
      }
    }

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
    const updatedScore = game.score + parseInt(score)
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