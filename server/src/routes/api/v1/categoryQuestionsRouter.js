// import express from "express"
// import { Question } from "../../../models/index.js"

// const categoryQuestionsRouter = new express.Router({ mergeParams: true })

// categoryQuestionsRouter.get("/", async (req,res) => {
//     try{
//         const questions = await Question.query()
//         return res.status(200).json({ questions: questions})
//     }catch (err) {
//         return res.status(500).json({ errors: err })
//     }
// })

// categoryQuestionsRouter.get("/:id", async (req,res) => {
//     const { id } = req.params
//     try{
//         const showQuestion = await Question.query().findById(id)
//         return res.status(200).json({question: showQuestion})
//     } catch (err) {
//         return res.status(500).json({ errors: err })
//     }
// })

// export default categoryQuestionsRouter