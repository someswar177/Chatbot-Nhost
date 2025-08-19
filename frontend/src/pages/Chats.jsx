import { useState } from 'react'
import { ApolloProvider } from '@apollo/client'
import { apolloClient } from '../lib/apollo'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import ChatWindow from '../components/ChatWindow'

export default function Chats() {
  const [selectedChatId, setSelectedChatId] = useState(null)
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)

  const handleChatSelect = (chatId) => {
    setSelectedChatId(chatId)
  }

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed)
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
          <Navbar isDark={isDarkMode} />
          
          <div className="flex h-[calc(100vh-64px)]">
            <Sidebar
              selectedChatId={selectedChatId}
              onChatSelect={handleChatSelect}
              isCollapsed={isSidebarCollapsed}
              onToggleCollapse={toggleSidebar}
              isDark={isDarkMode}
              onToggleTheme={toggleTheme}
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