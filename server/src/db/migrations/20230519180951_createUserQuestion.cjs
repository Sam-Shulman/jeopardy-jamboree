/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
    return knex.schema.createTable("clueGuesses", (table) => {
        table.bigIncrements("id")
        table.bigInteger("userId").unsigned().index().notNullable().references("users.id")
        table.bigInteger("clueId").unsigned().index().notNullable().references("clues.id")
        table.string("userAnswer").notNullable()
        table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now())
        table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now())
    })
}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
    return knex.schema.dropTableIfExists("clueGuesses")
}
