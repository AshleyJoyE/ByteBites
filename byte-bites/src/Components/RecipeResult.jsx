import React, { useEffect, useState } from "react";
import axios from "axios";
import RecipeCard from "./RecipeCard";
import NavBar from './NavBar';

const RecipePage = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {

    const fetchRecipes = async () => {
      try {
        const response = await axios.get("your-api-endpoint-for-recipes");
        setRecipes(response.data);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    fetchRecipes();
  }, []);

  return (
    <div>
      <NavBar />
      <div className="recipes-container">
        {recipes.map((recipe, index) => (
          <RecipeCard key={index} recipe={recipe} />
        ))}
      </div>
    </div>
  );
};

export default RecipePage;
