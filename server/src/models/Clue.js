const Model = require("./Model")

class Clue extends Model {
    static get tableName() {
        return "clues"
    }
    static get relationMappings() {
        const { Category, ClueGuess, User } = require("./index.js")
        return {
            category: {
                relation: Model.BelongsToOneRelation,
                modelClass: Category,
                join: {
                    from: "clues.categoryId",
                    to: "categories.id"
                }
            },
            clueGuesses: {
                relation: Model.HasManyRelation,
                modelClass: ClueGuess,
                join: {
                    from: "clues.id",
                    to: "clueGuesses.clueId"
                }
            },
            users: {
                relation: Model.ManyToManyRelation,
                modelClass: User,
                join: {
                    from: "clues.id",
                    through: {
                        from: "clueGuesses.clueId",
                        to: "clueGuesses.userId"
                    },
                    to: "users.id"
                }
            }
        }
    }
}

module.exports = Clue