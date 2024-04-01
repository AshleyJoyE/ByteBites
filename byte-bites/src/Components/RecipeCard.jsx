import { useEffect, useState } from "react";
import styles from "./Styles/RecipeCard.module.css";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import NavBar from './NavBar';


export default function RecipeCard({recipe}){
    return (
        <div className="recipe_card">
            <img src="" className={styles.img}></img>
            <div className={styles.recipe_card_info}>
                <p className={styles.recipe_title}>{recipe.title}</p>
                <p className={styles.recipe_description}>Recipe description</p>
                <a className={styles.view_btn} href="/Recipes/{id}">View recipe</a>

            </div>
        </div>
    )
}