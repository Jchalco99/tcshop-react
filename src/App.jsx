import React from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ProductPage from './pages/ProductPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ShoppingCartPage from './pages/ShoppingCartPage';
import VerifyPage from './pages/VerifyPage';
import ShopPage from './pages/ShopPage';

function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Routes>
          <Route path='' element={<HomePage />} />
          <Route path='/producto/:idProducto' element={<ProductPage />} />
          <Route path='/tienda/:idTienda' element={<ShopPage />} />
          <Route path='/cart' element={<ShoppingCartPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/verify' element={<VerifyPage />} />
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  )
}

export default App
