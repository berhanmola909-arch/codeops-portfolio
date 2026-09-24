import { useEffect, useState } from 'react'

export function useCart() {
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem('mesob-cart')) || [])

  useEffect(() => {
    localStorage.setItem('mesob-cart', JSON.stringify(cart))
  }, [cart])

  function addToCart(dish, options = {}) {
    const item = { ...dish, cartId: `${dish.id}-${options.spice || ''}`, ...options, quantity: 1 }
    setCart((currentCart) => {
      const existingItem = currentCart.find((cartItem) => cartItem.cartId === item.cartId)
      if (existingItem) {
        return currentCart.map((cartItem) => cartItem.cartId === item.cartId ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem)
      }
      return [...currentCart, item]
    })
  }

  function updateQuantity(cartId, amount) {
    setCart((currentCart) => currentCart.map((item) => item.cartId === cartId ? { ...item, quantity: item.quantity + amount } : item).filter((item) => item.quantity > 0))
  }

  function removeItem(cartId) {
    setCart((currentCart) => currentCart.filter((item) => item.cartId !== cartId))
  }

  const itemCount = cart.reduce((total, item) => total + item.quantity, 0)
  const cartTotal = cart.reduce((total, item) => total + (item.priceETB || item.price || 0) * item.quantity, 0)

  return { cart, itemCount, cartTotal, addToCart, updateQuantity, removeItem }
}
