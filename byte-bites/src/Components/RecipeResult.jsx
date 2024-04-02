import React, { useState } from "react";
import axios from "axios";
import RecipeCard from "./RecipeCard";
import NavBar from './NavBar';
import { useLocation, useParams } from 'react-router-dom';
import styles from "./Styles/RecipeResult.module.css";

const RecipePage = () => {
  const [searchQuery, setSearchQuery] = useState(""); // State variable to store the user's search query
  const [searchResults, setSearchResults] = useState([]); // State variable to store the search results

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value); // Update the search query state variable as the user types
  };

  const handleSearch = async () => {
    try {
      // Perform a search query using Axios (or any other method) to your MongoDB database
      const response = await axios.get(`/api/recipes?query=${searchQuery}`);
      // Update the search results state variable with the results obtained from the database
      setSearchResults(response.data);
    } catch (error) {
      console.error("Error performing search:", error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.nav_bar}> 
        <NavBar />
      </div>
      <div className={styles.search_bar}>
        {/* Search input field */}
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchInputChange}
          placeholder="Enter search query..."
        />
        {/* Search button */}
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className={styles.div_header}>  
        <p className={styles.heading}> Search Results</p>
      </div>
      {/* Display search results */}
      {searchResults.map((recipe, index) => (
        <RecipeCard key={index} recipe={recipe} />
      ))}
    </div>
  );
};

export default RecipePage;
