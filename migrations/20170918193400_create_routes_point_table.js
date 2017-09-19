/* eslint unicorn/filename-case: 0 */
exports.up = function (knex) {
  return knex.schema.createTable('routes_point', table => {
    table.increments().primary()
    table.timestamps(true, true)
    table
      .integer('route_id')
      .unsigned()
      .notNullable()
      .index()
      .references('id')
      .inTable('routes')
    table
      .integer('point_id')
      .unsigned()
      .notNullable()
      .index()
      .references('id')
      .inTable('points')
    table.integer('position').notNullable()
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('routes_point')
}
