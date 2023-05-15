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
        const { Question } = require("./index.js")
        return {
            questions: {
                relation: Model.HasManyRelation,
                modelClass: Question,
                join: {
                    from: "categories.id",
                    to: "questions.categoryId"
                }
            }
        }
    }

}

module.exports = Category