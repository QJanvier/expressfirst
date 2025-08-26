const router = require('express').Router();
const { query, validationResult, checkSchema, matchedData } = require('express-validator');
const { mockUsers } = require('../utils/constants');
const { createUserValidationSchema } = require('../utils/validationSchemas');
const { resolveIndexByUserId } = require('../utils/middlewares');

router.get('/api/users',
    query('filter')
        .isString()
        .notEmpty()
        .withMessage('Filter must be a non-empty string')
        .isLength({ min: 3, max: 10 })
        .withMessage('Filter must be between 3 and 10 characters')
        ,(req, res) => {
          console.log(req.sessionID)
          req.sessionStore.get(req.sessionID, (err, sessionData) => {
            if (err) {
              console.log(err)
              throw err
            }
            console.log(sessionData)
          })
          const result = validationResult(req)
          console.log(result)
          const { query: { filter, value } } = req
        
          if (!filter && value) return res.send(
            mockUsers.filter((user) => user[filter].includes(value))
          )
          return res.send(mockUsers)  
})

router.get('/api/users/:id', resolveIndexByUserId, (req, res) => {
    const { findUserIndex } = req
    const findUser = mockUsers[findUserIndex]
    if (!findUser) 
        return res.status(404).send({msg: 'User not found'})
        return res.send(findUser)
})

router.post('/api/users', checkSchema(createUserValidationSchema), (req, res) => {
    
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

router.put('/api/users/:id', resolveIndexByUserId , (req, res) => {
  const { body, findUserIndex } = req
  mockUsers[findUserIndex] = { id: mockUsers[findUserIndex].id, ...body }
  return res.sendStatus(200)
})

router.patch('/api/users/:id', resolveIndexByUserId, (req, res) => {
  const { body, findUserIndex } = req
  mockUsers[findUserIndex] = { ...mockUsers[findUserIndex], ...body }
  return res.sendStatus(200)
})

router.delete('/api/users/:id', resolveIndexByUserId, (req, res) => {
  const { findUserIndex } = req
  mockUsers.splice(findUserIndex, 1)
  return res.sendStatus(204)
})





module.exports = router;