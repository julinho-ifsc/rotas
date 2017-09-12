const express = require('express')
const compression = require('compression')
const morgan = require('morgan')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const authController = require('./controllers/auth')

const app = express()

app.use(morgan('tiny'))
app.use(compression())
app.use(helmet())
app.use(bodyParser.json())
app.use('/auth', authController)

module.exports = app
