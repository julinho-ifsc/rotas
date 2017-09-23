/* eslint unicorn/filename-case: 0 */
exports.up = function (knex) {
  return knex.schema.table('routes_point', table => {
    table.string('action', 1).notNullable()
  })
}

exports.down = function (knex) {
  return knex.schema.table('routes_point', table => {
    table.dropColumn('action')
  })
}
