const express = require('express')
const compression = require('compression')
const morgan = require('morgan')
const helmet = require('helmet')

const app = express()

app.use(morgan('tiny'))
app.use(compression())
app.use(helmet())

app.get('/', (req, res) => {
  res.send('Hello world')
})

module.exports = app
