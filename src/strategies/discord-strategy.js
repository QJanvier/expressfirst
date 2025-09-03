const passport = require('passport');
const { Strategy } = require('passport-discord');
const { DiscordUser } = require('../mongoose/schemas/discord-user');



passport.serializeUser((user, done) => {
    console.log(`Inside Serialize User`)
    console.log(user)
    done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
    console.log(`Inside Deserialize User`)
    try {
        const findUser = await DiscordUser.findById(id)
        return findUser ? done(null, findUser) : done(null, null)
    } catch (err) {
        done(err, null)
    }
})

passport.use(
    new Strategy({
        clientID: '1412817186921255094',
        clientSecret: 'Y-DaBct2kSWIp9o7Ub-h0VM6RrvU3qIr',
        callbackURL: 'http://localhost:3000/api/auth/discord/redirect',
        scope: ['identify'],
    }, async (accessToken, refreshToken, profile, done) => {
        let findUser;
        try { 
            findUser = await DiscordUser.findOne({ discordId: profile.id });
        } catch(err) {
            return done(err);
        }
        try {
            if (!findUser) {
            const newUser = new DiscordUser({
                username: profile.username,
                discordId: profile.id,
            });
            const newSavedUser = await newUser.save();
            return done(null, newSavedUser);
            }
            return done(null, findUser);
        } catch (err) {
            return done(err);
        }
    })        
  )

module.exports = passport;