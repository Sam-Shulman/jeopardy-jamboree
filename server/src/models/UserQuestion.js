const Model = require("./Model")

class UserQuestion extends Model {
    static get tableName() {
        return "userQuestion"
    }
    static get jsonSchema() {
        return{
            type: "object",
            required: ["userId", "questionId"],
            properties: {
                userId: {type: ["string", "integer"]},
                questionId: {type: ["string", "integer"]},
                hasAnswered: {type: "boolean"}
            }
        }
    }
    static get relationMappings(){
        const { User, Question } = require("./index.js")
        return {
            user: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: "userQuestion.userId",
                    to: "users.id"
                }
            }, 
            question: {
                relation: Model.BelongsToOneRelation,
                modelClass: Question,
                join: {
                    from: "userQuestion.questionId",
                    to: "questions.id"
                }
            }
        }
    }
}

module.exports = UserQuestion