import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import BottomNav from './components/BottomNav'
import FloatingCartBar from './components/FloatingCartBar'
import { useCart } from './hooks/useCart'
import AuthPage from './pages/AuthPage'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage'
import DishDetailPage from './pages/DishDetailPage'
import LandingPage from './pages/LandingPage'
import MenuPage from './pages/MenuPage'

function App() {
  const { cart, itemCount, cartTotal, addToCart, updateQuantity, removeItem } = useCart()

  return <BrowserRouter><div className="app-shell"><Header itemCount={itemCount} /><main className="page-content"><Routes><Route path="/" element={<MenuPage onAdd={addToCart} />} /><Route path="/home" element={<LandingPage />} /><Route path="/dish/:id" element={<DishDetailPage onAdd={addToCart} />} /><Route path="/cart" element={<CartPage cart={cart} onUpdate={updateQuantity} onRemove={removeItem} />} /><Route path="/checkout" element={<CheckoutPage />} /><Route path="/login" element={<AuthPage />} /></Routes></main>{cart.length > 0 && <FloatingCartBar itemCount={itemCount} total={cartTotal} />}<BottomNav itemCount={itemCount} /></div></BrowserRouter>
}

export default App
