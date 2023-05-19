const Model = require("./Model")

class GameCategory extends Model {
    static get tableName() {
        return "gameCategories"
    }
    static get jsonSchema() {
        return{
            type: "object",
            required: ["categoryId", "gameId"],
            properties: {
                categoryId: {type: ["string", "integer"]},
                gameId: {type: ["string", "integer"]}
            }
        }
    }
    static get relationMappings(){
        const { Category, Game } = require("./index.js")
        return {
            category: {
                relation: Model.BelongsToOneRelation,
                modelClass: Category,
                join: {
                    from: "gameCategories.categoryId",
                    to: "categories.id"
                }
            }, 
            game: {
                relation: Model.BelongsToOneRelation,
                modelClass: Game,
                join: {
                    from: "gameCategories.gameId",
                    to: "games.id"
                }
            }
        }
    }
}

module.exports = GameCategory