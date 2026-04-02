import { useMemo, useState } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { Eye, EyeOff } from 'lucide-react'
import Card from '../components/Card'
import Input from '../components/Input'
import Button from '../components/Button'
import { isAuthenticated, loginUser } from '../utils/auth'
import { useFinanceStore } from '../store/useFinanceStore'

function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const setRole = useFinanceStore((state) => state.setRole)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [keepSignedIn, setKeepSignedIn] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({})
  const [authError, setAuthError] = useState('')
  const signupSuccessMessage = location.state?.signupSuccess

  const isDisabled = useMemo(() => !email.trim() || !password.trim(), [email, password])

  if (isAuthenticated()) {
    return <Navigate to="/dashboard" replace />
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const nextErrors = {
      email: email.trim() ? '' : 'Email is required.',
      password: password.trim() ? '' : 'Password is required.',
    }

    setErrors(nextErrors)
    setAuthError('')

    if (nextErrors.email || nextErrors.password) {
      return
    }

    const result = loginUser({ email, password, keepSignedIn })

    if (!result.ok) {
      setAuthError(result.message)
      return
    }

    setRole(result.user.role)
    navigate('/dashboard')
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,rgba(8,145,178,0.18),transparent_40%),linear-gradient(180deg,#f8fafc_0%,#eef2ff_100%)] px-4 py-10 dark:bg-[radial-gradient(circle_at_top,rgba(8,145,178,0.28),transparent_35%),linear-gradient(180deg,#020617_0%,#0f172a_100%)]">
      <Card title="Welcome back" subtitle="Login to access your finance command center.">
        <form className="space-y-4" onSubmit={handleSubmit}>
          {signupSuccessMessage ? (
            <p className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300">
              {signupSuccessMessage}
            </p>
          ) : null}

          <Input
            label="Email"
            type="email"
            placeholder="you@company.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            error={errors.email}
          />

          <Input
            label="Password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter your password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            error={errors.password}
            rightSlot={
              <button
                type="button"
                className="rounded-md p-1 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label="Toggle password visibility"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            }
          />

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
              <input
                type="checkbox"
                checked={keepSignedIn}
                onChange={(event) => setKeepSignedIn(event.target.checked)}
                className="h-4 w-4 rounded border-slate-300 text-cyan-600 focus:ring-cyan-500"
              />
              Keep me signed in
            </label>

            <a href="#" className="text-cyan-700 transition hover:text-cyan-600 dark:text-cyan-300">
              Forgot password?
            </a>
          </div>

          {authError ? <p className="text-sm text-rose-600">{authError}</p> : null}

          <Button type="submit" disabled={isDisabled}>
            Login
          </Button>

          <Button type="button" variant="secondary">
            Continue with Google
          </Button>

          <p className="text-center text-sm text-slate-500 dark:text-slate-400">
            New here?{' '}
            <Link to="/signup" className="font-semibold text-cyan-700 hover:text-cyan-600 dark:text-cyan-300">
              Create account
            </Link>
          </p>
        </form>
      </Card>
    </div>
  )
}

export default Login
