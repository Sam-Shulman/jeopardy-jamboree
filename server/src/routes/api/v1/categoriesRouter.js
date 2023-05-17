import express from "express";
import objection from "objection"
import  Category  from "../../../models/Category.js";
import CategorySerializer from "../../../serializers/CategorySerializer.js";
import categoryQuestionsRouter from "./categoryQuestionsRouter.js";

const categoriesRouter = new express.Router()

categoriesRouter.use("/:categoryId/questions", categoryQuestionsRouter)

categoriesRouter.get("/", async (req, res) => {
    try{
        const categories = await Category.query()
        const serializedCategories = await Promise.all(
            categories.map(async (category) => {
                return await CategorySerializer.getSummary(category)
            })
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
        console.log(serializedCategory)
        return res.status(200).json({category: serializedCategory})
    } catch (err) {
        return res.status(500).json({ errors: err })
    }
})



export default categoriesRouter