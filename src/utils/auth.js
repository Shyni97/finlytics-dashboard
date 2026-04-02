const USERS_KEY = 'finance-auth-users'
const CURRENT_USER_KEY = 'finance-auth-current-user'
const DASHBOARD_STORE_KEY = 'finance-dashboard-store-v1'

const readJson = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

const writeJson = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value))
}

export const getUsers = () => readJson(USERS_KEY, [])

export const getCurrentUser = () => readJson(CURRENT_USER_KEY, null)

export const isAuthenticated = () => Boolean(getCurrentUser())

export const setCurrentUser = (user) => writeJson(CURRENT_USER_KEY, user)

export const signupUser = ({ name, email, password, role }) => {
  const normalizedEmail = email.trim().toLowerCase()
  const users = getUsers()

  const exists = users.some((user) => user.email === normalizedEmail)
  if (exists) {
    return { ok: false, message: 'An account with this email already exists.' }
  }

  const user = {
    id: crypto.randomUUID(),
    name: name.trim(),
    email: normalizedEmail,
    password,
    role,
  }

  const nextUsers = [...users, user]
  writeJson(USERS_KEY, nextUsers)

  return { ok: true, user }
}

export const loginUser = ({ email, password }) => {
  const normalizedEmail = email.trim().toLowerCase()
  const users = getUsers()

  const existing = users.find((user) => user.email === normalizedEmail && user.password === password)

  if (!existing) {
    return { ok: false, message: 'Invalid email or password.' }
  }

  setCurrentUser({
    id: existing.id,
    name: existing.name,
    email: existing.email,
    role: existing.role,
  })

  return { ok: true, user: existing }
}

export const logoutUser = () => {
  localStorage.removeItem(CURRENT_USER_KEY)
  localStorage.removeItem(DASHBOARD_STORE_KEY)
}
