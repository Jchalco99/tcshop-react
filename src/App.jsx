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
import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminUserDashboardPage from './pages/admin/AdminUserDashboardPage';
import AdminProductDashboardPage from './pages/admin/AdminProductDashboardPage';
import { ComprehensiveForm } from './pages/test';
import AddProductPage from './pages/admin/AddProductPage';
import UpdateProductPage from './pages/admin/UpdateProductPage';
import AdminTiendaDashboardPage from './pages/admin/AdminTiendaDashboardPage';

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

          <Route path='/admin/auth/login' element={<AdminLoginPage />} />
          <Route path='/admin/dashboard' element={<AdminUserDashboardPage />} />
          <Route path='/admin/dashboard/usuarios' element={<AdminUserDashboardPage />} />
          <Route path='/admin/dashboard/productos' element={<AdminProductDashboardPage />} />
          <Route path='/admin/dashboard/productos/add' element={<AddProductPage />} />
          <Route path='/admin/dashboard/productos/update/:idProducto' element={<UpdateProductPage />} />
          <Route path='/admin/dashboard/tiendas' element={<AdminTiendaDashboardPage />} />
          <Route path='/test' element={<ComprehensiveForm />} />
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  )
}

export default App
