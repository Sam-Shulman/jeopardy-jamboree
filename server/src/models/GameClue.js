const Model = require("./Model")

class GameClue extends Model {
    static get tableName() {
        return "gameClues"
    }
    static get relationMappings(){
        const { Clue, Game } = require("./index.js")
        return {
            clue: {
                relation: Model.BelongsToOneRelation,
                modelClass: Clue,
                join: {
                    from: "gameClues.clueId",
                    to: "clues.id"
                }
            }, 
            game: {
                relation: Model.BelongsToOneRelation,
                modelClass: Game,
                join: {
                    from: "gameClues.gameId",
                    to: "games.id"
                }
            }
        }
    }
}

module.exports = GameClue