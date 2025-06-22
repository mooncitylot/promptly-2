// @ts-nocheck
/**
 * @param {import('knex').Knex} knex
 */
export function up(knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments('id').primary()
    table.string('email').unique().notNullable()
    table.string('password_hash').notNullable()
    table.string('first_name')
    table.string('last_name')
    table.boolean('is_admin').defaultTo(false)
    table.boolean('is_approved').defaultTo(false)
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
  })
}

/**
 * @param {import('knex').Knex} knex
 */
export function down(knex) {
  return knex.schema.dropTableIfExists('users')
}
