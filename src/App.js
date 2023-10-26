import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import './App.css';
import Products from './pages/Products';
import Cart from './pages/Cart';

const App = () => {
  return (
    <Router>
        <Routes>
          <Route exact path="/" element={<Products/>}/>
          <Route exact path="/cart" element={<Cart/>}/>
          
        </Routes>
    </Router>
  );
}

export default App;