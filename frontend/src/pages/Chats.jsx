import Navbar from '../components/Navbar'

export default function Chats() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 min-h-[600px]">
          {/* Header */}
          <div className="p-6 border-b border-slate-200 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-2xl">
            <div className="flex items-center">
              <div className="h-12 w-12 bg-blue-600 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">ChatBot Assistant</h1>
                <p className="text-slate-600">Your AI-powered conversation partner</p>
              </div>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="p-8 flex-1 flex items-center justify-center">
            <div className="text-center max-w-md">
              <div className="mx-auto h-20 w-20 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <svg className="h-10 w-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                </svg>
              </div>
              
              <h3 className="text-xl font-semibold text-slate-900 mb-3">
                Ready to Chat!
              </h3>
              <p className="text-slate-600 mb-8 leading-relaxed">
                You're successfully authenticated and ready to start conversations. 
                This is where your chat interface will be implemented using Nhost's GraphQL API.
              </p>
              
              <div className="space-y-3">
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-lg hover:shadow-xl">
                  Start New Conversation
                </button>
                <button className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-3 px-6 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2">
                  View Chat History
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}