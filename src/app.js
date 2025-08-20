const express = require('express')
const app = express()

app.use(express.json())

const PORT =  process.env.PORT || 3000

const mockUsers = [
  { id: 1, username: 'John Doe', displayName: 'John' },
  { id: 2, username: 'Jane Doe', displayName: 'Jane' }
]
//array of users

app.listen(PORT, console.log(`Server running on port ${PORT}`))

app.get('/',  (req, res) =>{
  res.status(201).send({msg: 'Hello World'})
  res.cookie('name', 'express', { domain: 'localhost', path: '/' })
})

app.get('/api/users', (req, res) => {
  res.send(mockUsers)
})

app.get('/api/users/:id', (req, res) => {
  console.log(req.params)
  const parsedID = parseInt(req.params.id)
  console.log(parsedID)
  if (isNaN(parsedID)) {
    return res.status(400).send({msg: 'Invalid ID'})
  }
  const findUser = mockUsers.find((user) => user.id === parsedID)
  if (!findUser) 
    return res.status(404).send({msg: 'User not found'})
    return res.send(findUser)
  })

app.get('/api/products', (req, res) => {
  res.send([{
    id:123, name: 'chicken breast', price: 12
  }])
})
