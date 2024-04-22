import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from "./Styles/Home.module.css";
import { GiSaucepan } from "react-icons/gi";
import { FaUserCircle } from "react-icons/fa";
import NavBar from './NavBar';

import './Styles/AddRecipePage.css'; // Import CSS file for styling


const AddRecipePage = () => {
    
  const navigate = useNavigate();
  const handleHomeNav = () => navigate(`/`);
  const [formData, setFormData] = useState({
    title: '',
    prepTime: '',
    cookTime: '',
    servings: ' ',
    caloriesPerServing: '',
    description: '',
    tags: [''],
    ingredients: [''],
    directions:[''],
    image: null, // Initialize image as null
  });

  useEffect(() => {
    const currentUser = localStorage.getItem("user");
    const id = localStorage.getItem("id");
    if (currentUser && id) {
      setFormData(prevFormData => ({
          ...prevFormData,
          author_id: id // Correct syntax for setting a new property
      }));
    }
    else{
      handleHomeNav();
    }
  }, []);

  const [recipePhoto, setRecipePhoto] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    setFormData({
      ...formData,
      image: imageFile,
    });
  };
  const handleTagChange = (index, value) => {
    const updatedTags = [...formData.tags];
    updatedTags[index] = value;
    setFormData({
      ...formData,
      tags: updatedTags,
    });
  };

  const handleAddTag = () => {
    setFormData({
      ...formData,
      tags: [...formData.tags, ''],
    });
  };

  const handleAddIngredient = () => {
    setFormData({
      ...formData,
      ingredients: [...formData.ingredients, ''],
    });
    console.log(formData.ingredients);
  };

  const handleIngredientChange = (index, value) => {
    const updatedIngredients = [...formData.ingredients];
    updatedIngredients[index] = value;
    setFormData({
      ...formData,
      ingredients: updatedIngredients,
    });
  };

  const handleAddDirection = () => {
    setFormData({
      ...formData,
      directions: [...formData.directions, ''],
    });
  };
  
  const handleDirectionChange = (index, value) => {
    const updatedDirections = [...formData.directions];
    updatedDirections[index] = value;
    setFormData({
      ...formData,
      directions: updatedDirections,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    uploadRecipeImage(formData.image);
  
    try {
      const response = await fetch("https://bytebites-bzpd.onrender.com/api/postRecipe", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: formData.title,
          author_id: formData.author_id,
          recipePhoto: recipePhoto,
          description: formData.description,
          cookTime: formData.cookTime,
          prepTime: formData.prepTime,
          servings: formData.servings,
          caloriesPerServing: formData.caloriesPerServing,
          ingredients: formData.ingredients,
          directions: formData.directions,
          categories: formData.categories
        })
      });
  
      if (response.ok) {
        handleHomeNav();
      } else {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error occurred during form submission:', error);
      // Handle error here, e.g., display a message to the user
    }
  };

  const uploadRecipeImage = async (file) => {
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
                const response = await fetch('https://bytebites-bzpd.onrender.com/api/uploadToS3', {
                    method: 'POST',
                    body: formData
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log('File uploaded successfully:', data.fileUrl);
                    setRecipePhoto(data.fileUrl);
                } else {
                    console.error('Failed to upload file to S3');
                }
            }, file.type);
        };
    } catch (error) {
        console.error('Error uploading file:', error);
    }
};
  return (
    <div className="centered-container"> 
    <div className={styles.div_nav_bar}>
                <NavBar>   </NavBar>
            </div>
      <div className="form-container"> 


        <h2>Add Recipe</h2>
        <form onSubmit="return false">
          <div>
            <label>Title:</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Prep Time (minutes):</label>
            <input
              type="number"
              name="prepTime"
              value={formData.prepTime}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Cook Time (minutes):</label>
            <input
              type="number"
              name="cookTime"
              value={formData.cookTime}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Servings:</label>
            <input
              type="number"
              name="servings"
              value={formData.servings}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Calories per Serving:</label>
            <input
              type="number"
              name="caloriesPerServing"
              value={formData.caloriesPerServing}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Description:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
            ></textarea>
          </div>

          <div>
            <label>Tags:</label>
              {formData.tags.map((tag, index) => (
              <div key={index}>
              <input
                type="text"
                value={tag}
                onChange={(e) => handleTagChange(index, e.target.value)}
              />
              </div>
              ))}
              <button type="button" onClick={handleAddTag}>
                + Add Tag
              </button>
          </div>

          <div>
            <label>Ingredients:</label>
              {formData.ingredients.map((ingredient, index) => (
            <div key={index}>
            <input
              type="text"
              value={ingredient}
              onChange={(e) => handleIngredientChange(index, e.target.value)}
            />
            </div>
            ))}
            <button type="button" onClick={handleAddIngredient}>
              + Add Ingredient
            </button>
          </div>

          <div>
            <label>Directions:</label>
              {formData.directions.map((direction, index) => (
              <div key={index}>
            <textarea
              value={direction}
            onChange={(e) => handleDirectionChange(index, e.target.value)}
            />
            </div>
            ))}
            <button type="button" onClick={handleAddDirection}>
              + Add Direction
            </button>
          </div>

          <div>
            <label>Image:</label>
            <input type="file" onChange={handleImageChange}/>
          </div>

          <button onClick={handleSubmit}>Submit</button>
        </form>
      </div>
    </div>
  );
};

export default AddRecipePage;