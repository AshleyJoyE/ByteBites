const Recipe = require('./Recipe'); // Assuming Recipe model is defined in a file named Recipe.js

// Create a new recipe object
const newRecipe = new Recipe({
    title: "Your Recipe Title",
    author_id: '660989f9081b1a867a41af3a', // Replace this with the actual author's MongoDB ObjectId
    recipePhoto: "URL to recipe photo",
    description: "Recipe description",
    prepTime: 30, // Replace with actual prep time in minutes
    cookTime: 60, // Replace with actual cook time in minutes
    servings: 4, // Replace with actual number of servings
    totalCalories: 500, // Replace with actual total calories
    ingredients: ["Ingredient 1", "Ingredient 2", "Ingredient 3"],
    directions: ["Direction 1", "Direction 2", "Direction 3"],
    categories: ["Category 1", "Category 2"],
    isRecommendedRecipe: false // Replace with true if it's a recommended recipe
});

// Save the new recipe to the database
newRecipe.save()
  .then(recipe => {
    console.log("Recipe created successfully:", recipe);
  })
  .catch(error => {
    console.error("Error creating recipe:", error);
  });
