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
    numberOfFailedAttempts:{
        type: Number,
        required: false,
        default: 0
    }
})
const collection = new mongoose.model("Collection", CredentialSchema)

module.exports = collection