const app = require('./server/app')

const PORT = 8080

app.listen(PORT, () => {
  console.log('Server running on port ' + PORT)
})
