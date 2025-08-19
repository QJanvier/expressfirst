const express = require('express')
const user = require('./user.js')
const app = express()

app.use(express.json())
app.use(user)

const PORT =  process.env.PORT || 3000

app.listen(PORT, console.log(`Server running on port ${PORT}`))

app.get('/', function (req, res) {
  res.cookie('name', 'express', { domain: 'localhost', path: '/' })
  res.end()
})

