require('dotenv').config()
// eslint-disable-next-line import/no-unassigned-import
require('make-promises-safe')
const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const authRouter = require('./auth/router')
const usersRouter = require('./users/router')
const clientsRouter = require('./clients/router')
const pointsRouter = require('./points/router')
const routesRouter = require('./routes/router')
const permissionsRouter = require('./permissions/router')
const resourcesRouter = require('./resources/router')
const rolesRouter = require('./roles/router')
const walkRouter = require('./walk/router')
const {handleError, handleNotFound} = require('./handlers/errors')
const {handleSanitization} = require('./handlers/sanitize')
const databaseConnection = require('./database/connection')

const app = express()

app.use(cors())
app.use(helmet())
app.use(bodyParser.json())
app.use((req, res, next) => {
  res.set('Accept', 'application/json')
  next()
})

app.use(handleSanitization)
app.use((req, res, next) => {
  res.locals.databaseConnection = databaseConnection
  next()
})
app.use('/auth', authRouter)
app.use('/users', usersRouter)
app.use('/clients', clientsRouter)
app.use('/points', pointsRouter)
app.use('/routes', routesRouter)
app.use('/permissions', permissionsRouter)
app.use('/resources', resourcesRouter)
app.use('/roles', rolesRouter)
app.use('/walk', walkRouter)
app.use(handleError)
app.use(handleNotFound)

module.exports = app
