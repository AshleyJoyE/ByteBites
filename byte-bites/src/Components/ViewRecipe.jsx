import { useEffect, useState } from "react";
import styles from "./Styles/ViewRecipe.module.css";
import { useLocation } from 'react-router-dom';
import NavBar from "./NavBar";
import { FaStar } from "react-icons/fa";
import { FaRegStarHalfStroke } from "react-icons/fa6";
import { FaRegStar } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa";

function ViewRecipe() {
    const { state } = useLocation();
    const [recipe, setRecipe] = useState([]);
    var numberOfFullStars = 0;
    var numberOfEmptyStars = 0;
    var numberOfHalfStars = 0;

    useEffect(() => {
        if (state && state.recipe) {
            setRecipe(state.recipe);
        }
    }, [state]);
    
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
    return (
        <div className={styles.div_view_recipe}>
            <div className={styles.nav_bar}>
                <NavBar />
            </div>
            <div className={styles.div_recipe}>
                <div className={styles.div_gen_info_recipe_photo}>
                    <div className={styles.div_gen_info}>
                        <div className={styles.div_name_bkmk}>
                            <h1 className={styles.h1_recipe_name}>{recipe.title}</h1>
                            <FaRegBookmark className={styles.bookmark}/>
                        </div>
                        <p className={styles.p_author}> @{recipe.author}</p>
                        <div className={styles.div_times}>
                            <p className={styles.p_prep_time}><strong> Prep Time:</strong> {recipe.prepTime} </p>
                            <p className={styles.p_cook_time}><strong> Cook Time:</strong> {recipe.cookTime}</p>
                            <p className={styles.p_total_time}><strong> Total Time:</strong> {recipe.totalTime}</p>
                        </div>
                        <div className={styles.div_serve_cal}>
                            <p className={styles.p_servings}><strong> Servings:</strong>  {recipe.servings} </p>
                            <p className={styles.p_calories}><strong> Calories Per Serving:</strong>  {recipe.caloriesPerServing} </p>
                        </div>
                        <h1 className={styles.h1_description_header}> Description:</h1>
                        <p className={styles.p_description}> {recipe.description}</p>
                    </div>
                    <img className={styles.img_recipe_photo} src={recipe.recipePhoto} alt="Recipe" />
                </div>
               
                <div className={styles.div_tags_stars}>
                    <div className={styles.div_tags}>
                        <h1 className={styles.h1_tags_header}>Tags: </h1>
                        <div className={styles.div_all_tags}>
                            {recipe.tags && recipe.tags.map((tag, index) => (
                                <p className={styles.p_tag}>{tag}</p>
                            ))}
                          </div>
                    </div>
                    <div className={styles.div_stars_rating}>
                        <div className={styles.div_stars}>
                        
                            {[...Array(numberOfFullStars)].map((_, index) => (
                                <FaStar key={index} className={styles.star} />
                            ))}
                            {[...Array(numberOfHalfStars)].map((_, index) => (
                                <FaRegStarHalfStroke key={index} className={styles.star} />
                            ))}
                            {[...Array(numberOfEmptyStars)].map((_, index) => (
                                <FaRegStar key={index} className={styles.star} />
                            ))}
                            <p className={styles.p_rating}> <strong>{recipe.rating}/5</strong> </p>
                        </div>
                        

                    </div>
                    
                </div>
                <div className={styles.div_ingredients}>
                    <h1 className={styles.h1_ingredients_header}> Ingredients: </h1>
                    <div className={styles.div_ingredient}>
                        {recipe.ingredients && recipe.ingredients.map((ingredient, index) => (
                            <p className={styles.p_ingredient}>- {ingredient}</p>
                        ))}
                     </div>
                </div>
                <div className={styles.div_directions}>
                    <h1 className={styles.h1_directions_header}> Directions: </h1>
                    {recipe.directions && recipe.directions.map((direction, index) => (
                        <div key={index} className={styles.div_direction}>
                            <p className={styles.p_direction}>{index + 1}. {direction}</p>
                        </div>
                    ))}
                </div>
                <form className={styles.form_review}>
                    <div className={styles.div_rev_title_stars}>
                        <div className={styles.div_review_header_subject}>
                            <h1 className={styles.h1_review_header}>Leave A Review!</h1>
                            <input className={styles.input_review_header} placeholder="Your Review! (required)"/>
                        </div>
                        <div className={styles.div_review_stars}>
                            {[...Array(5)].map((_, index) => (
                                <FaRegStar key={index} className={styles.star_rating} />
                            ))}
                        </div>
                    </div>
                    <div className={styles.div_comment_post}>
                        <input className={styles.input_comment} placeholder="Additional Comments (optional)"/>
                        <button className={styles.button_post_review}></button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ViewRecipe;
