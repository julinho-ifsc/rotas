const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')

const app = express()

app.use(helmet())
app.use(morgan('tiny'))

app.get('/', (req, res) => {
  res.send('Hello world')
})

app.listen(8080)
