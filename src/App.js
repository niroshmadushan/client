import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Compo/Login';
import Register from './Compo/Register';
import Dashboard from './Compo/Dashboard';
import ProtectedRoute from './Compo/ProtectedRoute';

import './App.css';




const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        {/* { <Route
          path="/register-product"
          element={
            <ProtectedRoute>
             
            </ProtectedRoute>
          }
        /> } */}
        {/* {<Route
          path="/products"
          element={
            <ProtectedRoute>
              <ProductList />
            </ProtectedRoute>
          }
        />} */}
      </Routes>
    </Router>
  );
};

export default App;
