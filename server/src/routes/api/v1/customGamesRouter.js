import express from "express"
import { Category } from "../../../models/index.js"
import { Game } from "../../../models/index.js"
import { GameClue }from "../../../models/index.js"
import { Clue } from "../../../models/index.js"

const customGamesRouter = new express.Router()

customGamesRouter.get("/", async (req,res) => {
  try {
    const allCategories = await Category.query()
    return res.status(200).json({ categories: allCategories })
  } catch (error) {
    return res.status(401).json({ errors: error })
  }
})

customGamesRouter.post("/", async (req, res) => {
  const { categories } = req.body
  const userId = req.user.id
  try {
    const postGame = await Game.query().insertAndFetch({ userId: userId })
    
    const gameClues = []
    for (const category of categories) {
      const relatedCategory = await Category.query().findById(category.id).withGraphFetched('clues')
      const relatedClues = relatedCategory.clues
      for (const clue of relatedClues) {
        const gameClue = await GameClue.query().insertAndFetch({
          gameId: postGame.id,
          clueId: clue.id
        })
        gameClues.push(gameClue)
      }
    }
    return res.status(201).json({ game: postGame })
  } catch (err) {
    return res.status(500).json({ errors: err })
  }
})

customGamesRouter.get("/:id", async (req, res) => {
  const { id } = req.params
  try {
    const showGame = await Game.query().findById(id)
    const gameClues = await showGame.$relatedQuery("gameClues")
    const gameCategories = []
    for (const gameClue of gameClues) {
      const clue = await Clue.query().findById(gameClue.clueId)
      const category = await Category.query().findById(clue.categoryId)
      const categoryClues = await Clue.query().where('categoryId', category.id)
      gameCategories.push({ category, clues: categoryClues })
    }

    const selectedCategories = []
    for (let i = 0; i < gameCategories.length; i += 5) {
      selectedCategories.push(gameCategories[i])
    }

    return res.status(200).json({ game: showGame, categories: selectedCategories })
  } catch (err) {
    return res.status(500).json({ errors: err })
  }
})

customGamesRouter.patch("/:id", async (req, res) => {
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

export default customGamesRouter