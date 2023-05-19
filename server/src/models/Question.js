const Model = require("./Model")

class Question extends Model {
    static get tableName() {
        return "questions"
    }
    static get jsonSchema() {
        return {
            type: "object",
            required: ["questionText", "answer", "difficulty", "categoryId"],
            properties: {
                questionText: {type: "string"},
                answer: {type: "string"},
                difficulty: {type: "string"},
                categoryId: {type: ["string", "integer"]}
            }
        }
    }
    static get relationMappings() {
        const { Category, UserQuestion, User } = require("./index.js")
        return {
            category: {
                relation: Model.BelongsToOneRelation,
                modelClass: Category,
                join: {
                    from: "questions.categoryId",
                    to: "categories.id"
                }
            },
            userQuestions: {
                relation: Model.HasManyRelation,
                modelClass: UserQuestion,
                join: {
                    from: "questions.id",
                    to: "userQuestion.questionId"
                }
            },
            users: {
                relation: Model.ManyToManyRelation,
                modelClass: User,
                join: {
                    from: "questions.id",
                    through: {
                        from: "userQuestion.questionId",
                        to: "userQuestion.userId"
                    },
                    to: "users.id"
                }
            }
        }
    }

}

module.exports = Question