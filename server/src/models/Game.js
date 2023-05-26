const Model = require("./Model")

class Game extends Model {
    static get tableName() {
        return "games"
    }
    static get relationMappings() {
        const { Clue, GameClue, User } = require("./index.js")
        return {
            clues: {
                relation: Model.ManyToManyRelation,
                modelClass: Clue,
                join: {
                    from: "games.id",
                    through: {
                        from: "gameClues.gameId",
                        to: "gameClues.clueId"
                    },
                    to: "clues.id"
                }
            },
            gameClues: {
                relation: Model.HasManyRelation,
                modelClass: GameClue,
                join: {
                    from: "games.id",
                    to: "gameClues.gameId"
                }
            },
            user: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: "games.userId",
                    to: "users.id"
                }
            }
        }
    } 
}

module.exports = Game
