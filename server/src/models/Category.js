const Model = require("./Model")

class Category extends Model {
    static get tableName() {
        return "categories"
    }
    static get jsonSchema() {
        return {
            type: "object",
            required: ["name"],
            properties: {
                name: {type: "string"}
            }
        }
    }
    static get relationMappings() {
        const { Question, Game, GameCategory } = require("./index.js")
        return {
            questions: {
                relation: Model.HasManyRelation,
                modelClass: Question,
                join: {
                    from: "categories.id",
                    to: "questions.categoryId"
                }
            },
            games: {
                relation: Model.ManyToManyRelation,
                modelClass: Game,
                join: {
                    from: "categories.id",
                    through: {
                        from: "gameCategories.categoryId",
                        to: "gameCategories.gameId"
                    },
                    to: "games.id"
                }
            },
            gameCategories: {
                relation: Model.HasManyRelation,
                modelClass: GameCategory,
                join: {
                    from: "categories.id",
                    to: "gameCategories.categoryId"
            }
        }
    }
}
}

module.exports = Category