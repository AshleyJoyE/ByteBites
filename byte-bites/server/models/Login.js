const mongoose = require('mongoose');
const CredentialSchema = new mongoose.Schema({
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
    numberOfFailedAttempts:{
        type: Number,
        required: false,
        default: 0
    }
})
const collection = new mongoose.model("Collection", CredentialSchema)

module.exports = collection