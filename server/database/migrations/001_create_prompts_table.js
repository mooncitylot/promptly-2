// @ts-nocheck
/**
 * @param {import('knex').Knex} knex
 */
export function up(knex) {
  return knex.schema.createTable('prompts', (table) => {
    table.increments('id').primary()
    table.string('title').notNullable()
    table.text('prompt').notNullable()
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
  })
}

/**
 * @param {import('knex').Knex} knex
 */
export function down(knex) {
  return knex.schema.dropTableIfExists('prompts')
}
