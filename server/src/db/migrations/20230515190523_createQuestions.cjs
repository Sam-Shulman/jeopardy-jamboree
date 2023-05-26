/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
    return knex.schema.createTable("clues", (table) => {
        table.bigIncrements("id")
        table.string("question").notNullable()
        table.string("value").notNullable()
        table.string("answer").notNullable()
        table.bigInteger("categoryId").notNullable().unsigned().index().references("categories.id")
        table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now())
        table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now())
    })
}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
    return knex.schema.dropTableIfExists("clues")
}