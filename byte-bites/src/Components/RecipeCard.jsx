import { useEffect, useState } from "react";
//import styles from "./Styles/.module.css";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import NavBar from './NavBar';
import CustomImage from "./CustomImage"

export default function RecipeCard({recipe}){
    return (
        <div className="recipe-card">
            <CustomImage imgSrc={recipe.image} pt="65%"/>
            <div className="recipe-card-info">
                <p className="recipe-title">{recipe.title}</p>
                <p className="recipe-description">Recipe description</p>
                <a className="view-btn" href="#!">View recipe</a>
            </div>
        </div>
    )
}