import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from "./Styles/Home.module.css";
import { GiSaucepan } from "react-icons/gi";
import { FaUserCircle } from "react-icons/fa";
import NavBar from './NavBar';
import { AiFillDelete } from 'react-icons/ai';

import './Styles/AddRecipePage.css'; // Import CSS file for styling

const AddRecipePage = () => {
    
  const navigate = useNavigate();
  const handleHomeNav = () => navigate(`/`);
  const [formData, setFormData] = useState({
    title: '',
    prepTime: '',
    cookTime: '',
    servings: '',
    caloriesPerServing: '',
    description: '',
    tags: [''],
    ingredients: [''],
    directions:[''],
    image: null, // Initialize image as null
  });

  const [errors, setErrors] = useState({
    title: '',
    prepTime: '',
    cookTime: '',
    servings: '',
    caloriesPerServing: '',
    ingredients: '',
    directions: '',
    image: ''
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

    // Call the image upload function when an image is selected
    uploadRecipeImage(imageFile);
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

    let hasErrors = false;
    const newErrors = {
      title: '',
      prepTime: '',
      cookTime: '',
      servings: '',
      caloriesPerServing: '',
      ingredients: '',
      directions: '',
      image: ''
    };

    // Check for empty required fields
    if (!formData.title) {
      newErrors.title = 'Title is required';
      hasErrors = true;
    }
    if (!formData.prepTime) {
      newErrors.prepTime = 'Prep Time is required';
      hasErrors = true;
    }
    if (!formData.cookTime) {
      newErrors.cookTime = 'Cook Time is required';
      hasErrors = true;
    }
    if (!formData.servings) {
      newErrors.servings = 'Servings is required';
      hasErrors = true;
    }
    if (!formData.caloriesPerServing) {
      newErrors.caloriesPerServing = 'Calories per Serving is required';
      hasErrors = true;
    }
    if (formData.ingredients.some(ingredient => !ingredient)) {
      newErrors.ingredients = 'All ingredients are required';
      hasErrors = true;
    }
    if (formData.directions.some(direction => !direction)) {
      newErrors.directions = 'All directions are required';
      hasErrors = true;
    }
    if (!recipePhoto) {
      newErrors.image = 'Image is required';
      hasErrors = true;
    }

    setErrors(newErrors);

    if (hasErrors) {
      return;
    }

    try {
      // Check if the recipe photo has been uploaded
      if (!recipePhoto) {
        console.error('Recipe photo not uploaded');
        return;
      }

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
              categories: formData.tags
          })
      });

      if (response.ok) {
          console.log("Recipe submitted successfully!");
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
    if (!file) return;

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

  const handleDeleteIngredient = (index) => {
    const updatedIngredients = formData.ingredients.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      ingredients: updatedIngredients,
    });
  };


  const handleDeleteDirection = (index) => {
    const updatedDirections = formData.directions.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      directions: updatedDirections,
    });
  };

  const handleDeleteTag = (index) => {
    const updatedTags = formData.tags.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      tags: updatedTags,
    });
  };

  return (
    <div className="centered-container"> 
    <div className={styles.div_nav_bar}>
                <NavBar>   </NavBar>
            </div>
      <div className="form-container"> 


        <h2>Add Recipe</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Title: <span className="required-field">*</span></label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
            {errors.title && <span className="error">{errors.title}</span>}
          </div>

          <div>
            <label>Prep Time (minutes): <span className="required-field">*</span></label>
            <input
              type="number"
              name="prepTime"
              value={formData.prepTime}
              onChange={handleChange}
            />
            {errors.prepTime && <span className="error">{errors.prepTime}</span>}
          </div>

          <div>
            <label>Cook Time (minutes): <span className="required-field">*</span></label>
            <input
              type="number"
              name="cookTime"
              value={formData.cookTime}
              onChange={handleChange}
            />
            {errors.cookTime && <span className="error">{errors.cookTime}</span>}
          </div>

          <div>
            <label>Servings: <span className="required-field">*</span></label>
            <input
              type="number"
              name="servings"
              value={formData.servings}
              onChange={handleChange}
            />
            {errors.servings && <span className="error">{errors.servings}</span>}
          </div>

          <div>
            <label>Calories per Serving: <span className="required-field">*</span></label>
            <input
              type="number"
              name="caloriesPerServing"
              value={formData.caloriesPerServing}
              onChange={handleChange}
            />
            {errors.caloriesPerServing && <span className="error">{errors.caloriesPerServing}</span>}
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
              <div key={index} className="tags-container">
                <input
                  type="text"
                  value={tag}
                  onChange={(e) => handleTagChange(index, e.target.value)}
                />
                <div className="delete-button-container">
                  <AiFillDelete onClick={() => handleDeleteTag(index)} />
                </div>
              </div>
              ))}
              <button type="button" onClick={handleAddTag}>
                + Add Tag
              </button>
          </div>


          <div>
            <label>Ingredients: <span className="required-field">*</span></label>
            {formData.ingredients.map((ingredient, index) => (
              <div className="ingredient-container" key={index}>
                <input
                  type="text"
                  value={ingredient}
                  onChange={(e) => handleIngredientChange(index, e.target.value)}
                />
                <div className="delete-button-container">
                  <AiFillDelete onClick={() => handleDeleteIngredient(index)} />
                </div>
              </div>
            ))}
            {errors.ingredients && <span className="error">{errors.ingredients}</span>}
            <button type="button" onClick={handleAddIngredient}>
              + Add Ingredient
            </button>
          </div>

          <div>
            <label>Directions: <span className="required-field">*</span></label>
            {formData.directions.map((direction, index) => (
              <div className="direction-container" key={index}>
                <textarea
                  value={direction}
                  onChange={(e) => handleDirectionChange(index, e.target.value)}
                />
                <div className="delete-button-container">
                  <AiFillDelete onClick={() => handleDeleteDirection(index)} />
                </div>
              </div>
            ))}
            {errors.directions && <span className="error">{errors.directions}</span>}
            <button type="button" onClick={handleAddDirection}>
              + Add Direction
            </button>
          </div>

          <div>
            <label>Image: <span className="required-field">*</span></label>
            <input type="file" onChange={handleImageChange}/>
            {errors.image && <span className="error">{errors.image}</span>}
          </div>

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default AddRecipePage;
