/* eslint unicorn/filename-case: 0 */
exports.up = function (knex) {
  return knex.schema.createTable('points', table => {
    table.increments().primary()
    table.timestamps(true, true)
    table.string('rfid').notNullable()
    table.string('name').notNullable()
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('points')
}
