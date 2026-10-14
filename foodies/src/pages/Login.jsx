import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Login.css'

function Login() {
  const navigate = useNavigate()

  const [form, setForm] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [serverError, setServerError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: '' })) // clear the error while typing
    setServerError('')
  }

  const validate = () => {
    const newErrors = {}

    if (!form.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) {
      newErrors.email = 'Enter a valid email'
    }

    if (!form.password) {
      newErrors.password = 'Password is required'
    } else if (form.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
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
      // TODO: replace this fake delay with your real login API call, e.g.
      // const res = await axios.post('/api/auth/login', {
      //   email: form.email.trim(),
      //   password: form.password,
      // })
      // save the token / user from `res.data` here
      await new Promise((resolve) => setTimeout(resolve, 800))

      navigate('/')
    } catch (err) {
      setServerError(
        err.response?.data?.message ||
          'Login failed. Please check your email and password.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="login">
      <form className="login__card" onSubmit={handleSubmit} noValidate>
        <h1 className="login__title">Welcome back</h1>
        <p className="login__subtitle">Login to order your favourite food.</p>

        {serverError && <p className="login__server-error">{serverError}</p>}

        <div className="login__field">
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
          {errors.email && <span className="login__error">{errors.email}</span>}
        </div>

        <div className="login__field">
          <label htmlFor="password">Password</label>
          <div className="login__password">
            <input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
            />
            <button
              type="button"
              className="login__toggle"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
          {errors.password && (
            <span className="login__error">{errors.password}</span>
          )}
        </div>

        <button type="submit" className="login__submit" disabled={loading}>
          {loading ? 'Logging in…' : 'Login'}
        </button>

        <p className="login__footer">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </form>
    </section>
  )
}

export default Login