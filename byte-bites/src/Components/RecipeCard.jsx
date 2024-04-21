import React, { useEffect, useState } from "react";
import styles from "./Styles/RecipeCard.module.css";
import { useNavigate } from 'react-router-dom';
import { FaStar, FaRegStar } from "react-icons/fa";
import { FaRegStarHalfStroke } from "react-icons/fa6";

export default function RecipeCard({ recipe }) {
    const navigate = useNavigate();

    const [numberOfFullStars, setNumberOfFullStars] = useState(0);
    const [numberOfHalfStars, setNumberOfHalfStars] = useState(0);
    const [numberOfEmptyStars, setNumberOfEmptyStars] = useState(5);
    const [rating, setRating] = useState(0);

    useEffect(() => {
        // Calculate the number of stars based on the average rating
        if (typeof recipe.averageRating === 'number' && !isNaN(recipe.averageRating)) {
            if (recipe.averageRating - Math.floor(recipe.averageRating) < 0.25){
                setNumberOfFullStars(Math.floor(recipe.averageRating));
            }
            else if (recipe.averageRating - Math.floor(recipe.averageRating) < 0.75){
                setNumberOfFullStars(Math.floor(recipe.averageRating));
                setNumberOfHalfStars(1);
            }
            else {
                setNumberOfFullStars(Math.ceil(recipe.averageRating));
            }
           setNumberOfEmptyStars(5 - numberOfFullStars - numberOfHalfStars);
        } else {
            // If no reviews, show all stars as empty
            setNumberOfFullStars(0);
            setNumberOfHalfStars(0);
            setNumberOfEmptyStars(5);
        }
    }, [recipe.averageRating]);

    const handleNavigateRecipe = () => {
        navigate(`/Recipe/${recipe.title}`, { state: { recipe: recipe } });
    }

    return (
        <div className={styles.recipe_card}>
            <img src={recipe.recipePhoto} className={styles.img} alt="Recipe" />
            <p className={styles.recipe_title}>{recipe.title}</p>
            <p className={styles.recipe_author}> <a href={`/Profile/${recipe.author_id}`}>@{recipe.author}</a> </p>

            <p className={styles.total_time}>total time: {recipe.totalTime} minutes</p>
            <div className={styles.recipe_card_total_time_rating}>
                <p className={styles.rating_text}>{rating}/5</p>
                <div>
                    {[...Array(numberOfFullStars)].map((_, index) => (
                        <FaStar key={index} className={styles.star} />
                    ))}
                    {[...Array(numberOfHalfStars)].map((_, index) => (
                        <FaRegStarHalfStroke key={index} className={styles.star} />
                    ))}
                    {[...Array(numberOfEmptyStars)].map((_, index) => (
                        <FaRegStar key={index} className={styles.star} />
                    ))}
                </div>
              
            </div>
            <p className={styles.recipe_description}>{recipe.description}</p>
            <a className={styles.view_btn} onClick={handleNavigateRecipe}>View recipe</a>
        </div>
    );
}
