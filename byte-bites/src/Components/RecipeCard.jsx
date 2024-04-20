import { useEffect, useState } from "react";
import styles from "./Styles/RecipeCard.module.css";
import { useNavigate } from 'react-router-dom';
import { FaStar } from "react-icons/fa";
import { FaRegStarHalfStroke } from "react-icons/fa6";
import { FaRegStar } from "react-icons/fa";

export default function RecipeCard({ recipe }) {
    const navigate = useNavigate();
    const handleNavigateRecipe = () => {
        navigate(`/Recipe/${recipe.title}`, { state: { recipe: recipe } });
    }

    let numberOfFullStars = Math.floor(recipe.averageRating);
    let numberOfHalfStars = Math.ceil(recipe.averageRating - numberOfFullStars);
    let numberOfEmptyStars = 5 - numberOfFullStars - numberOfHalfStars;

    return (
        <div className={styles.recipe_card}>
            <img src={recipe.recipePhoto} className={styles.img} alt="Recipe" />
            <p className={styles.recipe_title}>{recipe.title}</p>
            <p className={styles.recipe_author}>@{recipe.author}</p>
            <div className={styles.recipe_card_total_time_rating}>
                <p className={styles.total_time}>{recipe.totalTime}</p>
                <p className={styles.rating_text}>{recipe.averageRating}</p>
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
            <p className={styles.recipe_description}>{recipe.description}</p>
            <a className={styles.view_btn} onClick={handleNavigateRecipe}>View recipe</a>
        </div>
    );
}