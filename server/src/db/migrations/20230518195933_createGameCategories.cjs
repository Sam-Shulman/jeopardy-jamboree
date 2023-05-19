/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
    return knex.schema.createTable("gameCategories", (table) => {
        table.bigIncrements("id")
        table.bigInteger("gameId").unsigned().index().notNullable().references("games.id")
        table.bigInteger("categoryId").unsigned().index().notNullable().references("categories.id")
        table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now())
        table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now())
    })
    

}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
    return knex.schema.dropTableIfExists("gameCategories")
}