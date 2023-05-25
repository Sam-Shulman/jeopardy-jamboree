const Model = require("./Model")

class ClueGuess extends Model {
    static get tableName() {
        return "clueGuesses"
    }
    static get relationMappings(){
        const { User, Clue } = require("./index.js")
        return {
            user: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: "clueGuesses.userId",
                    to: "users.id"
                }
            }, 
            clue: {
                relation: Model.BelongsToOneRelation,
                modelClass: Clue,
                join: {
                    from: "clueGuesses.clueId",
                    to: "clues.id"
                }
            }
        }
    }
}

module.exports = ClueGuess