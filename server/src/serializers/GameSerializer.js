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
    
    for (const category of categories) {
      let existingCategory = await Category.query().findOne({ name: category.category })
      
      if (!existingCategory) {
        existingCategory = await Category.query().insertAndFetch({ name: category.category })
      }
      
      for (const clue of category.clues) {
        const existingClue = await Clue.query().findOne({ categoryId: existingCategory.id, question: clue.question, answer: clue.answer })
        
        if (!existingClue) {
          await Clue.query().insert({
            value: clue.value,
            categoryId: existingCategory.id,
            question: clue.question,
            answer: clue.answer
          })
        }
      }
    }
    
    serializedGame.categories = categories
    return serializedGame
  }
}

export default GameSerializer