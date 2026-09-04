import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout/MainLayout.jsx';
import HomePage from './pages/HomePage/HomePage.jsx';
import CategoriesPage from './pages/CategoriesPage/CategoriesPage.jsx';
import ProductsPage from './pages/ProductsPage/ProductsPage.jsx';
import SalesPage from './pages/SalesPage/SalesPage.jsx';
import ProductPage from './pages/ProductPage/ProductPage.jsx';
import CartPage from './pages/CartPage/CartPage.jsx';
import CategoryPage from './pages/CategoryPage/CategoryPage.jsx';

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/sales" element={<SalesPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/categories/:id" element={<CategoryPage />} />
      </Route>
    </Routes>
  );
}

export default App;