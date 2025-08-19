import { useSignOut, useUserData } from '@nhost/react'
import { useNavigate } from 'react-router-dom'

export default function Navbar({ isDark, onToggleSidebar, showSidebarToggle = false }) { // UPDATED: add sidebar toggle props
  const { signOut } = useSignOut()
  const user = useUserData()
  const navigate = useNavigate()

  const handleSignOut = async () => {
    await signOut()
    navigate('/login')
  }

  return (
    <nav className={`shadow-sm border-b transition-colors duration-200 font-sans antialiased ${
      isDark 
        ? 'bg-gray-900 border-gray-700' 
        : 'bg-white border-slate-200'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> {/* UPDATED: responsive padding */}
        <div className="flex justify-between items-center h-16">
          {/* Left side - Hamburger + Logo */} {/* UPDATED: add hamburger for mobile */}
          <div className="flex items-center">
            {/* Mobile Sidebar Toggle */}
            {showSidebarToggle && (
              <button
                onClick={onToggleSidebar}
                className={`mr-3 p-2 rounded-lg md:hidden transition-colors ${
                  isDark 
                    ? 'hover:bg-gray-800 text-gray-300' 
                    : 'hover:bg-gray-100 text-gray-600'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            )}
            <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3 shadow-lg">
              <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h1 className={`text-lg sm:text-xl font-bold ${  // UPDATED: responsive text size
              isDark ? 'text-white' : 'text-slate-900'
            }`}>ChatBot</h1>
          </div>
          
          {/* User Info & Actions */}
          <div className="flex items-center space-x-4">
            <div className="hidden sm:block"> {/* UPDATED: hide user email on very small screens */}
              <span className={`text-xs sm:text-sm ${ // UPDATED: responsive text size
                isDark ? 'text-gray-400' : 'text-slate-600'
              }`}>
                Welcome, <span className={`font-medium ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}>{user?.email}</span>
              </span>
            </div>
            <button
              onClick={handleSignOut}
              className={`inline-flex items-center px-3 sm:px-4 py-2 border border-transparent text-xs sm:text-sm font-medium rounded-lg text-white transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${ // UPDATED: responsive padding and text
                isDark
                  ? 'bg-gray-700 hover:bg-gray-600 focus:ring-gray-500'
                  : 'bg-slate-600 hover:bg-slate-700 focus:ring-slate-500'
              }`}
            >
              <svg className="h-4 w-4 mr-1 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"> {/* UPDATED: responsive margin */}
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span className="hidden sm:inline">Sign Out</span> {/* UPDATED: hide text on small screens */}
              <span className="sm:hidden">Exit</span> {/* UPDATED: short text for mobile */}
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}