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
        const { Category } = require("./index.js")
        return {
            category: {
                relation: Model.BelongsToOneRelation,
                modelClass: Category,
                join: {
                    from: "questions.categoryId",
                    to: "categories.id"
                }
            }
        }
    }

}

module.exports = Question