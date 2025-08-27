const passport = require('passport')
const localStrategy = require('../strategies/local-strategy')

app.use(passport.initialize())
app.use(passport.session())

app.post('/api/auth/status', passport.authenticate('local'), (req, res) => {
  console.log(`Inside /api/auth/status endpoint`)
  console.log(req.user)
  console.log(req.session)
  return req.user ? res.send(req.user) : res.sendStatus(401)
})

app.post('/api/auth/logout', (req, res) => {
  if (!req.user) return res.sendStatus(401)
    req.logout((err) => {
  if (err) return res.status(500).send({ msg: 'Logout error', err })
    return res.send({ msg: 'Logged out' })
  })
})

module.exports = app