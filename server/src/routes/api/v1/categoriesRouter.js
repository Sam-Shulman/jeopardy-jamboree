import express from "express";
import objection from "objection"
import  Category  from "../../../models/Category.js";

const categoriesRouter = new express.Router()

categoriesRouter.get("/", async (req, res) => {
    try{
        const categories = await Category.query()
        return res.status(200).json({ categories: categories})
    } catch (err) {
        return res.status(500).json({ errors: err})
    }
})

export default categoriesRouter