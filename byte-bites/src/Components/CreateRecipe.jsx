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
    caloriesPerServing: '',
    description: '',
    tags: '',
    ingredients: '',
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can submit formData to your backend
    console.log(formData);
  };

  return (
    <div className="centered-container"> {/* Container div for centering */}
    <div className={styles.div_nav_bar}>
                <NavBar>   </NavBar>
            </div>
      <div className="form-container"> {/* Box structure around the form */}


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
            <label>Ingredients (comma-separated):</label>
            <textarea
              name="ingredients"
              value={formData.ingredients}
              onChange={handleChange}
            ></textarea>
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