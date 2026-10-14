import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { registerUser } from '../foodservice/authservice'
import './Register.css'

const initialForm = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
}

// 0 to 4, one point for each rule the password meets
const getStrength = (password) => {
  let score = 0
  if (password.length >= 8) score++
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++
  if (/\d/.test(password)) score++
  if (/[^A-Za-z0-9]/.test(password)) score++
  return score
}

const STRENGTH_LABELS = ['Too weak', 'Weak', 'Okay', 'Good', 'Strong']

function Register() {
  const navigate = useNavigate()

  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [serverError, setServerError] = useState('')
  const [success, setSuccess] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const strength = getStrength(form.password)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: '' })) // clear the error while typing
    setServerError('')
  }

  const validate = () => {
    const newErrors = {}

    if (!form.name.trim()) {
      newErrors.name = 'Full name is required'
    } else if (form.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters'
    }

    if (!form.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) {
      newErrors.email = 'Enter a valid email'
    }

    if (!form.password) {
      newErrors.password = 'Password is required'
    } else if (form.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters'
    } else if (!/[A-Za-z]/.test(form.password) || !/\d/.test(form.password)) {
      newErrors.password = 'Use at least one letter and one number'
    }

    if (!form.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password'
    } else if (form.confirmPassword !== form.password) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const newErrors = validate()
    setErrors(newErrors)
    if (Object.keys(newErrors).length > 0) return

    setLoading(true)
    setServerError('')

    try {
      await registerUser({
        name: form.name.trim(),
        email: form.email.trim().toLowerCase(),
        password: form.password,
      })

      setSuccess(true)
      setForm(initialForm)
      setTimeout(() => navigate('/login'), 1500)
    } catch (err) {
      if (!err.response) {
        setServerError('Cannot reach the server. Is the backend running?')
      } else {
        setServerError(
          err.response.data?.message ||
            'Registration failed. Please try again.'
        )
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="register">
      <form className="register__card" onSubmit={handleSubmit} noValidate>
        <h1 className="register__title">Create your account</h1>
        <p className="register__subtitle">
          Register to order your favourite food.
        </p>

        {success && (
          <p className="register__success">
            ✅ Account created! Taking you to login…
          </p>
        )}
        {serverError && (
          <p className="register__server-error">{serverError}</p>
        )}

        <div className="register__field">
          <label htmlFor="name">Full Name</label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Your name"
            value={form.name}
            onChange={handleChange}
          />
          {errors.name && <span className="register__error">{errors.name}</span>}
        </div>

        <div className="register__field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={handleChange}
          />
          {errors.email && (
            <span className="register__error">{errors.email}</span>
          )}
        </div>

        <div className="register__field">
          <label htmlFor="password">Password</label>
          <div className="register__password">
            <input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="new-password"
              placeholder="At least 8 characters"
              value={form.password}
              onChange={handleChange}
            />
            <button
              type="button"
              className="register__toggle"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>

          {form.password && (
            <div className="register__strength">
              <div className={`register__bars level-${strength}`}>
                <span />
                <span />
                <span />
                <span />
              </div>
              <small>{STRENGTH_LABELS[strength]}</small>
            </div>
          )}

          {errors.password && (
            <span className="register__error">{errors.password}</span>
          )}
        </div>

        <div className="register__field">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <div className="register__password">
            <input
              id="confirmPassword"
              name="confirmPassword"
              type={showPassword ? 'text' : 'password'}
              autoComplete="new-password"
              placeholder="Re-enter your password"
              value={form.confirmPassword}
              onChange={handleChange}
            />
            <button
              type="button"
              className="register__toggle"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
          {errors.confirmPassword && (
            <span className="register__error">{errors.confirmPassword}</span>
          )}
        </div>

        <button
          type="submit"
          className="register__submit"
          disabled={loading || success}
        >
          {loading ? 'Creating account…' : 'Register'}
        </button>

        <p className="register__footer">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </section>
  )
}

export default Register