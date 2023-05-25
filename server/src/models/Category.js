const Model = require("./Model")

class Category extends Model {
    static get tableName() {
        return "categories"
    }
    static get relationMappings() {
        const { Clue } = require("./index.js")
        return {
            clues: {
                relation: Model.HasManyRelation,
                modelClass: Clue,
                join: {
                    from: "categories.id",
                    to: "clues.categoryId"
                }
            }
    }
}
}

module.exports = Category