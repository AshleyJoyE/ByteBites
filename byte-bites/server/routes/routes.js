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
    username: req.body.username,
    email: req.body.email,
    password: hash(req.body.password)
  });

  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// get Credentials from Credentials Table
router.get("/getCredentials", async (req, res) => {
  try {
    const check = await Credential.findOne({
      $or: [
        { email: req.body.email },
        { username: req.body.username }
      ]
    });
    if (check && check.password === hash(req.body.password)) {
      console.log("match");
      user = { email: response.email, totalHours: response.totalHours };
      res.status(200).json({ status: 200 });
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Authorization failed" });
  }
});
