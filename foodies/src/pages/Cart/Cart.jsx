import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'
import './Cart.css'

const DELIVERY_FEE = 40
const FREE_DELIVERY_ABOVE = 500
const GST_RATE = 0.05

const formatINR = (n) => `₹${n.toLocaleString('en-IN')}`

function Cart() {
  const {
    foodList,
    cartItems,
    addToCart,
    decreaseQty,
    removeFromCart,
    clearCart,
    getTotalCount,
    getTotalAmount,
  } = useContext(StoreContext)

  const [orderPlaced, setOrderPlaced] = useState(false)

  const foods = Array.isArray(foodList) ? foodList : []
  const items = foods.filter((food) => cartItems[food.id] > 0)

  const subtotal = getTotalAmount()
  const delivery =
    subtotal === 0 || subtotal >= FREE_DELIVERY_ABOVE ? 0 : DELIVERY_FEE
  const gst = Math.round(subtotal * GST_RATE)
  const total = subtotal + delivery + gst

  const handlePlaceOrder = () => {
    // TODO: send the order to your backend here, e.g.
    // await axios.post('/api/orders', { items: cartItems, total })

    clearCart()
    setOrderPlaced(true)
  }

  if (orderPlaced) {
    return (
      <section className="cart cart--center">
        <h1>✅ Order placed successfully!</h1>
        <p>Thank you. Your food is on its way.</p>
        <Link to="/" className="cart__primary-link">
          Continue Ordering
        </Link>
      </section>
    )
  }

  if (items.length === 0) {
    return (
      <section className="cart cart--center">
        <h1>Your cart is empty</h1>
        <p>Add some tasty food and it will show up here.</p>
        <Link to="/" className="cart__primary-link">
          Browse Foods
        </Link>
      </section>
    )
  }

  return (
    <section className="cart">
      <h1 className="cart__title">
        Your Cart <span>({getTotalCount()} items)</span>
      </h1>

      <div className="cart__layout">
        {/* Items */}
        <div className="cart__items">
          {items.map((food) => {
            const qty = cartItems[food.id]
            const price = Number(food.price)

            return (
              <div className="cart__item" key={food.id}>
                <img
                  src={food.imageUrl}
                  alt={food.name}
                  className="cart__image"
                />

                <div className="cart__info">
                  <Link to={`/food/${food.id}`} className="cart__name">
                    {food.name}
                  </Link>
                  <p className="cart__category">{food.category}</p>
                  <p className="cart__unit">{formatINR(price)} each</p>
                </div>

                <div className="cart__qty">
                  <button
                    type="button"
                    aria-label="Decrease quantity"
                    onClick={() => decreaseQty(food.id)}
                  >
                    −
                  </button>
                  <span>{qty}</span>
                  <button
                    type="button"
                    aria-label="Increase quantity"
                    onClick={() => addToCart(food.id)}
                  >
                    +
                  </button>
                </div>

                <p className="cart__line-total">{formatINR(price * qty)}</p>

                <button
                  type="button"
                  className="cart__remove"
                  aria-label={`Remove ${food.name}`}
                  onClick={() => removeFromCart(food.id)}
                >
                  ✕
                </button>
              </div>
            )
          })}
        </div>

        {/* Order summary */}
        <aside className="cart__summary">
          <h2>Order Summary</h2>

          <div className="cart__row">
            <span>Subtotal</span>
            <span>{formatINR(subtotal)}</span>
          </div>

          <div className="cart__row">
            <span>Delivery fee</span>
            <span>{delivery === 0 ? 'FREE' : formatINR(delivery)}</span>
          </div>

          <div className="cart__row">
            <span>GST (5%)</span>
            <span>{formatINR(gst)}</span>
          </div>

          {delivery > 0 && (
            <p className="cart__hint">
              Add {formatINR(FREE_DELIVERY_ABOVE - subtotal)} more for free
              delivery
            </p>
          )}

          <div className="cart__row cart__row--total">
            <span>Total</span>
            <span>{formatINR(total)}</span>
          </div>

          <button
            type="button"
            className="cart__order-btn"
            onClick={handlePlaceOrder}
          >
            Place Order
          </button>
        </aside>
      </div>

      <Link to="/" className="cart__continue">
    ← Continue Shopping
  </Link>
  
    </section>
  )
}

export default Cart