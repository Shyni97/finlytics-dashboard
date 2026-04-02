import { useMemo, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { Eye, EyeOff } from 'lucide-react'
import Card from '../components/Card'
import Input from '../components/Input'
import Button from '../components/Button'
import { isAuthenticated, signupUser } from '../utils/auth'

function Signup() {
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setSelectedRole] = useState('viewer')
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({})
  const [authError, setAuthError] = useState('')

  const isDisabled = useMemo(
    () => !name.trim() || !email.trim() || !password.trim() || !role,
    [name, email, password, role],
  )

  if (isAuthenticated()) {
    return <Navigate to="/dashboard" replace />
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const nextErrors = {
      name: name.trim() ? '' : 'Name is required.',
      email: email.trim() ? '' : 'Email is required.',
      password: password.trim() ? '' : 'Password is required.',
    }

    setErrors(nextErrors)
    setAuthError('')

    if (nextErrors.name || nextErrors.email || nextErrors.password) {
      return
    }

    const result = signupUser({ name, email, password, role })

    if (!result.ok) {
      setAuthError(result.message)
      return
    }

    navigate('/login', {
      replace: true,
      state: {
        signupSuccess: 'Account created successfully. Please login to continue.',
      },
    })
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,rgba(20,184,166,0.15),transparent_42%),linear-gradient(180deg,#f8fafc_0%,#ecfeff_100%)] px-4 py-10 dark:bg-[radial-gradient(circle_at_top,rgba(20,184,166,0.25),transparent_38%),linear-gradient(180deg,#020617_0%,#0f172a_100%)]">
      <Card title="Create account" subtitle="Start tracking and controlling your finances in one place.">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input
            label="Name"
            type="text"
            placeholder="Your full name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            error={errors.name}
          />

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
            placeholder="Create a secure password"
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

          <label className="block text-sm text-slate-600 dark:text-slate-300">
            <span className="mb-1 block font-medium">Role</span>
            <select
              value={role}
              onChange={(event) => setSelectedRole(event.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
            >
              <option value="viewer">Viewer</option>
              <option value="admin">Admin</option>
            </select>
          </label>

          {authError ? <p className="text-sm text-rose-600">{authError}</p> : null}

          <Button type="submit" disabled={isDisabled}>
            Signup
          </Button>

          <Button type="button" variant="secondary">
            Continue with Google
          </Button>

          <p className="text-center text-sm text-slate-500 dark:text-slate-400">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-cyan-700 hover:text-cyan-600 dark:text-cyan-300">
              Login
            </Link>
          </p>
        </form>
      </Card>
    </div>
  )
}

export default Signup
