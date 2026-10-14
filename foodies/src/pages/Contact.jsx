import { useState } from 'react'
import './Contact.css'

const initialForm = { name: '', email: '', phone: '', message: '' }

function Contact() {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: '' })) // clear error while typing
    setSubmitted(false)
  }

  const validate = () => {
    const newErrors = {}

    if (!form.name.trim()) newErrors.name = 'Name is required'

    if (!form.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      newErrors.email = 'Enter a valid email'
    }

    if (form.phone && !/^[6-9]\d{9}$/.test(form.phone)) {
      newErrors.phone = 'Enter a valid 10-digit mobile number'
    }

    if (!form.message.trim()) {
      newErrors.message = 'Message is required'
    } else if (form.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters'
    }

    return newErrors
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const newErrors = validate()
    setErrors(newErrors)
    if (Object.keys(newErrors).length > 0) return

    // Send `form` to your backend here, e.g.
    // await axios.post('/api/contact', form)

    setSubmitted(true)
    setForm(initialForm)
  }

  return (
    <section className="contact">
      <h1 className="contact__title">Contact Us</h1>
      <p className="contact__subtitle">
        Have a question about your order or feedback for us? We'd love to hear from you.
      </p>

      <div className="contact__layout">
        {/* Info */}
        <div className="contact__info">
          <div className="contact__info-item">
            <h3>📍 Address</h3>
            <p>123 Food Street, Nashik, Maharashtra 422001</p>
          </div>

          <div className="contact__info-item">
            <h3>📞 Phone</h3>
            <p>+91 98765 43210</p>
          </div>

          <div className="contact__info-item">
            <h3>✉️ Email</h3>
            <p>support@yourfoodapp.com</p>
          </div>

          <div className="contact__info-item">
            <h3>🕒 Working Hours</h3>
            <p>Mon – Sun: 9:00 AM – 11:00 PM</p>
          </div>
        </div>

        {/* Form */}
        <form className="contact__form" onSubmit={handleSubmit} noValidate>
          {submitted && (
            <p className="contact__success">
              ✅ Thanks! Your message has been sent. We'll get back to you soon.
            </p>
          )}

          <div className="contact__field">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Your name"
              value={form.name}
              onChange={handleChange}
            />
            {errors.name && <span className="contact__error">{errors.name}</span>}
          </div>

          <div className="contact__field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
            />
            {errors.email && <span className="contact__error">{errors.email}</span>}
          </div>

          <div className="contact__field">
            <label htmlFor="phone">Phone (optional)</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              placeholder="10-digit mobile number"
              maxLength={10}
              value={form.phone}
              onChange={handleChange}
            />
            {errors.phone && <span className="contact__error">{errors.phone}</span>}
          </div>

          <div className="contact__field">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              rows="5"
              placeholder="How can we help?"
              value={form.message}
              onChange={handleChange}
            />
            {errors.message && <span className="contact__error">{errors.message}</span>}
          </div>

          <button type="submit" className="contact__submit">
            Send Message
          </button>
        </form>
      </div>
    </section>
  )
}

export default Contact