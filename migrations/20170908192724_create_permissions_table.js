/* eslint unicorn/filename-case: 0 */
exports.up = function (knex) {
  return knex.schema.createTable('permissions', table => {
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
      .integer('role_id')
      .unsigned()
      .notNullable()
      .index()
      .references('id')
      .inTable('roles')
    table.boolean('create').notNullable().defaultTo(false)
    table.boolean('read').notNullable().defaultTo(false)
    table.boolean('update').notNullable().defaultTo(false)
    table.boolean('delete').notNullable().defaultTo(false)
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('permissions')
}
