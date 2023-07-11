import express from "express";
import { Category, Game, GameClue, Clue } from "../../../models/index.js";

const customGamesRouter = new express.Router();

customGamesRouter.get("/", async (req, res) => {
  try {
    const allCategories = await Category.query();
    return res.status(200).json({ categories: allCategories });
  } catch (error) {
    return res.status(401).json({ errors: error });
  }
});

customGamesRouter.post("/", async (req, res) => {
  const { categories } = req.body;
  const userId = req.user.id;
  const goodClueValues = ['200', '400', '600', '800', '1000'];

  try {
    const postGame = await Game.query().insertAndFetch({ userId });

    const gameClues = [];
    const usableClues = [];

    for (const category of categories) {
      const relatedCategory = await Category.query().findById(category.id).withGraphFetched('clues');

      const relatedClues = relatedCategory.clues;

      for (const value of goodClueValues) {
        const usableClue = relatedClues.find((c) => c.value === value);

        if (usableClue) {
          usableClues.push(usableClue);
        }
      }
    }

    for (const clue of usableClues) {
      const gameClue = await GameClue.query().insertAndFetch({
        gameId: postGame.id,
        clueId: clue.id,
      });
      gameClues.push(gameClue);
    }

    return res.status(201).json({ game: postGame });
  } catch (err) {
    return res.status(500).json({ errors: err });
  }
});

customGamesRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const showGame = await Game.query().findById(id);
    const gameClues = await showGame.$relatedQuery("gameClues");
    const gameCategories = [];
    const categoryIds = [];

    for (const gameClue of gameClues) {
      const clue = await Clue.query().findById(gameClue.clueId);
      if (!categoryIds.includes(clue.categoryId)) {
        categoryIds.push(clue.categoryId);
      }
    }

    for (const id of categoryIds) {
      const category = await Category.query().findById(id);
      category.clues = [];

      for (const gameClue of gameClues) {
        const clue = await Clue.query().findById(gameClue.clueId);
        if (clue.categoryId === id) {
          category.clues.push(clue);
        }
      }

      gameCategories.push(category);
    }

    return res.status(200).json({ game: showGame, categories: gameCategories });
  } catch (err) {
    return res.status(500).json({ errors: err });
  }
});

customGamesRouter.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const { score } = req.body;
  try {
    const game = await Game.query().findById(id);
    const updatedScore = game.score + parseInt(score);
    const updatedGame = await Game.query().patchAndFetchById(id, { score: updatedScore });
    return res.status(201).json({ game: updatedGame });
  } catch (err) {
    return res.status(500).json({ errors: err });
  }
});

export default customGamesRouter;