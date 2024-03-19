require("dotenv").config(); 
const express = require("express");
const app = express();
app.listen(3000, () => console.log("Server is running"));
const mongoose = require("mongoose");

mongoose.connect(
    process.env.MONGODB_URL, 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);

const studentSchema = new mongoose.Schema({
    roll_no: Number,
    name: String,
    year: Number,
    subjects: [String]
});

const Student = mongoose.model('Student', studentSchema);

const stud = new Student({
    roll_no: 1001,
    name: 'Madison Hyde',
    year: 3,
    subjects: ['DBMS', 'OS', 'Graph Theory', 'Internet Programming']
});
stud
    .save()
    .then(
        () => console.log("One entry added"), 
        (err) => console.log(err)
    );

    app.get('/', (req, res) => {
        Student.find({}, (err, found) => {
            if (!err) {
                res.send(found);
            }
            console.log(err);
            res.send("Some error occured!")
        }).catch(err => console.log("Error occured, " + err));
    });