const express = require('express');

const router = express.Router(); 
module.exports = router;

const Credential = require('../models/Login.js');
let user = null;

const { createHash } = require('crypto');

function hash(string) {
  return createHash('sha256').update(string).digest('hex');
}

// add new Credential to Credentials Collection
router.post("/postCredentials", async (req, res) => {
  const data = new Credential({
    username: req.body.username.toLowerCase(),
    email: req.body.email.toLowerCase(),
    password: hash(req.body.password)
  });

  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// get Credentials from Credentials Table & Verify Password
router.get("/getCredentialsVerification", async (req, res) => {
  try {

    const { email, username, password } = req.query;

    const check = await Credential.findOne({
      $or: [
        { email: email.toLowerCase() },
        { username: username.toLowerCase() }
      ]
    });
    if (check && check.password === hash(password)) {
      res.status(200).json({ status: 200 });
    }
    else{
      res.status(404).json({ message: "Authorization failed" });
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Authorization failed" });
  }
});

// get Credentials from Credentials Table
router.get("/getCredentials", async (req, res) => {
  try {
    const { email, username } = req.query;

    const check = await Credential.findOne({
      $or: [
        { email: email.toLowerCase() },
        { username: username.toLowerCase() }
      ]
    });


    if (check) {
      console.log("User found");
      const { name, email, profilePhoto } = check; 
      res.status(200).json({ status: 200, name, email, profilePhoto });
    } else {
      res.status(404).json({ message: "User Not Found" });
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "User Could Not Be Found" });
  }
});
