import React from "react";
import { Routes, Route } from 'react-router-dom'


import './App.css';

import HomePage from './pages/homepage/homepage.component'

export const HatsPage = () => {
  return (
    <h1>HatsPage</h1>
  )
}


function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route path='/hats' element={<HatsPage/>} />
      </Routes>
    </div>
  );  
}

export default App;
