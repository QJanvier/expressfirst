const router = require('express').Router()
const usersRoutes = require('./user')
const productsRoutes = require('./products')
const authRoutes = require('./auth')

router.use(usersRoutes)
router.use(productsRoutes)
router.use(authRoutes)

module.exports = router