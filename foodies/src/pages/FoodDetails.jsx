import { useContext, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { StoreContext } from '../context/StoreContext'
import './FoodDetails.css'

function FoodDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { foodList, cartItems, addToCart, decreaseQty, removeFromCart } =
    useContext(StoreContext)

  const [showSummary, setShowSummary] = useState(false)
  const [orderPlaced, setOrderPlaced] = useState(false)

  const foods = Array.isArray(foodList) ? foodList : []
  const food = foods.find((item) => String(item.id) === String(id))

  if (!food) {
    return (
      <div className="food-details">
        <h2>Food not found</h2>
        <button onClick={() => navigate('/')}>Back to Home</button>
      </div>
    )
  }

  const qty = cartItems[food.id] || 0
  const unitPrice = Number(food.price)
  const total = unitPrice * qty

  const handleIncrease = () => {
    setOrderPlaced(false)
    addToCart(food.id)
  }

  const handleDecrease = () => {
    if (qty <= 1) setShowSummary(false)
    decreaseQty(food.id)
  }

  const handleConfirmOrder = () => {
    // TODO: send the order to your backend here, e.g.
    // await axios.post('/api/orders', { foodId: food.id, quantity: qty, total })

    removeFromCart(food.id)
    setShowSummary(false)
    setOrderPlaced(true)
  }

  return (
    <div className="food-details">
      <button className="food-details__back" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div className="food-details__card">
        <img
          src={food.imageUrl}
          alt={food.name}
          className="food-details__image"
        />

        <div className="food-details__content">
          <h1>{food.name}</h1>

          <p className="food-details__category">
            Category: {food.category || 'Not specified'}
          </p>

          <p className="food-details__description">{food.description}</p>

          {/* price changes with quantity */}
          <h2 className="food-details__price">
            ₹{(qty > 0 ? total : unitPrice).toLocaleString('en-IN')}
          </h2>
          {qty > 0 && (
            <p className="food-details__calc">
              ₹{unitPrice} × {qty}
            </p>
          )}

          {orderPlaced && (
            <p className="food-details__success">
              ✅ Order placed successfully!
            </p>
          )}

          {qty === 0 ? (
            <button
              type="button"
              className="food-details__cart-btn"
              onClick={handleIncrease}
            >
              🛒 Add to Cart
            </button>
          ) : (
            <>
              <div className="food-details__qty">
                <button
                  type="button"
                  aria-label="Decrease quantity"
                  onClick={handleDecrease}
                >
                  −
                </button>
                <span className="food-details__qty-count">{qty}</span>
                <button
                  type="button"
                  aria-label="Increase quantity"
                  onClick={handleIncrease}
                >
                  +
                </button>
              </div>

              {!showSummary && (
                <button
                  type="button"
                  className="food-details__order-btn"
                  onClick={() => setShowSummary(true)}
                >
                  Order Now
                </button>
              )}
            </>
          )}

          {showSummary && qty > 0 && (
            <div className="food-details__summary">
              <h3>Order Summary</h3>
              <p>
                {food.name} × {qty}
              </p>
              <p className="food-details__summary-total">
                Total: ₹{total.toLocaleString('en-IN')}
              </p>

              <div className="food-details__summary-actions">
                <button
                  type="button"
                  className="food-details__confirm"
                  onClick={handleConfirmOrder}
                >
                  Confirm Order
                </button>
                <button
                  type="button"
                  className="food-details__cancel"
                  onClick={() => setShowSummary(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default FoodDetails