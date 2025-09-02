const express = require('express')
const routes = require('../src/routes/index')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const passport = require('passport')
const mongoose = require('mongoose')
const MongoStore = require('connect-mongo')
const app = express()

mongoose.connect('mongodb://localhost/express')
  .then(() => console.log('Connected to database'))
  .catch((err) => console.log('Error ${err}'))

app.use(express.json())
//middleware to parse JSON bodies
app.use(cookieParser("mySecret"))
app.use(session(
  {
    secret: "mySecret",
    saveUninitialized: true,
    resave: false,
    cookie: { maxAge: 60000 * 60 },//1 hour
    store: MongoStore.create({ client: mongoose.connection.getClient() })
  }
))
app.use(passport.initialize())
app.use(passport.session())
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
