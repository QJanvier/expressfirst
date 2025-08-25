const router = require('express').Router()

router.get('/api/products', (req, res) => {
  res.send([{
    id:123, name: 'chicken breast', price: 12
  }])
})

module.exports = router