import express from "express";
import { Question } from "../../../models/index.js"
import QuestionSerializer from "../../../serializers/QuestionSerializer.js";

const questionsRouter = new express.Router()

questionsRouter.get("/", async (req, res) => {
    try{
        const questions = await Question.query()
        const serializedQuestions = questions.map((question) => {
            return QuestionSerializer.getSummary(question)
        })
        return res.status(200).json({ questions: serializedQuestions})
    } catch (err) {
        return res.status(500).json({ errors: err })
    }
})

export default questionsRouter