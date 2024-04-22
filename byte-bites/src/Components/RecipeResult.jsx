import React, { useEffect, useState } from "react";
import RecipeCard from "./RecipeCard";
import NavBar from './NavBar';
import { useParams } from 'react-router-dom';
import styles from "./Styles/RecipeResult.module.css";

const RecipePage = () => {
  const { query: searchQuery } = useParams(); // Extracting query parameter using useParams()
  
  const [recipes, setRecipes] = useState([]);
  const [userQuery, setUserQuery] = useState("");

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch(`http://localhost:3010/api/searchRecipes?query=${searchQuery}`);

        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data)) { // Check if data is an array of recipes
            // Process recipes to add author information
            const updatedRecipes = await Promise.all(data.map(async (recipe) => {
              // Fetch author information
              const authorResponse = await fetch(`http://localhost:3010/api/getUserByObjectId?id=${recipe.author_id}`, {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json'
                }
              });
              if (!authorResponse.ok) {
                console.error(`Failed to fetch author for recipe ${recipe._id}`);
                return recipe;
              }
              const authorData = await authorResponse.json();
              const author = authorData.username;
              return {
                ...recipe,
                author: author
              };
            }));
            setRecipes(updatedRecipes);
            setUserQuery(searchQuery);
          } else {
            console.error('Invalid response format:', data);
          }
        } else {
          console.error('Error fetching recipes:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };

    fetchRecipes();
  }, [searchQuery]);

  return (
    <div className={styles.container}>
      <div className={styles.nav_bar}> 
        <NavBar />
      </div>
      <div className={styles.div_header}>  
        <p className={styles.heading}> Results: {userQuery}</p>
      </div>
      {recipes.map((recipe, index) => {
        // Check if there's a recipe at the next index
        const nextRecipe = recipes[index + 1];
        // Render the current recipe and the next one side by side
        return (
          <div key={index} className={styles.cardGroup}>
            <RecipeCard recipe={recipe} />
            {nextRecipe && <RecipeCard recipe={nextRecipe} />}
          </div>
        );
      })}
    </div>
  );
};

export default RecipePage;
