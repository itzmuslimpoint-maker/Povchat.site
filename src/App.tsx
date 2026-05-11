import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AnimatePresence } from 'framer-motion'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import ExplorePage from './pages/ExplorePage'
import ChatPage from './pages/ChatPage'
import CharacterProfilePage from './pages/CharacterProfilePage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import DashboardPage from './pages/DashboardPage'

function App() {
  return (
    <>
      <Toaster
        position="bottom-center"
        toastOptions={{
          style: {
            background: 'linear-gradient(135deg, #ff4daa, #a855f7, #38bdf8)',
            color: '#fff',
            fontWeight: 600,
            borderRadius: '50px',
            padding: '12px 24px',
            boxShadow: '0 8px 30px rgba(168,85,247,0.4)',
          },
        }}
      />
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/explore" element={<ExplorePage />} />
            <Route path="/chat/:characterId" element={<ChatPage />} />
            <Route path="/character/:characterId" element={<CharacterProfilePage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
          </Route>
        </Routes>
      </AnimatePresence>
    </>
  )
}

export default App
