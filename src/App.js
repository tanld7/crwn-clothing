import React from 'react';
import './App.css';
import { Route, BrowserRouter, Link } from 'react-router-dom';

import HomePage from "./pages/homepage/homepage.component";

const HatsPage = () => {
    return (
        <div>
            <h1>HATS PAGE</h1>
        </div>
    )
}

function App() {
  return (
    <BrowserRouter>
      <Route exact path='/' component={HomePage} />
      <Route path='/shop/hats' component={HatsPage} />
    </BrowserRouter>
  );
}

export default App;
