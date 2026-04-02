import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import DashboardShell from './pages/DashboardShell'
import ProtectedRoute from './routes/ProtectedRoute'
import { isAuthenticated } from './utils/auth'

function App() {
  const authed = isAuthenticated()

  return (
    <Routes>
      <Route path="/" element={<Navigate to={authed ? '/dashboard' : '/login'} replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardShell />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to={authed ? '/dashboard' : '/login'} replace />} />
    </Routes>
  )
}

export default App
