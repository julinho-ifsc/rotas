/* eslint camelcase: 0 */
const {generateHash} = require('../lib/password-hash')

async function seed(knex) {
  await knex('roles').del()
  await knex('roles').insert([{name: 'admin'}, {name: 'user'}])

  await knex('resources').del()
  await knex('resources').insert({name: 'users'})

  const roleAdmin = await knex('roles').first('id').where('name', 'admin')
  const roleUser = await knex('roles').first('id').where('name', 'user')

  const resourceId = await knex('resources').first('id').where('name', 'users')

  await knex('users').del()
  await knex('users').insert([
    {
      role_id: roleAdmin.id,
      password: await generateHash('adminpassword123'),
      email: 'admin@example.com',
      name: 'Admin'
    },
    {
      role_id: roleUser.id,
      password: await generateHash('userpassword123'),
      email: 'user@example.com',
      name: 'User'
    }
  ])

  await knex('permissions').del()
  await knex('permissions').insert([
    {
      resource_id: resourceId.id,
      role_id: roleAdmin.id,
      create: true,
      read: true,
      update: true,
      delete: true
    },
    {
      resource_id: resourceId.id,
      role_id: roleAdmin.id,
      create: false,
      read: true,
      update: false,
      delete: false
    }
  ])
}

module.exports = {
  seed
}
