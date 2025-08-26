const express = require('express')
const routes = require('../src/routes/index')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const app = express()

app.use(express.json())
//middleware to parse JSON bodies
app.use(cookieParser("mySecret"))
app.use(session(
  {
    secret: "mySecret",
    saveUninitialized: false,
    resave: false,
    cookie: { maxAge: 60000 * 60 }}
))
app.use(routes)

const PORT =  process.env.PORT || 3000

app.listen(PORT, console.log(`Server running on port ${PORT}`))

app.get('/',  (req, res) =>{
  console.log(req.session)
  console.log(req.sessionID)
  req.session.visited = true
  res.cookie('Pedro', 'express', { maxAge: 60000, signed: true })
  res.status(201).send({msg: 'Hello World'})
})