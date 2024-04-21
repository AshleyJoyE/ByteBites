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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const reviewResponse = await fetch(`http://localhost:3010/api/getReviewsByRecipeObjectID?id=${recipe._id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (!reviewResponse.ok) {
                    console.error(`Failed to fetch reviews with recipe ID: ${recipe._id}`);
                    return;
                }

                const reviewsData = await reviewResponse.json();
                let averageRating = 0;
                if (reviewsData && reviewsData.reviews && reviewsData.reviews.length > 0) {
                    const ratings = reviewsData.reviews.map(review => review.rating);
                    averageRating = ratings.reduce((acc, curr) => acc + curr, 0) / ratings.length;
                }
                calculateStars(averageRating);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [recipe._id]);

    const calculateStars = (averageRating) => {
        if (typeof averageRating === 'number' && !isNaN(averageRating)) {
            let tempNumberOfFullStars = 0;
            let tempNumberOfHalfStars = 0;
            if (averageRating - Math.floor(averageRating) < 0.25) {
                tempNumberOfFullStars = Math.floor(averageRating);
            } else if (averageRating - Math.floor(averageRating) < 0.75) {
                tempNumberOfFullStars = Math.floor(averageRating);
                tempNumberOfHalfStars = 1;
            } else {
                tempNumberOfFullStars = Math.ceil(averageRating);
            }
            setNumberOfFullStars(tempNumberOfFullStars);
            setNumberOfHalfStars(tempNumberOfHalfStars);
            setNumberOfEmptyStars(5 - tempNumberOfFullStars - tempNumberOfHalfStars);
        } else {
            // If no reviews, show all stars as empty
            setNumberOfFullStars(0);
            setNumberOfHalfStars(0);
            setNumberOfEmptyStars(5);
        }
    };

    const handleNavigateRecipe = () => {
        navigate(`/Recipe/${recipe._id}`, { state: { recipe: recipe } });
    };

    return (
        <div className={styles.recipe_card}>
            <img src={recipe.recipePhoto} className={styles.img} alt="Recipe" />
            <p className={styles.recipe_title}>{recipe.title}</p>
            <p className={styles.recipe_author}> <a href={`/Profile/${recipe.author_id}`}>@{recipe.author}</a> </p>

            <p className={styles.total_time}>total time: {recipe.totalTime} minutes</p>
            <div className={styles.recipe_card_total_time_rating}>
                <p className={styles.rating_text}>{`${numberOfFullStars + numberOfHalfStars}/${numberOfFullStars + numberOfHalfStars + numberOfEmptyStars}`}</p>
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