import { Link } from 'react-router-dom'
import './Header.css'

function Header({
  title = 'Order your favourite food here',
  description = 'Browse the menu, add dishes to your cart and get them delivered to your door.',
  ctaLabel = 'Explore menu',
  ctaTo = '/explore',
  image, // optional background image URL
}) {
  // the image is passed to the CSS through a variable; without it the banner uses a solid colour
  const style = image ? { '--hero-image': `url(${image})` } : undefined

  return (
    <section className="hero" style={style} aria-labelledby="hero-title">
      <div className="hero__content">
        <h1 id="hero-title" className="hero__title">
          {title}
        </h1>
        <p className="hero__text">{description}</p>
        <Link to={ctaTo} className="hero__cta">
          {ctaLabel}
        </Link>
      </div>
    </section>
  )
}

export default Header