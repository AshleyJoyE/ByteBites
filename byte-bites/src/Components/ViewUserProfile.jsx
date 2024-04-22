import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import styles from "./Styles/ViewUserProfile.module.css";
import NavBar from './NavBar';
import RecipeCard from "./RecipeCard";
import CollectionCard from "./CollectionCard";
import { useNavigate } from 'react-router-dom';
import { AiFillDelete } from "react-icons/ai";

function ViewUserProfile() {
    const { id } = useParams();
    const [profilePhoto, setProfilePhoto] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [bio, setBio] = useState("");
    const [recipes, setRecipes] = useState([]);
    const [collections, setCollections] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);
    const [yourUserId, setYourUserId] = useState('');
    const [viewUserId, setViewUserId] = useState("");
    const navigate = useNavigate();
    const handleHomeNav = () => navigate(`/`);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userResponse = await fetch(`http://localhost:3010/api/getUserByObjectID?id=${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (!userResponse.ok) {
                    console.error('Failed to fetch user data');
                    return;
                }

                const userData = await userResponse.json();
                setProfilePhoto(userData.profilePhoto);
                setUsername(userData.username);
                setEmail(userData.email);
                setBio(userData.bio);
                setViewUserId(id);

                // Fetch recipes
                const recipeResponse = await fetch(`http://localhost:3010/api/getRecipesByUserObjectId?id=${encodeURIComponent(id)}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (!recipeResponse.ok) {
                    console.error('Failed to fetch recipes');
                    return;
                }

                const recipeData = await recipeResponse.json();
                console.log("Recipe Data:", recipeData);

                if (Array.isArray(recipeData.recipes)) {
                    const updatedRecipes = await Promise.all(recipeData.recipes.map(async (recipe) => {
                        const authorId = recipe.author_id;
                        const userResponse = await fetch(`http://localhost:3010/api/getUserByObjectId?id=${encodeURIComponent(authorId)}`, {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        });

                        if (!userResponse.ok) {
                            console.error(`Failed to fetch user with ObjectId: ${authorId}`);
                            return recipe;
                        }

                        const userData = await userResponse.json();
                        const username = userData.username;

                        return {
                            ...recipe,
                            author: username
                        };
                    }));

                    setRecipes(updatedRecipes);
                } else {
                    console.error('Data is not an array');
                }

                // Fetch collections
                const collectionResponse = await fetch(`http://localhost:3010/api/getCollectionByUserObjectID?id=${encodeURIComponent(id)}`, {
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
                console.log("Collection Data:", collectionData);

                if (Array.isArray(collectionData.collections)) {
                    const updatedCollections = await Promise.all(collectionData.collections.map(async (collection) => {
                        const authorId = collection.owner_id;
                        const userResponse = await fetch(`http://localhost:3010/api/getUserByObjectId?id=${encodeURIComponent(authorId)}`, {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        });

                        if (!userResponse.ok) {
                            console.error(`Failed to fetch user with ObjectId: ${authorId}`);
                            return collection;
                        }

                        const userData = await userResponse.json();
                        const username = userData.username;

                        return {
                            ...collection,
                            author: username
                        };
                    }));

                    setCollections(updatedCollections);
                } else {
                    console.error('Data is not an array');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
        const currentUser = localStorage.getItem("user");
        const id1 = localStorage.getItem("id");
        const admin = localStorage.getItem("isAdmin");
        if (currentUser && id1 && admin) {
            setYourUserId(id1);
            if (id1 === viewUserId) {
                navigate(`/profile`);
            }
            setIsAdmin(admin === "true");
        }
    }, [id, viewUserId]);

    const handleDeleteUser = async () => {
        const confirmDelete = window.confirm(`Are you sure you want to delete "${username}"?`);
        if (confirmDelete) {
            try {
                const deleteResponse = await fetch(`http://localhost:3010/api/deleteUser/${viewUserId}`, {
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
        <div className={styles.div_primary}>
            <div className={styles.div_nav_bar}>
                <NavBar />
            </div>
            <div className={styles.div_profileimg_username_email_bio}>
                <div className={styles.div_profile_photo}>
                {(isAdmin) && <AiFillDelete className={styles.trashCan} onClick={handleDeleteUser}></AiFillDelete>}
                    <img className={styles.img_profile_photo} src={profilePhoto} alt="Profile" />
                </div>
                <div className={styles.div_username_email_bio}>
                    <p className={styles.p_username}>@{username} <span className={styles.viewUserId}>Object id: {viewUserId}</span></p>
                    <label className={styles.p_bio_header}>Bio:</label>
                    <div className={styles.div_bio}>
                        <p className={styles.p_bio}>{bio}</p>
                    </div>
                </div>
            </div>
            <p className={styles.p_yourRecipes}>Your Recipes</p>
            <div className={styles.div_wrapper_yourRecipe}>
                <div className={styles.div_yourRecipes}>
                    {recipes.map((recipe, index) => (
                        <div key={index} className={styles.div_yourRecipes}>
                            <RecipeCard recipe={recipe} />
                        </div>
                    ))}
                </div>
            </div>
            <p className={styles.p_yourCollection}>Your Collections</p>
            <div className={styles.div_wrapper_yourCollection}>
                <div className={styles.div_yourCollection}>
                    {collections.map((collection, index) => (
                        <div key={index} className={styles.div_yourCollection}>
                            <CollectionCard collection={collection} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ViewUserProfile;
