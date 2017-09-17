/* eslint unicorn/filename-case: 0 */
exports.up = function (knex) {
  return knex.schema.createTable('clients', table => {
    table.increments().primary()
    table.timestamps(true, true)
    table.string('name').notNullable()
    table.binary('public_key').notNullable()
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('clients')
}
