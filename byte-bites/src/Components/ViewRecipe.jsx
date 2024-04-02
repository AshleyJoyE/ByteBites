import { useEffect, useState } from "react";
import styles from "./Styles/ViewRecipe.module.css";
import { useLocation } from 'react-router-dom';
import NavBar from "./NavBar";
import { FaStar } from "react-icons/fa";
import { FaRegStarHalfStroke } from "react-icons/fa6";
import { FaRegStar } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";

function ViewRecipe() {
    const { state } = useLocation();
    const [recipe, setRecipe] = useState([]);

    useEffect(() => {
        if (state && state.recipe) {
            setRecipe(state.recipe);
        }
    }, [state]);

    // Move these calculations inside the useEffect hook
    const numberOfFullStars = Math.floor(recipe.rating || 0);
    const numberOfEmptyStars = Math.floor(5 - (recipe.rating || 0));
    const numberHalfStars = Math.floor(5 - numberOfFullStars - numberOfEmptyStars);

    return (
        <div className={styles.div_view_recipe}>
            <div className={styles.nav_bar}>
                <NavBar />
            </div>
            <div className={styles.div_recipe}>
                <div className={styles.div_gen_info}>
                    <div className={styles.div_name_bkmk}>
                        <h1 className={styles.h1_recipe_name}>{recipe.title}</h1>
                        <FaBookmark />
                    </div>
                    <p className={styles.p_author}> @{recipe.author}</p>
                    <div className={styles.div_times}>
                        <p className={styles.p_time}>Prep Time: {recipe.prepTime} </p>
                        <p className={styles.p_time}>Cook Time: {recipe.cookTime}</p>
                        <p className={styles.p_time}>Total Time: {recipe.totalTime}</p>
                    </div>
                    <div className={styles.div_serve_cal}>
                        <p className={styles.p_servings}>Servings: {recipe.serving} </p>
                        <p className={styles.p_calories}>Calories Per Serving: </p>
                    </div>
                    <p className={styles.p_description}> {recipe.description}</p>
                </div>
                <img className={styles.img_recipe_photo} src={recipe.image} alt="Recipe" />
                <div className={styles.div_tags_stars}>
                    <div className={styles.div_tags}>
                        {recipe.tags && recipe.tags.map((tag, index) => (
                            <div key={index} className={styles.div_inner_tag}>
                                <p className={styles.p_tag}>{tag}</p>
                            </div>
                        ))}
                    </div>
                    <div className={styles.div_stars}>
                        {[...Array(numberOfFullStars)].map((_, index) => (
                            <FaStar key={index} className={styles.star} />
                        ))}
                        {[...Array(numberHalfStars)].map((_, index) => (
                            <FaRegStarHalfStroke key={index} className={styles.star} />
                        ))}
                        {[...Array(numberOfEmptyStars)].map((_, index) => (
                            <FaRegStar key={index} className={styles.star} />
                        ))}
                    </div>
                </div>
                <div className={styles.div_ingredients}>
                    <h1 className={styles.h1_ingredients_header}> Ingredients: </h1>
                    {recipe.ingredients && recipe.ingredients.map((ingredient, index) => (
                        <div key={index} className={styles.div_ingredient}>
                            <p className={styles.p_ingredient}>{ingredient}</p>
                        </div>
                    ))}
                </div>
                <div className={styles.div_directions}>
                    <h1 className={styles.h1_directions_header}> Directions: </h1>
                    {recipe.directions && recipe.directions.map((direction, index) => (
                        <div key={index} className={styles.div_direction}>
                            <p className={styles.p_direction}>{direction}</p>
                        </div>
                    ))}
                </div>
                <form className={styles.form_review}>
                    <div className={styles.div_rev_title_stars}>
                        <div className={styles.div_review_header_subject}>
                            <h1 className={styles.h1_review_header}>Leave A Review!</h1>
                            <input className={styles.input_review_header} />
                        </div>
                        <div className={styles.div_review_stars}>
                            {[...Array(5)].map((_, index) => (
                                <FaStar key={index} className={styles.star} />
                            ))}
                        </div>
                    </div>
                    <div className={styles.div_comment_post}>
                        <input className={styles.input_comment} />
                        <button className={styles.button_post_review}></button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ViewRecipe;
