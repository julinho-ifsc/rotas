const express = require('express')
const {generateToken} = require('../services/auth')
const {UnauthorizedUserError} = require('../core/errors')

// eslint-disable-next-line new-cap
const router = express.Router()

router.post('/', async (req, res) => {
  try {
    const {email, password} = req.body
    const token = await generateToken(email, password)

    return res.json({token})
  } catch (err) {
    if (err.name === UnauthorizedUserError.name) {
      return res.status(401).json({
        message: 'Invalid password'
      })
    }

    console.error(err)
    return res.status(500).json({
      message: 'Internal Server Error'
    })
  }
})

module.exports = router
