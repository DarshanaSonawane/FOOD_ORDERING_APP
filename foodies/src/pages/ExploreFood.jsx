import { categories } from '../assets/assests'
import './ExploreFood.css'

function ExploreFood({ category, setCategory }) {
  const handleSelect = (name) => {
    // click the selected category again to go back to all foods
    setCategory((prev) => (prev === name ? null : name))
  }

  return (
    <section className="explore">
      <h2 className="explore__title">Explore our menu</h2>
      <p className="explore__text">
        Pick a category to see its dishes. Click it again to see everything.
      </p>

      <div className="explore__categories">
        {categories.map((item) => (
          <button
            key={item.category}
            type="button"
            className={`explore__category ${category === item.category ? 'is-selected' : ''}`}
            aria-pressed={category === item.category}
            onClick={() => handleSelect(item.category)}
          >
            <img src={item.icon} alt={item.category} className="explore__image" />
            <span className="explore__label">{item.category}</span>
          </button>
        ))}
      </div>
    </section>
  )
}

export default ExploreFood