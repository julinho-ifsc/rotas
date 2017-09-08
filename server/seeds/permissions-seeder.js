/* eslint camelcase: 0 */
exports.seed = function (knex) {
  return knex('roles')
    .del()
    .then(() =>
      knex('roles').insert([{name: 'admin'}, {name: 'user'}, {name: 'guest'}])
    )
    .then(() => knex('resources').del())
    .then(() =>
      knex('resources').insert({
        name: 'users'
      })
    )
    .then(() => knex('permissions').del())
    .then(() =>
      knex('permissions').insert([
        {
          resource_id: 1,
          role_id: 1,
          create: true,
          read: true,
          update: true,
          delete: true
        },
        {
          resource_id: 1,
          role_id: 2,
          create: false,
          read: true,
          update: true,
          delete: false
        },
        {
          resource_id: 1,
          role_id: 3,
          create: false,
          read: true,
          update: false,
          delete: false
        }
      ])
    )
}
