import JServiceClient from "../apiClient/jService.js"

class GameSerializer {
    static async getSummary(game) {
        const allowedAttributes = ["id", "score", "userId"]
        let serializedGame = {}
        for (const attribute of allowedAttributes) {
            serializedGame[attribute] = game[attribute]
        }
       const categories = await JServiceClient.getCategories()
       serializedGame.categories = categories
        return serializedGame
    }
}

export default GameSerializer