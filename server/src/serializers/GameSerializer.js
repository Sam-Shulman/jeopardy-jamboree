import CategorySerializer from "./CategorySerializer.js"

class GameSerializer {
    static async getSummary(game) {
        const allowedAttributes = ["id", "score", "userId"]
        let serializedGame = {}
        for (const attribute of allowedAttributes) {
            serializedGame[attribute] = game[attribute]
        }
        const relatedCategories = await game.$relatedQuery("categories")
        const serializedCategories = await Promise.all(
            relatedCategories.map(async (category) => {
               return await CategorySerializer.getSummary(category)
            })
            )
        serializedGame.categories = serializedCategories
        return serializedGame
    }
}

export default GameSerializer