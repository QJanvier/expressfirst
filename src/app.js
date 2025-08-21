const express = require('express')
const app = express()

app.use(express.json())
//middleware to parse JSON bodies
const PORT =  process.env.PORT || 3000

const mockUsers = [
  { id: 1, username: 'John Doe', displayName: 'John' },
  { id: 2, username: 'Jane Doe', displayName: 'Jane' },
  { id: 3, username: 'Alice Smith', displayName: 'Alice' },
  { id: 4, username: 'Bob Johnson', displayName: 'Bob' },
  { id: 5, username: 'Charlie Brown', displayName: 'Charlie' }
]

app.listen(PORT, console.log(`Server running on port ${PORT}`))

app.get('/',  (req, res) =>{
  res.status(201).send({msg: 'Hello World'})
  res.cookie('name', 'express', { domain: 'localhost', path: '/' })
})

app.get('/api/users', (req, res) => {
  console.log(req.query)
  const { query: { filter, value } } = req

  if (!filter && value) return res.send(
    mockUsers.filter((user) => user[filter].includes(value))
  )
  return res.send(mockUsers)  
})

app.post('/api/users', (req, res) => {
  console.log(req.body)
  const { body } = req
  const newUser = {
    id: mockUsers.length + 1,
    ...req.body
  }
  mockUsers.push(newUser)
  return res.status(201).send(newUser)
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


app.put('/api/users/:id', (req, res) => {
  const { body, params: { id } } = req
  const parsedID = parseInt(id)
  if (isNaN(parsedID)) 
    return res.sendStatus(400)
  const findUserIndex = mockUsers.findIndex((user) => user.id === parsedID)
  if (findUserIndex === -1)
    return res,sendStatus(404)
  mockUsers[findUserIndex] = { id: parsedID, ...body }
  return res.sendStatus(200)
})

app.patch('/api/users/:id', (req, res) => {
  const { body, params: { id } } = req
  const parsedID = parseInt(id)
  if (isNaN(parsedID)) 
    return res.sendStatus(400)
  const findUserIndex = mockUsers.findIndex((user) => user.id === parsedID)
  if (findUserIndex === -1)
    return res.sendStatus(404)
  mockUsers[findUserIndex] = { ...mockUsers[findUserIndex], ...body }
  return res.sendStatus(200)
})

app.delete('/api/users/:id', (req, res) => {
  const {
  params: { id }
  } = req
  const parsedID = parseInt(id)
  if (isNaN(parsedID)) 
    return res.sendStatus(400)
  const findUserIndex = mockUsers.findIndex((user) => user.id === parsedID)
  if (findUserIndex === -1)
    return res.sendStatus(404)
  mockUsers.splice(findUserIndex, 1)
  return res.sendStatus(204)
})