/* eslint unicorn/filename-case: 0 */
exports.up = function (knex) {
  return knex.schema.createTable('users', table => {
    table.increments().primary()
    table.timestamps(true, true)
    table
      .integer('role_id')
      .unsigned()
      .notNullable()
      .index()
      .references('id')
      .inTable('roles')
    table.string('password', 60).notNullable()
    table.string('email').notNullable()
    table.string('name').notNullable()
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('users')
}
