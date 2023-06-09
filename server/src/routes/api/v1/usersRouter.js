import express from "express";
import { ValidationError } from "objection";

import { User } from "../../../models/index.js";

const usersRouter = new express.Router();


usersRouter.post("/", async (req, res) => {
  const { email, password } = req.body;
  try {
    const persistedUser = await User.query().insertAndFetch({ email, password });
    return req.login(persistedUser, () => {
      return res.status(201).json({ user: persistedUser });
    });
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data });
    }
    return res.status(422).json({ errors: error });
  }
});

usersRouter.get("/:id", async (req,res) => {
  const { id } = req.params 
  try {
    const findUser = await User.query().findById(id)
    
    const userWithGames = await findUser.$relatedQuery("games")
    findUser.games = userWithGames
  
    return res.status(200).json({ user: findUser})
  } catch (error){
    return res.status(500).json({ errors: error });
  }
})

export default usersRouter;