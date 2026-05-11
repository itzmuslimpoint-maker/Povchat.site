import { NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Home,
  Compass,
  MessageCircle,
  User,
  Settings,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  X,
} from 'lucide-react'
import { useChatStore } from '../store/chatStore'
import { mockChatHistory } from '../data/mockData'

const navItems = [
  { path: '/', icon: Home, label: 'Home' },
  { path: '/explore', icon: Compass, label: 'Explore' },
  { path: '/dashboard', icon: User, label: 'Dashboard' },
]

export default function Sidebar() {
  const { sidebarOpen, toggleSidebar, setSidebarOpen } = useChatStore()
  const location = useLocation()
  const isChatPage = location.pathname.startsWith('/chat/')

  if (isChatPage) return null

  return (
    <>
      {/* Mobile overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-40 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full z-50 flex flex-col transition-all duration-300 border-r border-white/[0.07] bg-dark-100
          ${sidebarOpen ? 'w-[280px]' : 'w-[72px]'}
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-5 h-16 border-b border-white/[0.07]">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-accent-pink via-accent-purple to-accent-blue flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            {sidebarOpen && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="font-display text-xl font-bold gradient-text"
              >
                POVChat
              </motion.span>
            )}
          </div>
          <button
            onClick={toggleSidebar}
            className="hidden md:flex w-7 h-7 items-center justify-center rounded-lg hover:bg-white/5 text-white/40 hover:text-white transition-colors"
          >
            {sidebarOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
          </button>
          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden w-7 h-7 flex items-center justify-center rounded-lg hover:bg-white/5 text-white/40 hover:text-white"
          >
            <X size={16} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => window.innerWidth < 768 && setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group ${
                  isActive
                    ? 'bg-gradient-to-r from-accent-purple/20 to-accent-blue/10 text-white'
                    : 'text-white/50 hover:text-white hover:bg-white/5'
                }`
              }
            >
              <item.icon
                size={20}
                className="flex-shrink-0 group-hover:scale-110 transition-transform"
              />
              {sidebarOpen && <span className="text-sm font-medium">{item.label}</span>}
            </NavLink>
          ))}

          {/* Recent Chats */}
          {sidebarOpen && (
            <div className="mt-6">
              <h3 className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-white/30">
                Recent Chats
              </h3>
              <div className="space-y-0.5">
                {mockChatHistory.slice(0, 5).map((chat) => (
                  <NavLink
                    key={chat.id}
                    to={`/chat/${chat.characterId}`}
                    onClick={() => window.innerWidth < 768 && setSidebarOpen(false)}
                    className="flex items-center gap-3 px-3 py-2 rounded-xl text-white/50 hover:text-white hover:bg-white/5 transition-all"
                  >
                    <div className="relative flex-shrink-0">
                      <img
                        src={chat.characterAvatar}
                        alt={chat.characterName}
                        className="w-8 h-8 rounded-full object-cover border border-white/10"
                      />
                      {chat.unread > 0 && (
                        <div className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-accent-pink rounded-full border-2 border-dark-100 flex items-center justify-center">
                          <span className="text-[8px] font-bold">{chat.unread}</span>
                        </div>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium truncate">{chat.characterName}</p>
                      <p className="text-xs text-white/30 truncate">{chat.lastMessage}</p>
                    </div>
                  </NavLink>
                ))}
              </div>
            </div>
          )}
        </nav>

        {/* Bottom */}
        <div className="px-3 py-4 border-t border-white/[0.07]">
          <NavLink
            to="/dashboard"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-white/50 hover:text-white hover:bg-white/5 transition-all"
          >
            <Settings size={20} className="flex-shrink-0" />
            {sidebarOpen && <span className="text-sm font-medium">Settings</span>}
          </NavLink>
          {sidebarOpen && (
            <div className="mt-3 mx-2 p-3 rounded-xl bg-gradient-to-r from-accent-purple/10 to-accent-blue/10 border border-accent-purple/20">
              <p className="text-xs font-semibold text-white/80">Upgrade to Pro</p>
              <p className="text-xs text-white/40 mt-0.5">Unlimited messages & characters</p>
              <button className="mt-2 w-full py-1.5 text-xs font-bold rounded-lg bg-gradient-to-r from-accent-pink to-accent-purple text-white">
                Upgrade
              </button>
            </div>
          )}
        </div>
      </aside>
    </>
  )
}
