import { useEffect, useState } from "react";
import styles from "./Styles/RecipeCard.module.css";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import NavBar from './NavBar';
import { FaStar } from "react-icons/fa";
import { FaRegStarHalfStroke } from "react-icons/fa6";
import { FaRegStar } from "react-icons/fa";


export default function RecipeCard({recipe}){

    const numberOfFullStars = Math.floor(recipe.rating);
    const numberOfEmptyStars = Math.floor(5 - recipe.rating);
    const numberHalfStars = Math.floor(5 - numberOfFullStars - numberOfEmptyStars);


    return (
        <div className={styles.recipe_card}>
            <img src={recipe.image} className={styles.img}></img>
            <p className={styles.recipe_title}>{recipe.title}</p>
            <p className={styles.recipe_author}>@{recipe.author}</p>
            <div className={styles.recipe_card_total_time_rating}>
                <p className={styles.total_time}>{recipe.totalTime}</p>
                <p className={styles.rating_text}>{recipe.rating}</p>
                {[...Array(numberOfFullStars)].map(() => (
                  <FaStar className={styles.star}> </FaStar>
                ))}
                {[...Array(numberHalfStars)].map(() => (
                  <FaRegStarHalfStroke className={styles.star}> </FaRegStarHalfStroke>
                ))}
                {[...Array(numberOfEmptyStars)].map(() => (
                  <FaRegStar className={styles.star}> </FaRegStar>
                ))}
            </div>
            <p className={styles.recipe_description}>{recipe.description}</p>
                <a className={styles.view_btn} href="/Recipe/:id">View recipe</a>
        </div>
    )
}