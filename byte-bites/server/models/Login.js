const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    profilePhoto: {
        type: String,
        required: false,
        default: "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg"
    },
    bio: {
        type: String,
        required: false,
        default: function() {
            return `${this.username} has not provided a biography!`;
        }
    },
    numberOfFailedAttempts:{
        type: Number,
        required: false,
        default: 0
    },
    admin: {
        type: Boolean,
        required: false,
        default: false
        }
})
const User = new mongoose.model("User", UserSchema)

module.exports = User