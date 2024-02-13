const express = require("express");
const app = express();
app.listen(3000, () => console.log("Server is running"));
const mongoose = require("mongoose");

mongoose.connect(
    process.env.MONGODB_URI, 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);