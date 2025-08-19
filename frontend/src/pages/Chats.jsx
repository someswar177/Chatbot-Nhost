import { useState } from 'react'
import { ApolloProvider } from '@apollo/client'
import { apolloClient } from '../lib/apollo'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import ChatWindow from '../components/ChatWindow'

export default function Chats() {
  const [selectedChatId, setSelectedChatId] = useState(null)
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false) // UPDATED: add mobile sidebar state
  const [isDarkMode, setIsDarkMode] = useState(false)

  const handleChatSelect = (chatId) => {
    setSelectedChatId(chatId)
  }

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed)
  }

  const toggleMobileSidebar = () => { // UPDATED: add mobile sidebar toggle
    setIsMobileSidebarOpen(!isMobileSidebarOpen)
  }

  const closeMobileSidebar = () => { // UPDATED: add mobile sidebar close
    setIsMobileSidebarOpen(false)
  }

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
  }

  return (
    <ApolloProvider client={apolloClient}>
      <div className={`min-h-screen font-sans antialiased ${isDarkMode ? 'dark' : ''}`}>
        <div className={`min-h-screen transition-colors duration-200 ${
          isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
        }`}>
          <Navbar 
            isDark={isDarkMode} 
            onToggleSidebar={toggleMobileSidebar} // UPDATED: pass mobile sidebar toggle
            showSidebarToggle={true} // UPDATED: show hamburger button
          />
          
          <div className="flex h-[calc(100vh-64px)]">
            <Sidebar
              selectedChatId={selectedChatId}
              onChatSelect={handleChatSelect}
              isCollapsed={isSidebarCollapsed}
              onToggleCollapse={toggleSidebar}
              isDark={isDarkMode}
              onToggleTheme={toggleTheme}
              isMobileOpen={isMobileSidebarOpen} // UPDATED: pass mobile sidebar state
              onMobileClose={closeMobileSidebar} // UPDATED: pass mobile sidebar close
            />
            
            <ChatWindow 
              chatId={selectedChatId} 
              isDark={isDarkMode}
            />
          </div>
        </div>
      </div>
    </ApolloProvider>
  )
}