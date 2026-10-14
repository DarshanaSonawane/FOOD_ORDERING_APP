import { useContext } from 'react'
import { StoreContext } from '../context/StoreContext'

   import  './QuantityControl.css'
function QuantityControl({ foodId }) {
  const { cartItems, addToCart, decreaseQty } = useContext(StoreContext)
  const qty = cartItems[foodId] || 0

  if (qty === 0) {
    return (
      <button type="button" className="qty__add" onClick={() => addToCart(foodId)}>
        🛒 Add to Cart
      </button>
    )
  }

  return (
    <div className="qty">
      <button type="button" aria-label="Decrease quantity" onClick={() => decreaseQty(foodId)}>
        −
      </button>
      <span className="qty__count">{qty}</span>
      <button type="button" aria-label="Increase quantity" onClick={() => addToCart(foodId)}>
        +
      </button>
    </div>
  )
}

export default QuantityControl