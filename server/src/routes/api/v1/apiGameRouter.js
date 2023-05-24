import express from "express";
import JServiceClient from "../../../apiClient/jService.js";

const apiGameRouter = express.Router();

let questionObject 

apiGameRouter.get("/", async (req, res) => {
  try {
    const game = await JServiceClient.getCategories();

    return res
      .set({ "Content-Type": "application/json" })
      .status(200)
      .json({ game: game });
  } catch (error) {
    return res.status(401).json({ errors: error });
  }
});

// apiGameRouter.get("/:id", async (req, res) => {
//     try {
//       const questionId = req.params.id
      
//       return res
//         .set({ "Content-Type": "application/json" })
//         .status(200)
//         .json({ question });
//     } catch (error) {
//       return res.status(401).json({ error });
//     }
//   });
apiGameRouter.post("/:id", async (req,res) => {
    try{
        const { body } = req
        questionObject = body
        return res.status(200).json({ question: body})

    }catch (err) {
        return res.status(500).json({ errors: err.message })
    }
    })

apiGameRouter.get("/:id", async (req,res) => {
    try{
        console.log(questionObject)
        return res.status(200).json({ question: questionObject})

    }catch (err) {
        return res.status(500).json({ errors: err.message })
    }
    })

export default apiGameRouter;
