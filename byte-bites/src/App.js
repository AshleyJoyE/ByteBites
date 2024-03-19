import './App.css';
import Home from '../src/Components/Home'
import Login from './Components/Login';
import Signup from './Components/Signup';
import { Route, Routes } from 'react-router-dom';
import React from 'react';
function App() {
  return (
      <div className="App">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/Login' element={<Login />}/>
          <Route path='/Signup' element={<Signup />}/>
        </Routes>
      </div>
    );
}

export default App;