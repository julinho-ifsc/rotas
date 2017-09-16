/* eslint unicorn/filename-case: 0 */
exports.up = function (knex, Promise) {
  return knex.schema.createTable('clients_permission', table => {
    table.increments().primary()
    table.timestamps(true, true)
    table
      .integer('resource_id')
      .unsigned()
      .notNullable()
      .index()
      .references('id')
      .inTable('resources')
    table
      .integer('client_id')
      .unsigned()
      .notNullable()
      .index()
      .references('id')
      .inTable('clients')
    table.boolean('create').notNullable().defaultTo(false)
    table.boolean('read').notNullable().defaultTo(false)
    table.boolean('update').notNullable().defaultTo(false)
    table.boolean('delete').notNullable().defaultTo(false)
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('clients_permission')
}
