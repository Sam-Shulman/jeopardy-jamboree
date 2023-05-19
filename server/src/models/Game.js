const Model = require("./Model")

class Game extends Model {
    static get tableName() {
        return "games"
    }
    static get jsonSchema() {
        return{
            type: "object",
            required: ["score", "userId"],
            properties: {
                score: {type: ["string", "integer"]},
                userId: {type: "integer"}
            }
        }
    }
    static get relationMappings() {
        const { Category, GameCategory } = require("./index.js")
        return {
            categories: {
                relation: Model.ManyToManyRelation,
                modelClass: Category,
                join: {
                    from: "games.id",
                    through: {
                        from: "gameCategories.gameId",
                        to: "gameCategories.categoryId"
                    },
                    to: "categories.id"
                }
            },
            gameCategories: {
                relation: Model.HasManyRelation,
                modelClass: GameCategory,
                join: {
                    from: "games.id",
                    to: "gameCategories.gameId"
            }
        }
        }
    } 
}

module.exports = Game
