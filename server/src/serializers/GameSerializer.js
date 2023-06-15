import JServiceClient from "../apiClient/jService.js"
import Category from "../models/Category.js"
import Clue from "../models/Clue.js"

class GameSerializer {
    static async getSummary(game) {
        const allowedAttributes = ["id", "score", "userId"]
        let serializedGame = {}
        for (const attribute of allowedAttributes) {
            serializedGame[attribute] = game[attribute]
        }
       const categories = await JServiceClient.getCategories()
       categories.forEach(async (category) => {
       const newCategory = await Category.query().insertAndFetch({name: category.category})
        category.clues.forEach(async(clue) => {
            await Clue.query().insert({value: clue.value, categoryId: newCategory.id, question: clue.question, answer: clue.answer })
        })
       })
       serializedGame.categories = categories
        return serializedGame
    }
}

export default GameSerializer