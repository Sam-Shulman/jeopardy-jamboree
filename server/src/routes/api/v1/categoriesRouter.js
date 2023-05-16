import express from "express";
import objection from "objection"
import  Category  from "../../../models/Category.js";
import CategorySerializer from "../../../serializers/CategorySerializer.js";

const categoriesRouter = new express.Router()


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

export default categoriesRouter