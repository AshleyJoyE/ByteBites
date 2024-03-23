const mongoose = require('mongoose');
const CredentialSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    numberOfFailedAttempts:{
        type: Integer,
        required: false
    }
})
const collection = new mongoose.model("Collection", CredentialSchema)

module.exports = collection