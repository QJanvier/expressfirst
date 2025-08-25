const router = require('express').Router()
const usersRoutes = require('./user')
const productsRoutes = require('./products')

router.use(usersRoutes)
router.use(productsRoutes)

module.exports = router