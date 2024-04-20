const express = require('express');

const router = express.Router(); 
module.exports = router;

const Credential = require('../models/Login.js');
const Recipe = require('../models/Recipe.js');
const Collection = require('../models/Collection.js');
const Review = require("../models/Review.js");
let user = null;

const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

const AWS = require('aws-sdk'); 
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});



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

router.delete('/deleteRecipe/:recipeId', async (req, res) => {
  const recipeId = req.params.recipeId;
  try {
   
    const response = await Recipe.deleteOne({ _id: recipeId });
    
   
    if (response.deletedCount === 0) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    
   
    res.status(200).json(`${recipeId} successfully deleted`);
  } catch (error) {
    console.error("Error deleting recipe:", error);
    res.status(500).json({ message: "Internal server error" });
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

// get Collection from Recioe Collection by Object ID
router.get("/getCollectionByCollectionObjectID", async (req, res) => {
  try {
    const { id } = req.query;

    const check = await Collection.findById(id);

    if (check) {
      console.log("Collection Found");
      const { collectionName, owner_id, recipes, _id} = check; 
      return res.status(200).json({ status: 200, collectionName, owner_id, recipes, _id });
    } else {
      res.status(404).json({ message: "Collection Not Found" });
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Collection Could Not Be Found" });
  }
});


// get Collection from Recioe Collection by Object ID
router.get("/getCollectionByUserObjectID", async (req, res) => {
  try {
    const { id } = req.query;

    const collections = await Collection.find({ owner_id: id });

    if (collections.length > 0) {
      console.log("Collections found");
      return res.status(200).json({ status: 200, collections });
    } else {
      res.status(404).json({ message: "Collections Not Found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});


router.put('/putCollection/:collectionId/addRecipe', async (req, res) => {
  const collectionId = req.params.collectionId;
  const recipeId = req.body.recipeId; // Assuming the recipe ID is passed in the request body
  
  try {
    // Find the collection
    const collection = await Collection.findById(collectionId);
    if (!collection) {
      return res.status(404).json({ message: "Collection not found" });
    }

    // Add the recipe ID to the collection's recipes array
    if (!collection.recipes) {
      collection.recipes = [recipeId]; // Create array if it doesn't exist
    }
    else if (collection.recipes.indexOf(recipeId) !=-1){
      console.error("Recipe is already saved!");
      res.status(500).json({ message: "Internal server error" });
    } 
    else {
      collection.recipes.push(recipeId); // Add recipe ID to existing array
    }

    // Save the updated collection
    const updatedCollection = await collection.save();
    
    // Return the updated collection
    res.status(200).json(updatedCollection);
  } catch (error) {
    console.error("Error updating collection's recipes:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.put('/putCollection/:collectionId/removeRecipe', async (req, res) => {
  const collectionId = req.params.collectionId;
  const recipeId = req.body.recipeId;
  
  try {
    // Find the collection
    const collection = await Collection.findById(collectionId);
    if (!collection) {
      return res.status(404).json({ message: "Collection not found" });
    }

    // Check if the recipe exists in the collection
    const recipeIndex = collection.recipes.indexOf(recipeId);
    if (recipeIndex === -1) {
      return res.status(404).json({ message: "Recipe not found in the collection" });
    }

    // Remove the recipe from the collection
    collection.recipes.splice(recipeIndex, 1);

    // Save the updated collection
    const updatedCollection = await collection.save();
    
    // Return the updated collection
    res.status(200).json(updatedCollection);
  } catch (error) {
    console.error("Error updating collection's recipes:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.delete('/deleteCollection/:collectionId', async (req, res) => {
  const collectionId = req.params.collectionId;
  try {
   
    const response = await Collection.deleteOne({ _id: collectionId });
    
   
    if (response.deletedCount === 0) {
      return res.status(404).json({ message: "Collection not found" });
    }
    
   
    res.status(200).json(`${collectionId} collection successfully deleted`);
  } catch (error) {
    console.error("Error deleting collection:", error);
    res.status(500).json({ message: "Internal server error" });
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

// get User from User Collection by Object ID
router.get("/getUserByObjectID", async (req, res) => {
  try {
    const { id } = req.query;

    const check = await Credential.findById(id);

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
      const user = await Credential.findById(userId);
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

// update user's bio
router.put('/putUser/:userId/admin', async (req, res) => {
  const userId = req.params.userId;
  const newAdmin = req.body.admin;
  try {
     // find user
      const user = await Credential.findById(userId);
      if (!user) {
          return res.status(404).json({ message: "User not found" });
      }
      //update admin
      user.admin = newAdmin;
      // save
      const updatedUser = await user.save();
      // return
      res.status(200).json(updatedUser);
  } catch (error) {
      console.error("Error updating user admin status:", error);
      res.status(500).json({ message: "Internal server error" });
  }
});

// update user's bio
router.put('/putUser/:userId/bio', async (req, res) => {
  const userId = req.params.userId;
  const newBio = req.body.bio;
  try {
     // find user
      const user = await Credential.findById(userId);
      if (!user) {
          return res.status(404).json({ message: "User not found" });
      }
      //update bio
      user.bio = newBio;
      // save
      const updatedUser = await user.save();
      // return
      res.status(200).json(updatedUser);
  } catch (error) {
      console.error("Error updating user bio:", error);
      res.status(500).json({ message: "Internal server error" });
  }
});
router.delete('/deleteUser/:userId', async (req, res) => {
  const userId = req.params.userId;
  try {
   
    const response = await Credential.deleteOne({ _id: userId });
    
   
    if (response.deletedCount === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    
   
    res.status(200).json(`${userId} successfully deleted`);
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// add new Recipe to Recipe Collection
router.post("/postReview", async (req, res) => {
  const data = new Review({
    title: req.body.title,
    reviewer_id: req.body.reviewer_id,
    recipe_id: req.body.recipe_id,
    description: req.body.description || "",
    rating: req.body.rating
  });

  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/getReviewsByRecipeObjectID", async (req, res) => {
  try {
    const { id } = req.query;

    const reviews = await Review.find({ recipe_id: id });

    if (reviews.length > 0) {
      console.log("Review found");
      return res.status(200).json({ status: 200, reviews: reviews });
    } else {
      res.status(404).json({ message: "Review Not Found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/getReviewsByReviewerObjectID", async (req, res) => {
  try {
    const { id } = req.query;

    const reviews = await Review.find({ reviewer_id: id });

    if (reviews.length > 0) {
      console.log("Review found");
      return res.status(200).json({ status: 200, reviews: reviews });
    } else {
      res.status(404).json({ message: "Review Not Found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.delete('/deleteReview/:reviewId', async (req, res) => {
  const reviewId = req.params.reviewId;
  try {
   
    const response = await Review.deleteOne({ _id: reviewId });
    
   
    if (response.deletedCount === 0) {
      return res.status(404).json({ message: "Review not found" });
    }
    
   
    res.status(200).json(`${reviewId} successfully deleted`);
  } catch (error) {
    console.error("Error deleting review:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


router.use(upload.single('fileData')); 
const s3 = new AWS.S3();

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