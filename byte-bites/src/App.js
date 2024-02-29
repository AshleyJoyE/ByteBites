import './App.css';
import Home from '../src/Components/Home'
import Login from './Components/Login';
import { Route, Routes } from 'react-router-dom';
import React from 'react';
function App() {
  return (
      <div className="App">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/Login' element={<Login />}/>
        </Routes>
      </div>
    );
}

export default App;