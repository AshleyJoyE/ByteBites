const express = require('express');

const router = express.Router(); 
module.exports = router;

const Credential = require('../models/Login.js');
const Recipe = require('../models/Recipe.js');
let user = null;

const { createHash } = require('crypto');

function hash(string) {
  return createHash('sha256').update(string).digest('hex');
}

// add new Credential to Credentials Collection
router.post("/postUser", async (req, res) => {
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


router.post('/postRecipes', async (req, res) => {
  try {
      // Create a new recipe object using the request body
      const newRecipe = new Recipe(req.body);

      // Save the recipe to the database
      await newRecipe.save();

      // Send a success response
      res.status(201).json({ message: 'Recipe added successfully', recipe: newRecipe });
  } catch (error) {
      // If there's an error, send a 500 status code along with the error message
      res.status(500).json({ error: error.message });
  }
});

// get User from Credentials  & Verify Password
router.get("/getUserVerification", async (req, res) => {
  try {

    const { email, username, password } = req.query;

    const check = await Credential.findOne({
      $or: [
        { email: email.toLowerCase() },
        { username: username.toLowerCase() }
      ]
    });
    if (check && check.password === hash(password)) {
      const { username, email, profilePhoto } = check; 
      return res.status(200).json({ status: 200, username, email, profilePhoto });
    }
    else{
      res.status(404).json({ message: "Authorization failed" });
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Authorization failed" });
  }
});

// get User from User Collection
router.get("/getUser", async (req, res) => {
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
      const { username, email, profilePhoto } = check; 
      return res.status(200).json({ status: 200, username, email, profilePhoto });
    } else {
      res.status(404).json({ message: "User Not Found" });
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "User Could Not Be Found" });
  }
});

router.post("/postRecipe", async (req, res) => {
  const data = new Recipe({
    title: req.body.title,
    author_id: 


    // username: req.body.username.toLowerCase(),
    // email: req.body.email.toLowerCase(),
    // password: hash(req.body.password)
  });

  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});