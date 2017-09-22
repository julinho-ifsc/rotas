require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const authRouter = require('./auth/router')
const usersRouter = require('./users/router')
const clientsRouter = require('./clients/router')
const pointsRouter = require('./points/router')
const routesRouter = require('./routes/router')
const {handleError, handleNotFound} = require('./handlers/errors')
const {createConnection} = require('./database/connection')

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

app.use((req, res, next) => {
  res.locals.databaseConnection = createConnection()
  next()
})
app.use('/auth', authRouter)
app.use('/users', usersRouter)
app.use('/clients', clientsRouter)
app.use('/points', pointsRouter)
app.use('/routes', routesRouter)
app.use(async (req, res, next) => {
  await res.locals.databaseConnection.destroy()
  next()
})
app.use(handleError)
app.use(handleNotFound)

module.exports = app
