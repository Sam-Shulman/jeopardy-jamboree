import express from "express";
import objection from "objection"
import  Category  from "../../../models/Category.js";
import CategorySerializer from "../../../serializers/CategorySerializer.js";


const categoriesRouter = new express.Router()
// game router to create new game (without categories)
// moving category logic to game router
// see categories on webpage
// lastly, get questions
// then working on score keeping 
categoriesRouter.get("/", async (req, res) => {
    try{
        // in game router, get categories, then create game with those categories associated
        // const categories = await Category.query().limit(6)
        // does it randomly select?
        // potentially methods like "pluck"
        const categories = await Category.query()
        const serializedCategories = await Promise.all(
            categories.map(async (category) => {
                return await CategorySerializer.getSummary(category)
                // also related query for questions
                // create question serializer to help grab specific difficulty
                // ^^ .where({difficulty: "easy"}).??.limit(2)
                // objection docs on methods
            })
// Game - userId, score - 0
// Games - GameCategories - Categories
// game.categories

// User - UserQuestion (boolean - answered, gameId) - Questions
// would need to consider handling when user encounters same question a second time
        )
        return res.status(200).json({ categories: serializedCategories})
    } catch (err) {
        return res.status(500).json({ errors: err})
    }
})

categoriesRouter.get("/:id", async (req,res) => {
    const { id } = req.params
    try{
        const showCategory = await Category.query().findById(id)
        const serializedCategory = await CategorySerializer.getSummary(showCategory)
        return res.status(200).json({category: serializedCategory})
    } catch (err) {
        return res.status(500).json({ errors: err })
    }
})

export default categoriesRouter