import { useSignOut, useUserData } from '@nhost/react'
import { useNavigate } from 'react-router-dom'

export default function Navbar({ isDark }) {
  const { signOut } = useSignOut()
  const user = useUserData()
  const navigate = useNavigate()

  const handleSignOut = async () => {
    await signOut()
    navigate('/login')
  }

  return (
    <nav className={`shadow-sm border-b transition-colors duration-200 ${
      isDark 
        ? 'bg-gray-900 border-gray-700' 
        : 'bg-white border-slate-200'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <div className="flex items-center">
            <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3 shadow-lg">
              <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h1 className={`text-xl font-bold ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}>ChatBot</h1>
          </div>
          
          {/* User Info & Actions */}
          <div className="flex items-center space-x-4">
            <div className="hidden sm:block">
              <span className={`text-sm ${
                isDark ? 'text-gray-400' : 'text-slate-600'
              }`}>
                Welcome, <span className={`font-medium ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}>{user?.email}</span>
              </span>
            </div>
            <button
              onClick={handleSignOut}
              className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                isDark
                  ? 'bg-gray-700 hover:bg-gray-600 focus:ring-gray-500'
                  : 'bg-slate-600 hover:bg-slate-700 focus:ring-slate-500'
              }`}
            >
              <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

// import { useSignOut, useUserData } from '@nhost/react'
// import { useNavigate } from 'react-router-dom'

// export default function Navbar() {
//   const { signOut } = useSignOut()
//   const user = useUserData()
//   const navigate = useNavigate()

//   const handleSignOut = async () => {
//     await signOut()
//     navigate('/login')
//   }

//   return (
//     <nav className="bg-white shadow-sm border-b border-slate-200">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16">
//           {/* Logo/Brand */}
//           <div className="flex items-center">
//             <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
//               <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
//               </svg>
//             </div>
//             <h1 className="text-xl font-bold text-slate-900">ChatBot</h1>
//           </div>
          
//           {/* User Info & Actions */}
//           <div className="flex items-center space-x-4">
//             <div className="hidden sm:block">
//               <span className="text-sm text-slate-600">
//                 Welcome, <span className="font-medium text-slate-900">{user?.email}</span>
//               </span>
//             </div>
//             <button
//               onClick={handleSignOut}
//               className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-slate-600 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 transition-all duration-200 shadow-sm hover:shadow-md"
//             >
//               <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
//               </svg>
//               Sign Out
//             </button>
//           </div>
//         </div>
//       </div>
//     </nav>
//   )
// }