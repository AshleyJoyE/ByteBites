import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiFillDelete } from 'react-icons/ai'; // Import trash can icon
import NavBar from './NavBar';
import './Styles/AddRecipePage.css';

const AddRecipePage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    prepTime: '',
    cookTime: '',
    serving: '',
    caloriesPerServing: '',
    description: '',
    tags: '',
    ingredients: [''],
    directions: [''],
    image: null,
  });

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

  const handleDeleteIngredient = (index) => {
    const updatedIngredients = formData.ingredients.filter((_, i) => i !== index);
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

  const handleDeleteDirection = (index) => {
    const updatedDirections = formData.directions.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      directions: updatedDirections,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:3010/api/postRecipe", {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                title: formData.title,
                                author_id: formData.author_id,
                                recipePhoto: formData.recipePhoto,
                                description: formData.description,
                                cookTime: formData.cookTime,
                                prepTime: formData.prepTime,
                                servings: formData.serving,
                                caloriesPerServing: formData.caloriesPerServing,
                                ingredients: formData.ingredients,
                                directions: formData.directions,
                                categories: formData.categories
                            })
                        });
    // Here you can submit formData to your backend
    console.log(formData);
  };

  return (
    <div className="centered-container"> 
      <div className="div_nav_bar">
        <NavBar />
      </div>
      <div className="form-container"> 
        <h2>Add Recipe</h2>
        <form onSubmit={handleSubmit}>
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
              name="serving"
              value={formData.serving}
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
            <label>Tags (comma-separated):</label>
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Ingredients:</label>
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
            <button type="button" onClick={handleAddIngredient}>
              + Add Ingredient
            </button>
          </div>
          <div>
            <label>Directions:</label>
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
            <button type="button" onClick={handleAddDirection}>
              + Add Direction
            </button>
          </div>
          <div>
            <label>Image:</label>
            <input type="file" onChange={handleImageChange} />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default AddRecipePage;
