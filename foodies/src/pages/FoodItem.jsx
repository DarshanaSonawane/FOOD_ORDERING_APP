import { useNavigate } from 'react-router-dom'
import './FoodItem.css'

function FoodItem({ food }) {
  const navigate = useNavigate()

  return (
    <article className="food-item">
      <img
        src={food.imageUrl}
        alt={food.name}
        className="food-item__image"
      />

      <div className="food-item__body">
        <h3 className="food-item__name">{food.name}</h3>

        <p className="food-item__desc">{food.description}</p>

        <p className="food-item__price">₹{food.price}</p>

        <button
          className="food-item__view-btn"
          onClick={() => navigate(`/food/${food.id}`)}
        >
          View Food →
        </button>
      </div>
    </article>
  )
}

export default FoodItem