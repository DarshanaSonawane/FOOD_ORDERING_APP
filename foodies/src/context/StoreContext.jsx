import { createContext, useEffect, useState } from 'react'
import { fetchFoodList } from '../foodservice/foodservice.js'

export const StoreContext = createContext(null)

export function StoreContextProvider({ children }) {
  const [foodList, setFoodList] = useState([])
  const [cartItems, setCartItems] = useState({})

  useEffect(() => {
    async function loadFoods() {
      try {
        const data = await fetchFoodList()
        setFoodList(data)
      } catch (error) {
        console.error('Failed to load foods', error)
      }
    }
    loadFoods()
  }, [])

  const addToCart = (foodId) => {
    setCartItems((prev) => ({ ...prev, [foodId]: (prev[foodId] || 0) + 1 }))
  }

  const decreaseQty = (foodId) => {
    setCartItems((prev) => {
      const updated = { ...prev }
      if (updated[foodId] > 1) {
        updated[foodId] -= 1
      } else {
        delete updated[foodId]
      }
      return updated
    })
  }

  const removeFromCart = (foodId) => {
    setCartItems((prev) => {
      const updated = { ...prev }
      delete updated[foodId]
      return updated
    })
  }

  const clearCart = () => setCartItems({})

  const getTotalCount = () =>
    Object.values(cartItems).reduce((sum, qty) => sum + qty, 0)

  const getTotalAmount = () =>
    foodList.reduce(
      (sum, food) => sum + Number(food.price) * (cartItems[food.id] || 0),
      0
    )

  return (
    <StoreContext.Provider
      value={{
        foodList,
        setFoodList,
        cartItems,
        addToCart,
        decreaseQty,
        removeFromCart,
        clearCart,
        getTotalCount,
        getTotalAmount,
      }}
    >
      {children}
    </StoreContext.Provider>
  )
}