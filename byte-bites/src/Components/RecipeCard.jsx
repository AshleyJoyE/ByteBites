import { useEffect, useState } from "react";
import styles from "./Styles/RecipeCard.module.css";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import NavBar from './NavBar';
import { FaStar } from "react-icons/fa";
import { FaRegStarHalfStroke } from "react-icons/fa6";
import { FaRegStar } from "react-icons/fa";


export default function RecipeCard({recipe}){

    var numberOfFullStars = 0;
    var numberOfEmptyStars = 0;
    var numberOfHalfStars = 0;
    if (recipe.rating){
        if (recipe.rating - Math.floor(recipe.rating) < 0.25){
            numberOfFullStars = Math.floor(recipe.rating);
        }
        else if (recipe.rating - Math.floor(recipe.rating) < 0.75){
            numberOfFullStars = Math.floor(recipe.rating);
            numberOfHalfStars = 1;
        }
        else {
            numberOfFullStars = Math.ceil(recipe.rating);
        }
        numberOfEmptyStars = 5 - numberOfFullStars - numberOfHalfStars;
    }
    else{
        numberOfEmptyStars = 5;
    }
    const navigate = useNavigate();
    const handleNavigateRecipe = () => {
        navigate(`/Recipe/${recipe.title}`, { state: { recipe: recipe } });
    }


    return (
        <div className={styles.recipe_card}>
            <img src={recipe.recipePhoto} className={styles.img}></img>
            <p className={styles.recipe_title}>{recipe.title}</p>
            <p className={styles.recipe_author}>@{recipe.author}</p>
            <div className={styles.recipe_card_total_time_rating}>
                <p className={styles.total_time}>{recipe.totalTime}</p>
                <p className={styles.rating_text}>{recipe.rating}</p>
                {[...Array(numberOfFullStars)].map(() => (
                  <FaStar className={styles.star}> </FaStar>
                ))}
                {[...Array(numberOfHalfStars)].map(() => (
                  <FaRegStarHalfStroke className={styles.star}> </FaRegStarHalfStroke>
                ))}
                {[...Array(numberOfEmptyStars)].map(() => (
                  <FaRegStar className={styles.star}> </FaRegStar>
                ))}
            </div>
            <p className={styles.recipe_description}>{recipe.description}</p>
                <a className={styles.view_btn} onClick={handleNavigateRecipe}>View recipe</a>
        </div>
    )
}