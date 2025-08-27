const passport = require('passport');
const { Strategy } = require('passport-local');
const { mockUsers } = require('../utils/constants');

passport.serializeUser((user, done) => {
    console.log(`Inside Serialize User`)
    done(null, user.id)
})

passport.deserializeUser((id, done) => {
    console.log(`Inside Deserialize User`)
    try {
        const findUser = mockUsers.find((user) => user.id === id)
        if (!findUser) throw new Error('User not found')
        done(null, findUser)
    } catch (err) {
        done(err, null)
    }
})

//verify function
passport.use(
    new Strategy((username, password, done) => {
        console.log(`Username: ${username}, Password: ${password}`);
        try {
            const findUser = mockUsers.find((user) => user.username === username)
            if (!findUser)throw new Error('User not found');
            if (findUser.password !== password)
                throw new Error('Invalid credentials');
            done(null, findUser)
        } catch {err} {
            done(err, null);
        }       
    })
)

module.exports = passport;