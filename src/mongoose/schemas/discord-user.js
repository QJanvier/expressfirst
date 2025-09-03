const mongoose = require('mongoose');

const discordUserSchema = new mongoose.Schema({
    username: {
        type: mongoose.Schema.Types.String,
        required: true,
        unique: true,
    },
    discordId: {
        type: mongoose.Schema.Types.String,
        required: true,
        unique: true,
    },
});
const DiscordUser = mongoose.model('DiscordUser', discordUserSchema);
module.exports = { DiscordUser };