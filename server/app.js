const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const authRouter = require('./auth/router')
const usersRouter = require('./users/router')
const clientsRouter = require('./clients/router')
const pointsRouter = require('./points/router')
const {handleError} = require('./handlers/errors')

const app = express()

if (process.NODE_ENV === 'development') {
  app.use(morgan('tiny'))
}

app.use(helmet())
app.use(bodyParser.json())
app.use((req, res, next) => {
  res.set('Accept', 'application/json')
  next()
})
app.use('/auth', authRouter)
app.use('/users', usersRouter)
app.use('/clients', clientsRouter)
app.use('/points', pointsRouter)
app.use(handleError)

module.exports = app
