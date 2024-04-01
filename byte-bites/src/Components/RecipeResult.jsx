import React, { useEffect, useState } from "react";
import axios from "axios";
import RecipeCard from "./RecipeCard";
import NavBar from './NavBar';

const RecipePage = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
      
  }, []);


  const recipe = [
    {

    }
  ]

  return (
    <div>
      <NavBar />
      <div className="recipes-container">
        {/* {recipes.map((recipe, index) => (
          <RecipeCard key={index} recipe={recipe} />
        ))} */}
        <RecipeCard recipes={recipe}/>
      </div>
    </div>
  );
};

export default RecipePage;
