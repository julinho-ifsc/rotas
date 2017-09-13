const express = require('express')
const compression = require('compression')
const morgan = require('morgan')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const authController = require('./controllers/auth')
const usersController = require('./controllers/users')

const app = express()

app.use(morgan('tiny'))
app.use(compression())
app.use(helmet())
app.use(bodyParser.json())
app.use('/auth', authController)
app.use('/users', usersController)

module.exports = app
