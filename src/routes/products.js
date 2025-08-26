const router = require('express').Router()

router.get('/api/products', (req, res) => {
  console.log(req.cookies)
  console.log(req.signedCookies.Pedro)
  if (req.signedCookies.Pedro && req.signedCookies.Pedro === 'express')
    return res.send([{ id:123, name: 'chicken breast', price: 12 }])
    return res.send({ msg: "Sorry you need the correct cookie" })
})

module.exports = router