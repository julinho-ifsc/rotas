const express = require('express')

const router = express.Router()

const {verifyPassword} = require('../core/password-hash')
const db = require('../config/database')
const jwt = require('jsonwebtoken')

async function getResourceIdByName(name) {
  return db.select('id').from('resources').where('name', name)
}

async function getUserByEmail(email) {
  return db
    .first('name', 'role_id', 'password')
    .from('users')
    .where('email', email)
}

async function isAuthorized({resouceId, roleId, action}) {
  return db('permissions')
    .join('resources', 'resources.id', 'permissions.resource_id')
    .join('roles', 'roles.id', 'permission.role_id')
    .select('users.' + action)
    .where({
      'resources.id': resouceId,
      'roles.id': roleId
    })
}

router.post('/', async (req, res) => {
  try {
    const {email, password} = req.body
    const user = await getUserByEmail(email)
    const userIsAuthorized = await verifyPassword(password, user.password)

    if (userIsAuthorized === false) {
      return res.status(401).json({
        message: 'Invalid password'
      })
    }

    const roleId = user.role_id

    res.json({
      token: jwt.sign(
        {
          role: roleId,
          name: user.name,
          email
        },
        'shhhhh',
        {algorithm: 'RS256'}
      )
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: 'Internal Server Error'
    })
  }
})

module.exports = router
