import express from "express";
import { Game } from "../../../models/index.js";
import GameSerializer from "../../../serializers/GameSerializer.js";

const gamesRouter = new express.Router()



gamesRouter.get("/", async (req, res) => {
    try {
    const userId = req.user.id
      
      const game = await Game.query().insertAndFetch({userId: userId, score: 0})
      
      return res
        .set({ "Content-Type": "application/json" })
        .status(200)
        .json({ game: game });
    } catch (error) {
      return res.status(401).json({ errors: error });
    }
  });

 gamesRouter.get("/:id", async (req, res) => {
    const { id } = req.params
    try{
        const showGame = await Game.query().findById(id)
        
        const showGameWithCategories = await GameSerializer.getSummary(showGame)

        
        return res.status(200).json({ game: showGameWithCategories})
    } catch (err) {
        return res.status(500).json({ errors: err})
    }
})

export default gamesRouter