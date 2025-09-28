import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage.jsx';
import Products from './components/Products.jsx';
import PlaceOrder from './components/PlaceOrder.jsx';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<Products />} />
          <Route path="/place-order" element={<PlaceOrder />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;