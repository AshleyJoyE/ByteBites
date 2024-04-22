import { useEffect, useState } from "react";
import styles from "./Styles/ViewCollection.module.css";
import { useParams } from 'react-router-dom';
import NavBar from './NavBar';
import RecipeCard from "./RecipeCard";
import { useNavigate } from 'react-router-dom';
import { AiFillDelete } from "react-icons/ai";


export default function ViewCollection(){
    const [recipes, setRecipes] = useState([]);
    const [collectionName, setCollectionName] = useState("");
    const [collectionId, setCollectionId] = useState("");
    const [collectionAuthor, setCollectionAuthor] = useState("");
    const [collectionAuthorId, setCollectionAuthorId] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);
    const [isAuthor, setIsAuthor] = useState(false);
    const [yourId, setYourId] = useState();
    const { id } = useParams(); 
    const navigate = useNavigate();
    const handleProfileNav = () => navigate(`/Profile/${collectionAuthorId}`);

    useEffect(() => {
        const fetchCollection = async () => {
            try {
                const response = await fetch(`https://bytebites-bzpd.onrender.com/api/getCollectionByCollectionObjectID?id=${id}`);

                if (response.ok) {
                    const data = await response.json();
                    setCollectionName(data.collectionName);
                    setCollectionAuthorId(data.owner_id);
                    setCollectionId(data._id);
                    setIsAuthor(collectionAuthorId == yourId);
                    const authorResponse = await fetch(`https://bytebites-bzpd.onrender.com/api/getUserByObjectId?id=${data.owner_id}`);
                            if (authorResponse.ok) {
                                const authorData = await authorResponse.json();
                                setCollectionAuthor(authorData.username);
                            } else {
                                console.error(`Failed to fetch author for recipe ${data.owner_id}`);
                            }

                    // Fetch recipe details for each recipe object id
                    const recipeDetailsPromises = data.recipes.map(async (recipeId) => {
                        const recipeResponse = await fetch(`https://bytebites-bzpd.onrender.com/api/getRecipesByObjectId?id=${recipeId}`);
                        if (recipeResponse.ok) {
                            const recipeData = await recipeResponse.json();
                            // Fetch author username for each recipe
                            const authorResponse = await fetch(`https://bytebites-bzpd.onrender.com/api/getUserByObjectId?id=${recipeData.author_id}`);
                            if (authorResponse.ok) {
                                const authorData = await authorResponse.json();
                                recipeData.author = authorData.username;
                            } else {
                                console.error(`Failed to fetch author for recipe ${recipeId}`);
                            }
                            return recipeData;
                        } else {
                            console.error(`Failed to fetch recipe ${recipeId}`);
                            return null;
                        }
                    });

                    // Resolve all promises and filter out any failed requests
                    const recipeDetails = await Promise.all(recipeDetailsPromises);
                    const validRecipes = recipeDetails.filter(recipe => recipe !== null);

                    setRecipes(validRecipes);
                } else {
                    console.error('Failed to fetch collection:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching collection:', error);
            }
        };
        const currentUser = localStorage.getItem("user");
        const userId = localStorage.getItem("id");
        const admin = localStorage.getItem("isAdmin");
        if (currentUser && userId && admin) {
            setYourId(userId);
            setIsAdmin(admin === "true");
        }
        fetchCollection();
    }, [id]);

    const handleDeleteCollection = async () => {
        const confirmDelete = window.confirm(`Are you sure you want to delete "${collectionName}"?`);
        if (confirmDelete) {
            try {
                const deleteResponse = await fetch(`https://bytebites-bzpd.onrender.com/api/deleteCollection/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                if (deleteResponse.ok) {
                    handleProfileNav();
                } else {
                    console.error('Failed to delete collection');
                }
            } catch (error) {
                console.error('Error deleting collection:', error);
            }
        }
    };
    return (
        <div> 
            <div className={styles.div_nav_bar}>
                <NavBar />
            </div>
            <div className={styles.collectionHeader}>
                {(isAuthor || isAdmin) && <AiFillDelete title="Delete Collection" className={styles.trashCan} onClick={handleDeleteCollection} />}
                <label className={styles.collectionName}>{collectionName}</label>
            </div>
            {isAdmin && <label className={styles.collectionAuthor}>Collection Object Id: {collectionId}</label>}
            <label className={styles.collectionAuthor}><a href={`/Profile/${collectionAuthorId}`}>@{collectionAuthor}</a></label>
            
            <div className={styles.cardGroup}>
                {recipes.map((recipe, index) => (
                    <RecipeCard key={index} recipe={recipe} />
                ))}
            </div>
        </div>
    )
}
