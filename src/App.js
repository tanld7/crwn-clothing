import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import './App.css';

import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shoppage/shoppage.component";
import Header from "./components/header/header.component";


function App() {
  return (
      <div>

          <BrowserRouter>
              <Header />
              <Route exact path='/' component={HomePage} />
              <Route path='/shop' component={ShopPage} />
          </BrowserRouter>
      </div>

  );
}

export default App;
