const express = require('express')
const path = require('path')
const app = express()

app.use(express.json())

const myMiddleware = (req, res, next) => {
  res.send('Ok')
  console.log(Date.now())
  next()
}

// app.use(myMiddleware)

app.get('/', function (req, res) {
  res.cookie('name', 'express', { domain: 'localhost', path: '/' })
  res.end()
})

app.post('/user',function (req, res) {
  console.log(req.body)
  res.end()
})
 
app.listen(3000, console.log('Server running on port 3000'))