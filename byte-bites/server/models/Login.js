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
        default: " https://byte-bites.s3.us-east-2.amazonaws.com/7c510b84-4113-4a0c-b46f-635d69c98180"
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