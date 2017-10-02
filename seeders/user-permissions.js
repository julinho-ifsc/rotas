/* eslint camelcase: 0 */
const {generateHash} = require('../server/core/password-hash')

async function seed(knex) {
  await knex('clients_permission').del()
  await knex('clients').del()
  await knex('permissions').del()
  await knex('users').del()
  await knex('resources').del()
  await knex('roles').del()

  await knex('roles').insert([{name: 'admin'}, {name: 'user'}])

  await knex('resources').insert([
    {
      name: 'users'
    },
    {
      name: 'clients'
    },
    {
      name: 'points'
    },
    {
      name: 'routes'
    },
    {
      name: 'permissions'
    },
    {
      name: 'roles'
    }
  ])

  const {id: roleAdminId} = await knex('roles')
    .first('id')
    .where('name', 'admin')
  const {id: roleUserId} = await knex('roles').first('id').where('name', 'user')

  const {id: userResourceId} = await knex('resources')
    .first('id')
    .where('name', 'users')
  const {id: clientsResourceId} = await knex('resources')
    .first('id')
    .where('name', 'clients')
  const {id: pointsResourceId} = await knex('resources')
    .first('id')
    .where('name', 'points')
  const {id: routesResourceId} = await knex('resources')
    .first('id')
    .where('name', 'routes')

  const {id: permissionsResourceId} = await knex('resources')
    .first('id')
    .where('name', 'permissions')

  await knex('users').insert([
    {
      role_id: roleAdminId,
      password: await generateHash('adminpassword123'),
      email: 'admin@example.com',
      name: 'Admin'
    },
    {
      role_id: roleUserId,
      password: await generateHash('userpassword123'),
      email: 'user@example.com',
      name: 'User'
    }
  ])

  await knex('permissions').insert([
    {
      resource_id: userResourceId,
      role_id: roleAdminId,
      create: true,
      read: true,
      update: true,
      delete: true
    },
    {
      resource_id: permissionsResourceId,
      role_id: roleAdminId,
      create: true,
      read: true,
      update: true,
      delete: true
    },
    {
      resource_id: clientsResourceId,
      role_id: roleAdminId,
      create: true,
      read: true,
      update: true,
      delete: true
    },
    {
      resource_id: pointsResourceId,
      role_id: roleAdminId,
      create: true,
      read: true,
      update: true,
      delete: true
    },
    {
      resource_id: routesResourceId,
      role_id: roleAdminId,
      create: true,
      read: true,
      update: true,
      delete: true
    },
    {
      resource_id: userResourceId,
      role_id: roleUserId,
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
