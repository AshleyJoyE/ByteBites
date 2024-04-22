import { useEffect, useState } from "react";
import styles from "./Styles/ViewCollection.module.css";
import { useParams } from 'react-router-dom';
import NavBar from './NavBar';
import RecipeCard from "./RecipeCard";

export default function ViewCollection(){
    const [recipes, setRecipes] = useState([]);
    const [collectionName, setCollectionName] = useState("");
    const [collectionAuthor, setCollectionAuthor] = useState("");
    const { id } = useParams(); // Extracting id parameter using useParams()

    useEffect(() => {
        const fetchCollection = async () => {
            try {
                const response = await fetch(`http://localhost:3010/api/getCollectionByCollectionObjectID?id=${id}`);

                if (response.ok) {
                    const data = await response.json();
                    setCollectionName(data.name);
                    setCollectionAuthor(data.author);

                    // Fetch recipe details for each recipe object id
                    const recipeDetailsPromises = data.recipes.map(async (recipeId) => {
                        const recipeResponse = await fetch(`http://localhost:3010/api/getRecipesByObjectId?id=${recipeId}`);
                        if (recipeResponse.ok) {
                            const recipeData = await recipeResponse.json();
                            // Fetch author username for each recipe
                            const authorResponse = await fetch(`http://localhost:3010/api/getUserByObjectId?id=${recipeData.author_id}`);
                            if (authorResponse.ok) {
                                const authorData = await authorResponse.json();
                                recipeData.author = authorData.username;
                            } else {
                                console.error(`Failed to fetch author for recipe ${recipeId}`);
                            }
                            return recipeData;
                        } else {
                            console.error(`Failed to fetch recipe ${recipeId}`);
                            return null;
                        }
                    });

                    // Resolve all promises and filter out any failed requests
                    const recipeDetails = await Promise.all(recipeDetailsPromises);
                    const validRecipes = recipeDetails.filter(recipe => recipe !== null);

                    setRecipes(validRecipes);
                } else {
                    console.error('Failed to fetch collection:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching collection:', error);
            }
        };

        fetchCollection();
    }, [id]); // Ensure useEffect runs whenever id changes

    return (
        <div> 
            <div className={styles.div_nav_bar}>
                <NavBar />
            </div>
            <label className={styles.collectionName}>{collectionName}</label>
            <label className={styles.collectionAuthor}>@{collectionAuthor}</label>
            
            <div className={styles.cardGroup}>
                {recipes.map((recipe, index) => (
                    <RecipeCard key={index} recipe={recipe} />
                ))}
            </div>
        </div>
    )
}
