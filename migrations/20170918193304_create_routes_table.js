/* eslint unicorn/filename-case: 0 */
exports.up = function (knex) {
  return knex.schema.createTable('routes', table => {
    table.increments().primary()
    table.timestamps(true, true)
    table.string('name').notNullable()
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('routes')
}
