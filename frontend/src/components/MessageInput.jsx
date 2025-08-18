import { useState } from 'react'
import { useMutation, gql } from '@apollo/client'
import { motion } from 'framer-motion'

const SEND_MESSAGE_MUTATION = gql`
  mutation SendMessage($chat_id: uuid!, $content: String!) {
    insert_messages_one(object: { chat_id: $chat_id, sender: "user", content: $content }) {
      id
      sender
      content
      created_at
    }
  }
`

const SEND_BOT_MESSAGE_MUTATION = gql`
  mutation SendBotMessage($chat_id: uuid!, $content: String!) {
    insert_messages_one(object: { chat_id: $chat_id, sender: "bot", content: $content }) {
      id
      sender
      content
      created_at
    }
  }
`

export default function MessageInput({ chatId, isDark, onMessageSent }) {
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  
  const [sendMessage] = useMutation(SEND_MESSAGE_MUTATION)
  const [sendBotMessage] = useMutation(SEND_BOT_MESSAGE_MUTATION)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!message.trim() || isLoading) return

    const messageContent = message.trim()
    setMessage('')
    setIsLoading(true)

    try {
      // Send user message
      await sendMessage({
        variables: {
          chat_id: chatId,
          content: messageContent
        }
      })

      // Get bot response and send it
      if (onMessageSent) {
        const botResponse = await onMessageSent(messageContent)
        await sendBotMessage({
          variables: {
            chat_id: chatId,
            content: botResponse
          }
        })
      }
    } catch (error) {
      console.error('Error sending message:', error)
      // Restore message on error
      setMessage(messageContent)
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  return (
    <div className={`border-t p-4 ${
      isDark 
        ? 'bg-gray-900 border-gray-700' 
        : 'bg-white border-gray-200'
    }`}>
      <form onSubmit={handleSubmit} className="flex space-x-3">
        <div className="flex-1 relative">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            disabled={isLoading}
            rows={1}
            className={`w-full px-4 py-3 rounded-2xl resize-none transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 ${
              isDark
                ? 'bg-gray-800 border border-gray-600 text-white placeholder-gray-400 focus:border-blue-500'
                : 'bg-gray-100 border border-gray-300 text-gray-900 placeholder-gray-500 focus:bg-white focus:border-blue-500'
            }`}
            style={{
              minHeight: '48px',
              maxHeight: '120px',
              height: 'auto'
            }}
            onInput={(e) => {
              e.target.style.height = 'auto'
              e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px'
            }}
          />
        </div>
        
        <motion.button
          type="submit"
          disabled={!message.trim() || isLoading}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`px-6 py-3 rounded-2xl font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 ${
            !message.trim() || isLoading
              ? isDark
                ? 'bg-gray-700 text-gray-400'
                : 'bg-gray-200 text-gray-400'
              : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl'
          }`}
        >
          {isLoading ? (
            <>
              <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Sending...</span>
            </>
          ) : (
            <>
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
              <span>Send</span>
            </>
          )}
        </motion.button>
      </form>
    </div>
  )
}