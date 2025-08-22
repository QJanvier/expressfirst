const express = require('express')
const { query, validationResult, body, matchedData, checkSchema } = require('express-validator')
const { createUserValidationSchema } = require('./utils/validationSchemas')
const app = express()

app.use(express.json())
//middleware to parse JSON bodies

const loggingMiddleware = (req, res, next) => {
  console.log(`${req.method} - ${req.url}`)
  next()
}

const resolveIndexByUserId = (req, res, next) => {
  const { body, params: { id } } = req
  const parsedID = parseInt(id)
  if (isNaN(parsedID)) 
    return res.sendStatus(400)
  const findUserIndex = mockUsers.findIndex((user) => user.id === parsedID)
  if (findUserIndex === -1)
    return res,sendStatus(404)
  request.findUserIndex = findUserIndex
  next()
}

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

app.get('/api/users', 
  query('filter')
    .isString()
    .notEmpty()
    .withMessage('Filter must be a non-empty string')
    .isLength({ min: 3, max: 10 })
    .withMessage('Filter must be between 3 and 10 characters')
    , (req, res) => {
  const result = validationResult(req)
  console.log(result)
  const { query: { filter, value } } = req

  if (!filter && value) return res.send(
    mockUsers.filter((user) => user[filter].includes(value))
  )
  return res.send(mockUsers)  
})


app.post('/api/users', checkSchema(createUserValidationSchema), (req, res) => {
  
  const result = validationResult(req)
  console.log(result)
  if (!result.isEmpty()) {
    return res.status(400).send({ errors: result.array() })
  }
  const data = matchedData(req)
  const newUser = {
    id: mockUsers.length + 1,
    ...data
  }
  mockUsers.push(newUser)
  return res.status(201).send(newUser)
})

app.get('/api/users/:id', resolveIndexByUserId, (req, res) => {
 const { findUserIndex } = req
 const findUser = mockUsers[findUserIndex]
  if (!findUser) 
    return res.status(404).send({msg: 'User not found'})
    return res.send(findUser)
  })

app.get('/api/products', (req, res) => {
  res.send([{
    id:123, name: 'chicken breast', price: 12
  }])
})


app.put('/api/users/:id', resolveIndexByUserId , (req, res) => {
  const { body, findUserIndex } = req
  mockUsers[findUserIndex] = { id: mockUsers[findUserIndex].id, ...body }
  return res.sendStatus(200)
})

app.patch('/api/users/:id', resolveIndexByUserId, (req, res) => {
  const { body, findUserIndex } = req
  mockUsers[findUserIndex] = { ...mockUsers[findUserIndex], ...body }
  return res.sendStatus(200)
})

app.delete('/api/users/:id', resolveIndexByUserId, (req, res) => {
  const { findUserIndex } = req
  mockUsers.splice(findUserIndex, 1)
  return res.sendStatus(204)
})