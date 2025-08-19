const express = require('express')
const app = express()

app.use(express.json())

const PORT =  process.env.PORT || 3000

app.listen(PORT, console.log(`Server running on port ${PORT}`))

app.get('/',  (req, res) =>{
  res.status(201).send({msg: 'Hello World'})
  res.cookie('name', 'express', { domain: 'localhost', path: '/' })
})

app.get('/api/users', (req, res) => {
  res.send([
    { id: 1, username: 'John Doe', displayName: 'John' },
    { id: 2, username: 'Jane Doe', displayName: 'Jane' }
  ])
})

app.get('/api/products', (req, res) => {
  res.send([{
    id:123, name: 'chicken breast', price: 12
  }])
})
