import React from 'react';
import { Route, BrowserRouter, Link } from 'react-router-dom';

import './App.css';

import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shoppage/shoppage.component";


function App() {
  return (
    <BrowserRouter>
      <Route exact path='/' component={HomePage} />
      <Route path='/shop' component={ShopPage} />
    </BrowserRouter>
  );
}

export default App;
