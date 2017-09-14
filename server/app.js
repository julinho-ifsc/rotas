const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const authRouter = require('./routers/auth')
const usersRouter = require('./routers/users')

const app = express()

if (process.NODE_ENV === 'development') {
  app.use(morgan('tiny'))
}

app.use(helmet())
app.use(bodyParser.json())
app.use('/auth', authRouter)
app.use('/users', usersRouter)

module.exports = app
