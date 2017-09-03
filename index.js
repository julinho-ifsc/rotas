const express = require('express')

const PORT = 80

const app = express()
app.get('/', (req, res) => {
  res.send('Hello world\n')
})

app.listen(PORT)
