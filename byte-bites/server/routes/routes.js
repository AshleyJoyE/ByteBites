const express = require('express');

const router = express.Router(); 
module.exports = router;

const Credential = require('../models/Login.js');
const Recipe = require('../models/Recipe.js');
const Collection = require('../models/Collection.js');
let user = null;

const multer = require('multer');
const { v4: uuidv4 } = require('uuid');





const { createHash } = require('crypto');

function hash(string) {
  return createHash('sha256').update(string).digest('hex');
}

// add new Recipe to Recipe Collection
router.post("/postRecipe", async (req, res) => {
  const data = new Recipe({
    title: req.body.title,
    author_id: req.body.author_id,
    recipePhoto: req.body.recipePhoto,
    description: req.body.description,
    cookTime: req.body.cookTime,
    prepTime: req.body.prepTime,
    servings: req.body.servings,
    caloriesPerServing: req.body.caloriesPerServing,
    ingredients: req.body.ingredients,
    directions: req.body.directions,
    categories: req.body.categories,
  });

  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

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


router.post('/postCollection', async (req, res) => {
  const data = new Collection({
    collectionName: req.body.collectionName,
    owner_id: req.body.owner_id,
  });

  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(400).json({ message: error.message });
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
      const { username, email, profilePhoto, _id, bio, admin } = check; 
      return res.status(200).json({ status: 200, _id, username, email, profilePhoto, bio, admin });
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
      const { username, email, profilePhoto, _id, bio, admin } = check; 
      return res.status(200).json({ status: 200, _id, username, email, profilePhoto, bio, admin });
    } else {
      res.status(404).json({ message: "User Not Found" });
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "User Could Not Be Found" });
  }
});

// update user's profile photo
router.put('/putUser/:userId/profilePhoto', async (req, res) => {
  const userId = req.params.userId;
  const newProfilePhotoUrl = req.body.profilePhoto;
  try {
     // find user
      const user = await User.findById(userId);
      if (!user) {
          return res.status(404).json({ message: "User not found" });
      }
      //update profile photo
      user.profilePhoto = newProfilePhotoUrl;
      // save
      const updatedUser = await user.save();
      // return
      res.status(200).json(updatedUser);
  } catch (error) {
      console.error("Error updating user profile photo:", error);
      res.status(500).json({ message: "Internal server error" });
  }
});
// router.post("/postRecipe", async (req, res) => {
//   const data = new Recipe({
//     title: req.body.title,
//     author_id: 


//     // username: req.body.username.toLowerCase(),
//     // email: req.body.email.toLowerCase(),
//     // password: hash(req.body.password)
//   });

//   try {
//     const dataToSave = await data.save();
//     res.status(200).json(dataToSave);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


router.use(upload.single('fileData')); 


router.post('/uploadToS3', (req, res) => {
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