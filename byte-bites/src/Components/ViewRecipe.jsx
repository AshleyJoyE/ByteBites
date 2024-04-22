import { useEffect, useState } from "react";
import styles from "./Styles/ViewRecipe.module.css";
import { useParams } from 'react-router-dom';
import NavBar from "./NavBar";
import { FaStar } from "react-icons/fa";
import { FaRegStarHalfStroke } from "react-icons/fa6";
import { FaRegStar } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa";
import ReviewCard from "./ReviewCard";
import { AiFillDelete } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';


function ViewRecipe() {
    const { id } = useParams();
    const [recipe, setRecipe] = useState({});
    const [numberOfFullStars, setNumberOfFullStars] = useState(0);
    const [numberOfEmptyStars, setNumberOfEmptyStars] = useState(0);
    const [numberOfHalfStars, setNumberOfHalfStars] = useState(0);
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [reviewStars, setReviewStars] = useState([true, false, false, false, false]);
    const [isReviewTitleValid, setIsReviewTitleValid] = useState(true);
    const [reviewTitle, setReviewTitle] = useState("");
    const [reviewDescription, setReviewDescription] = useState();
    const [yourId, setYourId] = useState();
    const [isRecipeSaved, setIsRecipeSaved] = useState(false);
    const [yourCollections, setYourCollections] = useState([]);
    const [showUpdateCollectionsModal, setShowUpdateCollectionsModal] = useState(false);
    const [collectionsState, setCollectionsState] = useState({});
    const [isAdmin, setIsAdmin] = useState(false);
    const [isAuthor, setIsAuthor] = useState(false);
    const [isUserReviewed, setIsUserReviewed] = useState(false);
    const [reviews, setReviews] = useState([]); 
    const navigate = useNavigate();
    const handleHomeNav = () => navigate(`/`);
    

    useEffect(() => {
        const currentUser = localStorage.getItem("user");
        const userId = localStorage.getItem("id");
        const admin = localStorage.getItem("isAdmin");
        if (currentUser && userId) {
            setIsSignedIn(true);
            setYourId(userId);
            console.log(admin);
            setIsAdmin(admin === "true");
        }
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch the recipe data
                const recipeResponse = await fetch(`http://localhost:3010/api/getRecipesByObjectId?id=${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
    
                if (!recipeResponse.ok) {
                    console.error('Failed to fetch recipe data');
                    return;
                }
    
                const recipeData = await recipeResponse.json();
    
                // Fetch the author's username
                const authorId = recipeData.author_id;
                setIsAuthor(authorId == yourId);
                const userResponse = await fetch(`http://localhost:3010/api/getUserByObjectId?id=${encodeURIComponent(authorId)}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
    
                if (!userResponse.ok) {
                    console.error(`Failed to fetch user with ObjectId: ${authorId}`);
                    return;
                }
    
                const userData = await userResponse.json();
                const username = userData.username;
    
                // Fetch all reviews and calculate the average rating
                const reviewResponse = await fetch(`http://localhost:3010/api/getReviewsByRecipeObjectID?id=${recipeData._id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
    
                if (!reviewResponse.ok) {
                    console.error(`Failed to fetch reviews with recipe ID: ${recipeData._id}`);
                }
                else {
                    const reviewsData = await reviewResponse.json();
                    let averageRating = 0;
                    setReviews(reviewsData.reviews);
                    if (reviewsData && reviewsData.reviews && reviewsData.reviews.length > 0) {
                        const ratings = reviewsData.reviews.map(review => review.rating);
                        averageRating = ratings.reduce((acc, curr) => acc + curr, 0) / ratings.length;
                        const userHasReviewed = reviewsData.reviews.some(review => review.reviewer_id === yourId);
                        setIsUserReviewed(userHasReviewed);
                    } 
                      
    
                // Update the recipe with the average rating and author's username
                const updatedRecipe = {
                    ...recipeData,
                    averageRating: parseFloat(averageRating),
                    author: username // Add the author's username to the recipe data
                };
    
                // Set the updated recipe in the state
                setRecipe(updatedRecipe);
    
                // Calculate the number of full, half, and empty stars based on the average rating
                if (updatedRecipe.averageRating) {
                    let tempNumberOfFullStars = 0;
                    let tempNumberOfHalfStars = 0;
                    if (updatedRecipe.averageRating - Math.floor(updatedRecipe.averageRating) < 0.25) {
                        tempNumberOfFullStars = Math.floor(updatedRecipe.averageRating);
                    } else if (updatedRecipe.averageRating - Math.floor(updatedRecipe.averageRating) < 0.75) {
                        tempNumberOfFullStars = Math.floor(updatedRecipe.averageRating);
                        tempNumberOfHalfStars = 1;
                    } else {
                        tempNumberOfFullStars = Math.ceil(updatedRecipe.averageRating);
                    }
                    const tempNumberOfEmptyStars = 5 - tempNumberOfFullStars - tempNumberOfHalfStars;
    
                    // Update the state variables for the star counts
                    setNumberOfFullStars(tempNumberOfFullStars);
                    setNumberOfHalfStars(tempNumberOfHalfStars);
                    setNumberOfEmptyStars(tempNumberOfEmptyStars);
                } else {
                    // If there is no average rating, set all stars as empty
                    setNumberOfFullStars(0);
                    setNumberOfHalfStars(0);
                    setNumberOfEmptyStars(5);
                }
                }
    
                
    
                // Fetch user's collections
                if (yourId) {
                    const collectionResponse = await fetch(`http://localhost:3010/api/getCollectionByUserObjectID?id=${encodeURIComponent(yourId)}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });
    
                    if (!collectionResponse.ok) {
                        console.error('Failed to fetch collections');
                        return;
                    }
    
                    const collectionData = await collectionResponse.json();
                    if (Array.isArray(collectionData.collections)) {
                        const updatedCollections = collectionData.collections.map((collection) => ({
                            ...collection,
                            containsRecipe: collection.recipes.includes(id) // Check if the collection contains the recipe
                        }));
                        setYourCollections(updatedCollections);
    
                        // Update the collections state
                        const state = {};
                        updatedCollections.forEach(collection => {
                            state[collection._id] = collection.containsRecipe;
                        });
                        setCollectionsState(state);

                        const isSaved = updatedCollections.some(collection => collection.containsRecipe);
                        setIsRecipeSaved(isSaved);
                    } else {
                        console.error('Data is not an array');
                    }
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
    
        fetchData();
    }, [id, yourId]);

    const submitReview = async (event) => {
        event.preventDefault();
        if (reviewTitle.length > 0){
            const yourRating = reviewStars.filter(star => star).length;
            console.log({
                title: reviewTitle,
                reviewer_id: yourId,
                recipe_id: id,
                description: reviewDescription,
                rating: yourRating
            });
            const postReviewResponse = await fetch("http://localhost:3010/api/postReview", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title: reviewTitle,
                    reviewer_id: yourId,
                    recipe_id: id,
                    description: reviewDescription,
                    rating: yourRating
                })
            });
            if (postReviewResponse.ok){
                window.location.reload();
            }
            else {
                throw new Error(`HTTP error! Status: ${postReviewResponse.status}`);
            }
                            
        }
        else {
            setIsReviewTitleValid(false);
        }
    }

    // Function to handle updating the collections state
    const handleCollectionCheckboxChange = (collectionId) => {
        setCollectionsState(prevState => ({
            ...prevState,
            [collectionId]: !prevState[collectionId]
        }));
    };

    const updateCollections = async () => {
        console.log("Updating collections...");
        try {
            for (const collection of yourCollections) {
                const containsRecipe = collectionsState[collection._id];
                const recipeContained = collection.recipes.includes(id);
                
                if (containsRecipe && !recipeContained) {
                    await fetch(`http://localhost:3010/api/putCollection/${collection._id}/addRecipe`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ recipeId: id })
                    });
                } else if (!containsRecipe && recipeContained) {
                    await fetch(`http://localhost:3010/api/putCollection/${collection._id}/removeRecipe`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ recipeId: id })
                    });
                }
            }
            // Refresh the page after updating collections
            window.location.reload();
        } catch (error) {
            console.error('Error updating collections:', error);
        }
    };

    const handleDeleteRecipe = async () => {
        const confirmDelete = window.confirm(`Are you sure you want to delete "${recipe.title}"?`);
        if (confirmDelete) {
            try {
                const deleteResponse = await fetch(`http://localhost:3010/api/deleteRecipe/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                if (deleteResponse.ok) {
                    handleHomeNav();
                } else {
                    console.error('Failed to delete recipe');
                }
            } catch (error) {
                console.error('Error deleting recipe:', error);
            }
        }
    };
   
    return (
        <div className={styles.div_view_recipe}>
            <div className={styles.nav_bar}>
                <NavBar />
            </div>
            <div className={styles.div_recipe}>
                <div className={styles.div_gen_info_recipe_photo}>
                    <div className={styles.div_gen_info}>
                        <div className={styles.div_name_bkmk}>
                            {(isAuthor || isAdmin) && <AiFillDelete className={styles.trashCan} onClick={handleDeleteRecipe}></AiFillDelete>}
                           
                            <h1 className={styles.h1_recipe_name}>{recipe.title}</h1>
                            {(isSignedIn && !isRecipeSaved) && <FaRegBookmark className={styles.bookmark} onClick={() => setShowUpdateCollectionsModal(true)}/>}
                            {(isSignedIn && isRecipeSaved) && <FaBookmark className={styles.bookmark} onClick={() => setShowUpdateCollectionsModal(true)}/>}
                        </div>
                        {isAdmin && <p className={styles.p_recipeID}>Recipe Id: {recipe._id}</p>} 
                        <p className={styles.p_author}> <a href={`/Profile/${recipe.author_id}`}>@{recipe.author}</a></p>
                        <div className={styles.div_times}>
                            <p className={styles.p_prep_time}><strong> Prep Time:</strong> {recipe.prepTime} minutes </p>
                            <p className={styles.p_cook_time}><strong> Cook Time:</strong> {recipe.cookTime} minutes</p>
                            <p className={styles.p_total_time}><strong> Total Time:</strong> {recipe.totalTime} minutes</p>
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
                            {recipe.categories && recipe.categories.map((tag, index) => (
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
                            <p className={styles.p_rating}> <strong>{recipe.averageRating}/5</strong> </p>
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
                {(isSignedIn && !isUserReviewed && !isAuthor) && <form className={styles.form_review} onSubmit={submitReview}>
                    <div className={styles.div_rev_title_stars}>
                        <div className={styles.div_review_header_subject}>
                            <h1 className={styles.h1_review_header}>Leave A Review!</h1>
                            <input className={styles.input_review_header} placeholder="Your Review! (required)" value={reviewTitle} onChange={(e) => setReviewTitle(e.target.value)}/>
                        </div>
                        <div className={styles.div_review_stars}>
                            {!reviewStars[0] && <FaRegStar className={styles.star} onClick={() => setReviewStars([true, false, false, false, false])}/>}
                            {reviewStars[0] && <FaStar className={styles.star} onClick={() => setReviewStars([true, false, false, false, false])}/>}
                            {!reviewStars[1] && <FaRegStar className={styles.star} onClick={() => setReviewStars([true, true, false, false, false])}/>}
                            {reviewStars[1] && <FaStar className={styles.star} onClick={() => setReviewStars([true, true, false, false, false])}/>}
                            {!reviewStars[2] && <FaRegStar className={styles.star} onClick={() => setReviewStars([true, true, true, false, false])}/>}
                            {reviewStars[2] && <FaStar className={styles.star} onClick={() => setReviewStars([true, true, true, false, false])}/>}
                            {!reviewStars[3] && <FaRegStar className={styles.star} onClick={() => setReviewStars([true, true, true, true, false])}/>}
                            {reviewStars[3] && <FaStar className={styles.star} onClick={() => setReviewStars([true, true, true, true, false])}/>}
                            {!reviewStars[4] && <FaRegStar className={styles.star} onClick={() => setReviewStars([true, true, true, true, true])}/>}
                            {reviewStars[4] && <FaStar className={styles.star} onClick={() => setReviewStars([true, true, true, true, true])}/>}
                            
                        </div>
                    </div>
                    <div className={styles.div_comment_post}>
                        <input className={styles.input_comment} placeholder="Additional Comments (optional)" value={reviewDescription} onChange={(e) => setReviewDescription(e.target.value)}/>
                    </div>
                    {!isReviewTitleValid && <label className={styles.label_reviewErrorMessage}>Review requires a title!</label>}
                    <div>
                    <button className={styles.button_post_review} type="submit">Submit Review</button>
                    </div>
                </form>}
                <div className={styles.div_dialog}>
                    <dialog open={showUpdateCollectionsModal}>
                        <div className={styles.dialog_overlay}>
                            <div className={styles.dialog_content}>
                                <div className={styles.dialog_header}>
                                    <span className={styles.dialog_title}>Add or Remove From Collection</span>
                                    <span className={styles.close} onClick={() => setShowUpdateCollectionsModal(false)}>&times;</span>
                                </div>
                                <div className={styles.checkbox_container}>
                                    {yourCollections.map(collection => (
                                    <div key={collection._id}>
                                        <input
                                            type="checkbox"
                                            checked={collectionsState[collection._id]}
                                            onChange={() => handleCollectionCheckboxChange(collection._id)}
                                        />
                                        <label>{collection.collectionName}</label>
                                    </div>
                                ))}
                                </div>
                                {/* Update collection button */}
                                <button className={styles.update_button} onClick={updateCollections}>Update Collection</button>
                            </div>
                        </div>
                    </dialog>
                </div>
                <div className={styles.reviews_section}>
                    <h2 className={styles.h1_review_header}>Reviews</h2>
                    {reviews &&
                        reviews.map((review, index) => (
                            <ReviewCard key={index} review={review} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ViewRecipe;
