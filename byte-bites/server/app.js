const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const AWS = require('aws-sdk'); 
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

const app = express();

app.use(cors());
app.use(express.json());

require('dotenv').config();



AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

// Create an AWS S3 instance
const s3 = new AWS.S3();

app.listen(3010, () => {
    console.log(`Server Started at ${3010}`)
})

const mongoString = process.env.DATABASE_URL
mongoose.connect(mongoString);
const database = mongoose.connection
database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


app.use(upload.single('fileData')); 


app.post('/uploadToS3', (req, res) => {
    const fileData = req.file;
    const fileName = req.body.fileName;
    
    console.log(process.env.AWS_BUCKET_NAME);
    console.log(fileName);
    console.log(fileData.buffer);

    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: uuidv4(),
        Body: fileData.buffer, 
    };

    s3.upload(params, (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Failed to upload file to S3' });
        } else {
            console.log('File uploaded successfully:', data.Location);
            res.status(200).json({ message: 'File uploaded successfully', fileUrl: data.Location });
        }
    });
});