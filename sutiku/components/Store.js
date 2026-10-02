'use client'

import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { initialMenu } from '../lib/menu'

const StoreContext = createContext(null)

export function StoreProvider({ children }) {
  const [menu, setMenu] = useState(initialMenu)
  const [cart, setCart] = useState([])
  const [orders, setOrders] = useState([])

  useEffect(() => {
    const savedMenu = localStorage.getItem('sutiku-menu')
    const savedOrders = localStorage.getItem('sutiku-orders')
    if (savedMenu) setMenu(JSON.parse(savedMenu))
    if (savedOrders) setOrders(JSON.parse(savedOrders))
  }, [])

  useEffect(() => localStorage.setItem('sutiku-menu', JSON.stringify(menu)), [menu])
  useEffect(() => localStorage.setItem('sutiku-orders', JSON.stringify(orders)), [orders])

  const addToCart = item => {
    setCart(curr => {
      const found = curr.find(x => x.id === item.id)
      return found ? curr.map(x => x.id === item.id ? { ...x, qty: x.qty + 1 } : x) : [...curr, { ...item, qty: 1 }]
    })
  }

  const updateQty = (id, qty) => setCart(curr => curr.filter(x => x.id !== id || qty > 0).map(x => x.id === id ? { ...x, qty } : x))
  const clearCart = () => setCart([])
  const total = useMemo(() => cart.reduce((sum, item) => sum + item.price * item.qty, 0), [cart])

  const createOrder = customer => {
    const order = {
      id: `STK-${Date.now().toString().slice(-6)}`,
      createdAt: new Date().toISOString(),
      status: 'New',
      customer,
      items: cart,
      total
    }
    setOrders(curr => [order, ...curr])
    clearCart()
    return order
  }

  return <StoreContext.Provider value={{ menu, setMenu, cart, addToCart, updateQty, total, orders, setOrders, createOrder }}>{children}</StoreContext.Provider>
}

export function useStore() {
  const value = useContext(StoreContext)
  if (!value) throw new Error('useStore must be used inside StoreProvider')
  return value
}
