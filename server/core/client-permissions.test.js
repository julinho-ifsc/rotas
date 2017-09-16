const assert = require('assert')
const {clientHasValidPermissions} = require('./client-permissions')

assert.strictEqual(
  clientHasValidPermissions(
    [
      {
        resource_id: 1,
        create: true,
        read: true,
        update: true,
        delete: true
      },
      {
        resource_id: 2,
        create: false,
        read: true,
        update: true,
        delete: true
      }
    ],
    [
      {
        resource_id: 1,
        create: true,
        read: false,
        update: true,
        delete: false
      },
      {
        resource_id: 2,
        create: false,
        read: true,
        update: true,
        delete: false
      }
    ]
  ),
  true,
  'a client can have a permission that the resource owner has'
)

assert.strictEqual(
  clientHasValidPermissions(
    [
      {
        resource_id: 1,
        create: true,
        read: true,
        update: true,
        delete: true
      },
      {
        resource_id: 2,
        create: false,
        read: true,
        update: true,
        delete: true
      }
    ],
    [
      {
        resource_id: 1,
        create: true,
        read: false,
        update: true,
        delete: false
      },
      {
        resource_id: 2,
        create: true,
        read: true,
        update: true,
        delete: false
      }
    ]
  ),
  false,
  'a client cannot have a permission that the resource owner does not have'
)

assert.strictEqual(
  clientHasValidPermissions(
    [
      {
        resource_id: 1,
        create: true,
        read: true,
        update: true,
        delete: true
      }
    ],
    [
      {
        resource_id: 3,
        create: true,
        read: true,
        update: true,
        delete: false
      }
    ]
  ),
  false,
  'a client cannot have a permission in a resource that the resource owner does not own'
)
