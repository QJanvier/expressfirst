const { mockUsers } = require('../utils/constants')

const getUserByIdHandler = (req, res) => {
    const { findUserIndex } = req
    const findUser = mockUsers[findUserIndex]
    if (!findUser) 
        return res.status(404).send({msg: 'User not found'})
        return res.send(findUser)
}
module.exports = { getUserByIdHandler }