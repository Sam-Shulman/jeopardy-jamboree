import express from "express"
import {Question} from "../../../models/index.js";
import QuestionSerializer from "../../../serializers/QuestionSerializer.js";

const gameQuestionsRouter = new express.Router({mergeParams: true})

gameQuestionsRouter.get("/:id", async (req, res) => {
    const { id } = req.params
    try{
        const showQuestion = await Question.query().findById(id)
        const serializedQuestion = QuestionSerializer.getSummary(showQuestion)
        return res.status(200).json({ question: serializedQuestion})
    } catch (err) {
        return res.status(500).json({ errors: err})
    }
})

export default gameQuestionsRouter