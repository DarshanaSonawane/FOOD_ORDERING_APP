
import { useContext } from 'react'
import { StoreContext } from '../context/StoreContext'
import FoodItem from './FoodItem'
import './FoodDisplay.css'

function FoodDisplay({ category = null }) {
  const { foodList } = useContext(StoreContext)

  const foods = Array.isArray(foodList) ? foodList : []

  const visible = category
    ? foods.filter(
        (food) =>
          food.category?.toLowerCase() === category.toLowerCase()
      )
    : foods

  if (visible.length === 0) {
    return <p className="food-display__empty">No dishes found.</p>
  }

  return (
    <div className="food-display">
      <div className="food-display__grid">
        {visible.map((food) => (
          <FoodItem key={food.id} food={food} />
        ))}
      </div>
    </div>
  )
}

export default FoodDisplay
