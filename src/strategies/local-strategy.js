const passport = require('passport');
const { Strategy } = require('passport-local');
const { comparePassword } = require('../utils/helpers');
const { User } = require('../mongoose/schemas/user');


passport.serializeUser((user, done) => {
    console.log(`Inside Serialize User`)
    console.log(user)
    done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
    console.log(`Inside Deserialize User`)
    try {
        const findUser = await User.findById(id)
        if (!findUser) throw new Error('User not found')
        done(null, findUser)
    } catch (err) {
        done(err, null)
    }
})

//verify function
passport.use(
    new Strategy(async (username, password, done) => {
        try {
            const findUser = await User.findOne({ username })
            if (!findUser) throw new Error('User not found')
            if (!comparePassword(password, findUser.password)) throw new Error('Invalid credentials')
            done(null, findUser);
        } catch (err) {
            done(err, null);
        }
    })
)

module.exports = passport;