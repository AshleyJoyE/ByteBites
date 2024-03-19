const mongoose = require("mongoose")

mongoose.connect("mongodb+srv://Administrator:administrator@cluster0.1wmzwnp.mongodb.net/")

.then(()=>{
    console.log("mongodb connected")
})
.catch(()=>{
    console.log("failed to connect")
})

const LogInSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
})

const collection = new mongoose.model("Collection", LogInSchema)

module.exports = collection