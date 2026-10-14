import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import './Menubar.css'

import { assests } from '../../assets/assests'

const DEFAULT_ITEMS = [
  { label: 'Home', to: '/' },
  { label: 'Explore', to: '/explore' },
  { label: 'Contact', to: '/contact' },
]

function Menubar({ brand = 'MyApp', items = DEFAULT_ITEMS, cartCount = 0 }) {
  const [open, setOpen] = useState(false)
  const closeMenu = () => setOpen(false) // close the mobile menu after a click

  return (
    <header className="menubar">
      <Link to="/" className="menubar__brand">
        <img src={assests.logo} alt={brand} className="menubar__logo" />
      </Link>

      <nav
        id="menubar-links"
        className={`menubar__links ${open ? 'is-open' : ''}`}
      >
        {items.map((item) => (
          <NavLink
            key={item.label}
            to={item.to}
            end={item.to === '/'} // so Home isn't "active" on every page
            className={({ isActive }) =>
              `menubar__link ${isActive ? 'is-active' : ''}`
            }
            onClick={closeMenu}
          >
            {item.label}
          </NavLink>
        ))}

        {/* Login / Register inside the dropdown (mobile only) */}
        <div className="menubar__auth menubar__auth--mobile">
          <Link to="/login" className="menubar__btn menubar__btn--ghost" onClick={closeMenu}>
            Login
          </Link>
          <Link to="/register" className="menubar__btn menubar__btn--solid" onClick={closeMenu}>
            Register
          </Link>
        </div>
      </nav>

      <div className="menubar__actions">
        <Link to="/cart" className="menubar__cart" aria-label={`Cart, ${cartCount} items`}>
          <img src={assests.cart} alt="" className="menubar__cart-icon" />
          {cartCount > 0 && <span className="menubar__badge">{cartCount}</span>}
        </Link>

        {/* Login / Register in the bar (desktop only) */}
        <div className="menubar__auth menubar__auth--desktop">
          <Link to="/login" className="menubar__btn menubar__btn--ghost">
            Login
          </Link>
          <Link to="/register" className="menubar__btn menubar__btn--solid">
            Register
          </Link>
        </div>

        <button
          className="menubar__toggle"
          aria-label="Toggle menu"
          aria-expanded={open}
          aria-controls="menubar-links"
          onClick={() => setOpen((prev) => !prev)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  )
}

export default Menubar