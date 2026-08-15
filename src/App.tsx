import { useState } from 'react'
import Login from './pages/Login'
import ConversationsList from './pages/ConversationsList'
import KnowledgeBase from './pages/KnowledgeBase'
import BusinessSettings from './pages/BusinessSettings'
import Register from './pages/Register'
import './App.css'
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [conversations, setConversations] = useState<{ id: string }[]>([])
  const [businessId, setBusinessId] = useState<string>('')
  const [showRegister, setShowRegister] = useState<boolean>(false)
  function handleLoginSuccess(
    conversationsFromLogin: { id: string }[],
    businessIdFromLogin: string,
  ) {
    setConversations(conversationsFromLogin)
    setIsLoggedIn(true)
    setBusinessId(businessIdFromLogin)
  }
  return (
    <div className="container">
      {isLoggedIn ? (
        <>
          <ConversationsList conversations={conversations} />
          <KnowledgeBase businessId={businessId} />
          <BusinessSettings businessId={businessId} />
        </>
      ) : showRegister ? (
        <Register onRegisterSuccess={() => setShowRegister(false)} />
      ) : (
        <Login
          onLoginSuccess={handleLoginSuccess}
          onShowRegister={() => setShowRegister(true)}
        />
      )}
    </div>
  )
}

export default App
