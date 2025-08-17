import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthenticationStatus } from '@nhost/react'
import Login from './components/Login'
import Signup from './components/Signup'
import Chats from './pages/Chats'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  const { isAuthenticated, isLoading } = useAuthenticationStatus()

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path="/" 
          element={
            isAuthenticated ? (
              <Navigate to="/chats" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          } 
        />
        <Route 
          path="/login" 
          element={
            isAuthenticated ? (
              <Navigate to="/chats" replace />
            ) : (
              <Login />
            )
          } 
        />
        <Route 
          path="/signup" 
          element={
            isAuthenticated ? (
              <Navigate to="/chats" replace />
            ) : (
              <Signup />
            )
          } 
        />
        <Route 
          path="/chats" 
          element={
            <ProtectedRoute>
              <Chats />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App