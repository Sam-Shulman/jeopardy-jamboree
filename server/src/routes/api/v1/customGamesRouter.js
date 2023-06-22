import express from "express"
import { Category } from "../../../models/index.js"
import { Game } from "../../../models/index.js"
import { GameClue }from "../../../models/index.js"
import { Clue } from "../../../models/index.js"



const customGamesRouter = new express.Router()

customGamesRouter.get("/", async (req,res) => {
    try{
        const allCategories = await Category.query()
        return res.status(200).json({categories: allCategories})
    } catch (error) {
        return res.status(401).json({ errors: error })
      }
})

customGamesRouter.post("/", async (req, res) => {
    const { categories } = req.body;
    console.log(categories)
    const userId = req.user.id;
    const categoryIDs =[]
    categories.forEach((category)=> {
        categoryIDs.push(category.categoryId)
    })
    console.log(categoryIDs)
  
    try {
      const postGame = await Game.query().insertAndFetch({ userId: userId });
  
      const gameClues = [];
      for (const categoryId of categoryIDs) {
        const clues = await Clue.query().where('categoryId', categoryId);
        for (const clue of clues) {
          const gameClue = await GameClue.query().insertAndFetch({
            gameId: postGame.id,
            clueId: clue.id
          });
          gameClues.push(gameClue);
        }
      }
  
      console.log(gameClues.length);
  
      return res.status(201).json({ game: postGame });
    } catch (err) {
      return res.status(500).json({ errors: err });
    }
  });
  
  

customGamesRouter.get("/:id", async (req, res) => {
    const { id } = req.params
    try {
      const showGame = await Game.query().findById(id)
      
      return res.status(200).json({ game: showGame })
    } catch (err) {
      return res.status(500).json({ errors: err })
    }
  })

export default customGamesRouter