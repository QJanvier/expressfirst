const express = require('express')
const routes = require('../src/routes/index')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const passport = require('passport')
const mongoose = require('mongoose')
const localStrategy = require('./strategies/local-strategy')
const { mockUsers } = require('./utils/constants')
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
    saveUninitialized: false,
    resave: false,
    cookie: { maxAge: 60000 * 60 }}
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









// //fake auth endpoint
// app.post('/api/auth', (req, res) => {
//   const { body: { username, password } } = req
//   const findUser = mockUsers.find((user) => user.username === username)
//   if (!findUser || findUser.password !== password) return res.status(401).send({ msg: 'Invalid credentials' })
  
//   req.session.user = findUser
//   return res.status(200).send(findUser)
// })

// app.get('/api/auth/status', (req, res) => {
//   req.sessionStore.get(req.sessionID, (err, session) => {
//     console.log(session)
//   })
//   return req.session.user
//    ? res.status(200).send(req.session.user)
//    : res.sendStatus(401).send({ msg: "Not authenticated" })
// })

// app.post('/api/cart', (req, res) => {
//   if (!req.session.user) return res.sendStatus(401)
//   const { body: item } = req

//   const { cart } = req.session
//   if (cart) {
//     cart.push(item)
//   } else {
//     req.session.cart = [item]
//   }
//   return res.status(201).send(item) 
// })

// app.get('/api/cart', (req, res) => {
//   if (!req.session.user) return res.sendStatus(401)
//   return res.send(req.session.cart ?? [])
// })

// //end fake auth endpoint