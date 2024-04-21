import { useEffect, useState } from "react";
import styles from "./Styles/YourUserProfile.module.css";
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar';
import { FaPencilAlt } from "react-icons/fa";
import RecipeCard from "./RecipeCard";
import CollectionCard from "./CollectionCard";
import { BsPlusSquare } from "react-icons/bs";


function YourUserProfile(){
    const navigate = useNavigate();
    const handleHomeNav = () => navigate(`/`);
    const profilePhoto = localStorage.getItem("profilePhoto");
    const username = localStorage.getItem("username");
    const email = localStorage.getItem("email");
    const id = localStorage.getItem("id");
    const [bio, setBio] = useState(localStorage.getItem("bio"));
    const [recipes, setRecipes] = useState([]);
    const [collections, setCollections] = useState([]);
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [showCollectionModal, setShowCollectionModal] = useState(false);
    const [collection, setCollection] = useState("");
    const [isValidCollection, setIsValidCollection] = useState(true);

    const handleBioSubmit = (e) =>{
        e.preventDefault();
        updateBio(bio);
    }

    const uploadProfileImage = async (file) => {
        try {
            // Create a canvas element to resize the image
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
    
            // Load the image file
            const img = new Image();
            img.src = URL.createObjectURL(file);
    
            // Wait for the image to load
            img.onload = () => {
                // Set canvas dimensions to 500x500 pixels
                canvas.width = 500;
                canvas.height = 500;
    
                // Draw the image onto the canvas with resizing
                ctx.drawImage(img, 0, 0, 500, 500);
    
                // Convert canvas content to a blob
                canvas.toBlob(async (blob) => {
                    // Create a new file from the blob
                    const resizedFile = new File([blob], file.name, { type: file.type });
    
                    // Create FormData and append the resized file
                    const formData = new FormData();
                    formData.append('fileData', resizedFile);
                    formData.append('fileName', resizedFile.name);
    
                    // Upload the resized file
                    const response = await fetch('http://localhost:3010/api/uploadToS3', {
                        method: 'POST',
                        body: formData
                    });
    
                    if (response.ok) {
                        const data = await response.json();
                        console.log('File uploaded successfully:', data.fileUrl);
    
                        // Update local storage
                        localStorage.setItem("profilePhoto", data.fileUrl);
                        // Update profile photo in db
                        await updateProfilePhoto(data.fileUrl);
    
                        // Close popup
                        setShowUploadModal(false);
                        // Refresh page
                        window.location.reload();
                    } else {
                        console.error('Failed to upload file to S3');
                    }
                }, file.type);
            };
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };
    
    const updateProfilePhoto = async (newProfilePhotoUrl) => {
        const userId = localStorage.getItem("id");
        try {
            const response = await fetch(`http://localhost:3010/api/putUser/${userId}/profilePhoto`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ profilePhoto: newProfilePhotoUrl })
            });

    
            if (!response.ok) {
                console.error('Failed to update profile photo');
            }
        } catch (error) {
            console.error('Error updating profile photo:', error);
        }
    };
    const updateBio = async (newBio) => {
    
        const userId = localStorage.getItem("id");
        try {
            const response = await fetch(`http://localhost:3010/api/putUser/${userId}/bio`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ bio: newBio })
            });
    
            if (!response.ok) {
                console.error('Failed to update bio');
            } else {
                localStorage.setItem("bio", newBio);
            }
        } catch (error) {
            console.error('Error updating bio:', error);
        }
    };

    const createCollection = async () =>{
        if (collection.length > 0){
            const response = await fetch("http://localhost:3010/api/postCollection", {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify({
                                        collectionName: collection,
                                        owner_id: id
                                    })
            });
            if (response.ok){
              setIsValidCollection(true);
              setShowCollectionModal(false);
              window.location.reload();
           }
           // post request failed
           else {
               throw new Error(`HTTP error! Status: ${response.status}`);
           }
        }
        else {
            setIsValidCollection(false);
        }
       
    }
    // when user navigates to page, check if user is already logged in, if not return to home,
    useEffect(() => {
        const fetchData = async () => {
            try {
                const currentUser = localStorage.getItem("user");
                if (!currentUser) {
                    handleHomeNav();
                    return; // Exit early if user is not logged in
                }
              
        
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
        
                // Process recipes
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
        
                // Process collections
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
    }, []);
    return (
        <div className={styles.div_primary}>
            <div className={styles.div_nav_bar}>
                <NavBar />
            </div>
            <div className={styles.div_profileimg_username_email_bio}>
                <div className={styles.div_profile_photo}>
                    <img className={styles.img_profile_photo} src={profilePhoto} alt="Profile" />
                    <button className={styles.p_change_profile_image} onClick={() => setShowUploadModal(true)}>Change Profile Image</button>
                </div>
                <div className={styles.div_username_email_bio}>
                    <p className={styles.p_username}>@{username}</p>
                    <form className={styles.form_bio} onSubmit={handleBioSubmit}>
                        <label className={styles.p_bio}>Bio:</label>
                        <textarea className={styles.input_bio} type="text"  onChange={(e) => setBio(e.target.value)} placeholder={bio} value={bio} onBlur={handleBioSubmit}></textarea>
                    </form>
                    <div className={styles.div_email_changePassword}>
                        <p className={styles.p_email}>{email}</p>
                        <p className={styles.button_changePassword}>Change password!</p>
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
            <div className={styles.addCollection}>
                <p className={styles.p_yourCollection}>Your Collections</p>   
                <BsPlusSquare className={styles.add_btn} onClick={() => setShowCollectionModal(true)} />
            </div>
           
            <div className={styles.div_wrapper_yourCollection}> 
                <div className={styles.div_yourCollection}>
                    {collections.map((collection, index) => (
                        <div key={index} className={styles.div_yourCollection}>
                            <CollectionCard collection={collection} />
                        </div>
                    ))}
                </div>
            </div>
                <dialog open={showUploadModal}>
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                        <span className={styles.close} onClick={() => setShowUploadModal(false)}>&times;</span>
                        
                        <h2>Upload Profile Image</h2>
                        {/* Add your image upload form here */}
                        <form>
                            <input type="file" onChange={(e) => uploadProfileImage(e.target.files[0])} />
                            <button type="button" onClick={() => setShowUploadModal(false)}>Upload</button>
                        </form>
                    </div>
                </div>
                </dialog>
               
                <dialog open={showCollectionModal}>
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                        <span className={styles.close} onClick={() => setShowCollectionModal(false)}>&times;</span>
                        
                        <h2>Add Collection</h2>
                        <h4>Collection Name</h4>
                        
                        <form>
                           
                        <input type="text" placeholder="Enter Collection Name" value={collection} onChange={(e) => setCollection(e.target.value)} />
                            <button type="button" onClick={createCollection}>Create Collection</button>
                            {!isValidCollection && <label> Must Enter Collection Name! </label>}
                        </form>
                    </div>
                </div>
                </dialog>


        </div>
    );
}

export default YourUserProfile;
