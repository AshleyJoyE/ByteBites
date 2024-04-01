import React, { useEffect, useState } from "react";
import axios from "axios";
import RecipeCard from "./RecipeCard";
import NavBar from './NavBar';
import { useLocation, useParams } from 'react-router-dom';
import styles from "./Styles/RecipeResult.module.css";

const RecipePage = () => {
  const { searchQuery } = useParams();
  const { state } = useLocation();
  
  const [recipes, setRecipes] = useState([]);
  const [userQuery, setUserQuery] = useState("");

  useEffect(() => {
    if (state && state.searchResults && state.query) {
      setRecipes(state.searchResults);
      setUserQuery(state.query);
    }
  }, [state]);

  return (
    <div className={styles.container}>
      <div className={styles.nav_bar}> 
           <NavBar ></NavBar>
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
