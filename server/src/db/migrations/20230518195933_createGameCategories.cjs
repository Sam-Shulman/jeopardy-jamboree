/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
    return knex.schema.createTable("gameClues", (table) => {
        table.bigIncrements("id")
        table.bigInteger("gameId").unsigned().index().notNullable().references("games.id")
        table.bigInteger("clueId").unsigned().index().notNullable().references("clues.id")
        table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now())
        table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now())
    })
    

}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
    return knex.schema.dropTableIfExists("gameClues")
}