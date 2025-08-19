// src/components/ChatWindow.jsx
import { useState, useEffect, useRef } from 'react'
import { useSubscription, gql } from '@apollo/client'
import { motion, AnimatePresence } from 'framer-motion'
import ReactMarkdown from 'react-markdown'
import MessageInput from './MessageInput'

const MESSAGES_SUBSCRIPTION = gql`
  subscription OnMessage($chat_id: uuid!) {
    messages(where: { chat_id: { _eq: $chat_id } }, order_by: { created_at: asc }) {
      id
      sender
      content
      created_at
    }
  }
`

export default function ChatWindow({ chatId, isDark }) {
  const messagesEndRef = useRef(null)
  const [isTyping, setIsTyping] = useState(false) // keep for future/n8n streaming indicators

  const { data, loading, error } = useSubscription(MESSAGES_SUBSCRIPTION, {
    variables: { chat_id: chatId },
    skip: !chatId
  })

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [data?.messages])

  const formatTime = (dateString) =>
    new Date(dateString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

  if (!chatId) {
    return (
      <div className={`flex-1 flex items-center justify-center ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-md mx-auto p-8">
          <div className={`mx-auto h-16 w-16 rounded-full flex items-center justify-center mb-4 ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}>
            <svg className={`h-8 w-8 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <h3 className={`text-xl font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>Select a chat to start messaging</h3>
          <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Choose a conversation from the sidebar or create a new one to begin chatting.</p>
        </motion.div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className={`flex-1 flex items-center justify-center ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
          <div className={`animate-spin rounded-full h-8 w-8 border-b-2 mx-auto mb-4 ${isDark ? 'border-gray-400' : 'border-gray-600'}`} />
          <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Loading messages...</p>
        </motion.div>
      </div>
    )
  }

  if (error) {
    return (
      <div className={`flex-1 flex items-center justify-center ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center text-red-500">
          <p>Error loading messages</p>
          <p className="text-sm mt-2">{error.message}</p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className={`flex-1 flex flex-col ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {data?.messages?.length === 0 ? (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-12">
              <div className={`mx-auto h-12 w-12 rounded-full flex items-center justify-center mb-4 ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}>
                <svg className={`h-6 w-6 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>No messages in this chat yet. Start the conversation!</p>
            </motion.div>
          ) : (
            data?.messages?.map((message, index) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={[
                    'px-4 py-2 rounded-2xl',
                    message.sender === 'user'
                      ? 'bg-blue-600 text-white rounded-br-md max-w-xs lg:max-w-md'
                      : isDark
                        ? 'bg-gray-700 text-gray-100 rounded-bl-md max-w-[80%] md:max-w-[70%]'
                        : 'bg-white text-gray-900 rounded-bl-md shadow-sm border border-gray-200 max-w-[80%] md:max-w-[70%]'
                  ].join(' ')}
                >
                  <div className="prose prose-sm max-w-none whitespace-pre-wrap">
                    <ReactMarkdown>{message.content}</ReactMarkdown>
                  </div>
                  <p
                    className={[
                      'text-xs mt-1',
                      message.sender === 'user' ? 'text-blue-100' : isDark ? 'text-gray-400' : 'text-gray-500'
                    ].join(' ')}
                  >
                    {formatTime(message.created_at)}
                  </p>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>

        {/* Typing indicator (kept for future streaming; currently off unless you toggle setIsTyping) */}
        <AnimatePresence>
          {isTyping && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="flex justify-start">
              <div
                className={`px-4 py-2 rounded-2xl rounded-bl-md ${
                  isDark ? 'bg-gray-700 text-gray-100 max-w-[80%] md:max-w-[70%]' : 'bg-white text-gray-900 shadow-sm border border-gray-200 max-w-[80%] md:max-w-[70%]'
                }`}
              >
                <div className="flex space-x-1">
                  <div className={`${isDark ? 'bg-gray-400' : 'bg-gray-500'} w-2 h-2 rounded-full animate-bounce`} style={{ animationDelay: '0ms' }} />
                  <div className={`${isDark ? 'bg-gray-400' : 'bg-gray-500'} w-2 h-2 rounded-full animate-bounce`} style={{ animationDelay: '150ms' }} />
                  <div className={`${isDark ? 'bg-gray-400' : 'bg-gray-500'} w-2 h-2 rounded-full animate-bounce`} style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div ref={messagesEndRef} />
      </div>

      {/* Input (kept exactly as your flow; no onMessageSent prop, no simulation) */}
      <MessageInput chatId={chatId} isDark={isDark} />
    </div>
  )
}
