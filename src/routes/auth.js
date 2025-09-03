const express = require('express')
const passport = require('passport')
const discordStrategy = require('../strategies/discord-strategy')
const localStrategy = require('../strategies/local-strategy')
const router = require('express').Router()
const app = express()


app.use(passport.initialize())
app.use(passport.session())


router.post("/api/auth", passport.authenticate("local"),	(request, response) => {
		response.sendStatus(200);
	});

router.get("/api/auth/status", (request, response) => {
	return request.user ? response.send(request.user) : response.sendStatus(401);
});

router.post('/api/auth/logout', (req, res) => {
  if (!req.user) return res.sendStatus(401)
    req.logout((err) => {
  if (err) return res.status(500).send({ msg: 'Logout error', err })
    return res.send({ msg: 'Logged out' })
  })
})

//discord auth routes
router.get('/api/auth/discord', passport.authenticate('discord'))
router.get('/api/auth/discord/redirect', passport.authenticate('discord'), (req, res) => {
  console.log(req.session, req.user)
  res.sendStatus(200)
})



module.exports = router