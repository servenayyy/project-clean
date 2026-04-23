// src/App.tsx

import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import { Layout } from './components/layout/Layout'
import { CategoryPage } from './pages/CategoryPage'
import { HomePage } from './pages/HomePage'
import { ProductDetailPage } from './pages/ProductDetailPage'
import { SearchPage } from './pages/SearchPage'
import { WishlistPage } from './pages/WishlistPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/kategori/:slug" element={<CategoryPage />} />
          <Route path="/urun/:slug" element={<ProductDetailPage />} />
          <Route path="/arama" element={<SearchPage />} />
          <Route path="/ara" element={<Navigate to="/arama" replace />} />
          <Route path="/favoriler" element={<WishlistPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
