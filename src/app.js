const express = require('express')
const routes = require('../src/routes/index')
const app = express()

app.use(express.json())
//middleware to parse JSON bodies
app.use(routes)

const PORT =  process.env.PORT || 3000

app.listen(PORT, console.log(`Server running on port ${PORT}`))

app.get('/',  (req, res) =>{
  res.status(201).send({msg: 'Hello World'})
  res.cookie('name', 'express', { domain: 'localhost', path: '/' })
})