const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const AWS = require('aws-sdk'); 



const app = express();

app.use(cors());
app.use(express.json());
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  });

app.listen(3010, () => {
    console.log(`Server Started at ${3010}`)
})
require('dotenv').config();

const mongoString = process.env.DATABASE_URL
mongoose.connect(mongoString);
const database = mongoose.connection
database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})

const routes = require('./routes/routes');

app.use('/api', routes)