import { useState, useEffect } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { gql } from '@apollo/client'
import { motion, AnimatePresence } from 'framer-motion'

const MY_CHATS_QUERY = gql`
  query MyChats {
    chats(order_by: {created_at: desc}) {
      id
      title
      created_at
    }
  }
`

const NEW_CHAT_MUTATION = gql`
  mutation NewChat($title: String!) {
    insert_chats_one(object: { title: $title }) {
      id
      title
      created_at
    }
  }
`

export default function Sidebar({ selectedChatId, onChatSelect, isCollapsed, onToggleCollapse, isDark, onToggleTheme }) {
  const { data, loading, error, refetch } = useQuery(MY_CHATS_QUERY)
  const [newChat] = useMutation(NEW_CHAT_MUTATION, {
    refetchQueries: [{ query: MY_CHATS_QUERY }]
  })

  const handleNewChat = async () => {
    try {
      const result = await newChat({
        variables: { title: 'New Chat' }
      })
      if (result.data?.insert_chats_one) {
        onChatSelect(result.data.insert_chats_one.id)
      }
    } catch (err) {
      console.error('Error creating new chat:', err)
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now - date)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays === 1) return 'Today'
    if (diffDays === 2) return 'Yesterday'
    if (diffDays <= 7) return `${diffDays - 1} days ago`
    return date.toLocaleDateString()
  }

  return (
    <motion.div
      initial={false}
      animate={{ width: isCollapsed ? 60 : 280 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className={`h-full border-r transition-colors duration-200 flex flex-col ${
        isDark 
          ? 'bg-gray-900 border-gray-700' 
          : 'bg-white border-gray-200'
      }`}
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <AnimatePresence>
            {!isCollapsed && (
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={`text-lg font-semibold ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}
              >
                Chats
              </motion.h2>
            )}
          </AnimatePresence>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={onToggleTheme}
              className={`p-2 rounded-lg transition-colors ${
                isDark 
                  ? 'hover:bg-gray-800 text-gray-300' 
                  : 'hover:bg-gray-100 text-gray-600'
              }`}
            >
              {isDark ? (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
            
            <button
              onClick={onToggleCollapse}
              className={`p-2 rounded-lg transition-colors ${
                isDark 
                  ? 'hover:bg-gray-800 text-gray-300' 
                  : 'hover:bg-gray-100 text-gray-600'
              }`}
            >
              <svg 
                className={`w-4 h-4 transition-transform ${isCollapsed ? 'rotate-180' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          </div>
        </div>
        
        {/* New Chat Button */}
        <AnimatePresence>
          {!isCollapsed && (
            <motion.button
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              onClick={handleNewChat}
              className={`w-full mt-3 px-4 py-2 rounded-lg border-2 border-dashed transition-colors flex items-center justify-center space-x-2 ${
                isDark
                  ? 'border-gray-600 hover:border-gray-500 text-gray-300 hover:bg-gray-800'
                  : 'border-gray-300 hover:border-gray-400 text-gray-600 hover:bg-gray-50'
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span className="text-sm font-medium">New Chat</span>
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto">
        {loading && (
          <div className="p-4 text-center">
            <div className={`animate-spin rounded-full h-6 w-6 border-b-2 mx-auto ${
              isDark ? 'border-gray-400' : 'border-gray-600'
            }`}></div>
            <AnimatePresence>
              {!isCollapsed && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className={`text-sm mt-2 ${
                    isDark ? 'text-gray-400' : 'text-gray-500'
                  }`}
                >
                  Loading chats...
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        )}

        {error && (
          <div className="p-4">
            <AnimatePresence>
              {!isCollapsed && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-red-500 text-sm text-center"
                >
                  Error loading chats
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {data?.chats?.length === 0 && !loading && (
          <div className="p-4 text-center">
            <AnimatePresence>
              {!isCollapsed && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className={`text-sm ${
                    isDark ? 'text-gray-400' : 'text-gray-500'
                  }`}
                >
                  No chats yet. Create your first chat!
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        <div className="p-2">
          {data?.chats?.map((chat) => (
            <motion.button
              key={chat.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onChatSelect(chat.id)}
              className={`w-full p-3 rounded-lg mb-2 text-left transition-colors ${
                selectedChatId === chat.id
                  ? isDark
                    ? 'bg-blue-600 text-white'
                    : 'bg-blue-100 text-blue-900 border border-blue-200'
                  : isDark
                    ? 'hover:bg-gray-800 text-gray-300'
                    : 'hover:bg-gray-100 text-gray-700'
              }`}
            >
              <AnimatePresence>
                {!isCollapsed ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="font-medium text-sm truncate mb-1">
                      {chat.title}
                    </div>
                    <div className={`text-xs ${
                      selectedChatId === chat.id
                        ? isDark ? 'text-blue-200' : 'text-blue-600'
                        : isDark ? 'text-gray-500' : 'text-gray-500'
                    }`}>
                      {formatDate(chat.created_at)}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex justify-center"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  )
}