const express = require('express')
const router = express.Router()

router.get('/user',function (req, res) {
  console.log('User route')
  res.end()
})

module.exports = router