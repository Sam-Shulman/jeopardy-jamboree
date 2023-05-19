/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
    return knex.schema.createTable("userQuestion", (table) => {
        table.bigIncrements("id")
        table.bigInteger("userId").unsigned().index().notNullable().references("users.id")
        table.bigInteger("questionId").unsigned().index().notNullable().references("questions.id")
        table.boolean("hasAnswered").defaultTo(false)
        table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now())
        table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now())
    })
}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
    return knex.schema.dropTableIfExists("userQuestion")
}
