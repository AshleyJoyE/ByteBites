import './App.css';
import Home from '../src/Components/Home'
import Login from './Components/Login';
import Signup from './Components/Signup';
import { Route, Routes } from 'react-router-dom';
import React from 'react';
import RecipePage from './Components/RecipeResult';
import ViewUserProfile from './Components/ViewUserProfile';
import ViewRecipe from './Components/ViewRecipe';
function App() {
  return (
      <div className="App">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/Login' element={<Login />}/>
          <Route path='/Signup' element={<Signup />}/>
          <Route path='/Results' element={<RecipePage />}/>
          
          <Route path='/Profile/:id' element={<ViewUserProfile/>}/>
          <Route path='/Recipe/:id' element={<ViewRecipe/>}/>
        </Routes>
      </div>
    );
}

export default App;