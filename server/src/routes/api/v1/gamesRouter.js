import express from "express";
import { Game } from "../../../models/index.js";
import GameSerializer from "../../../serializers/GameSerializer.js";
import gameQuestionsRouter from "./gameQuestionsRouter.js";

const gamesRouter = new express.Router()

gamesRouter.use("/:gameId/questions", gameQuestionsRouter)

gamesRouter.get("/", async (req, res) => {
    try{
        const games = await Game.query()
        const serializedGames = await Promise.all(
            games.map(async (game) => {
                return await GameSerializer.getSummary(game)
            })
            )
        return res.status(200).json({ games: serializedGames})
    }catch (err) {
        return res.status(500).json({ errors: err})
    }
})

gamesRouter.get("/:id", async (req, res) => {
    const { id } = req.params
    try{
        const showGame = await Game.query().findById(id)
        const serializedGame = await GameSerializer.getSummary(showGame)
        return res.status(200).json({ game: serializedGame})
    } catch (err) {
        return res.status(500).json({ errors: err})
    }
})

export default gamesRouter