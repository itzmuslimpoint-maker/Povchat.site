import { Link } from 'react-router-dom'
import { Search, Bell, Menu, Plus } from 'lucide-react'
import { useChatStore } from '../store/chatStore'

export default function TopNav() {
  const { toggleSidebar } = useChatStore()

  return (
    <header className="fixed top-0 right-0 left-0 md:left-[280px] z-30 h-16 flex items-center justify-between px-4 md:px-6 glass border-b border-white/[0.07]">
      {/* Left */}
      <div className="flex items-center gap-3">
        <button
          onClick={toggleSidebar}
          className="md:hidden w-9 h-9 flex items-center justify-center rounded-xl hover:bg-white/5 text-white/60 hover:text-white transition-colors"
        >
          <Menu size={20} />
        </button>

        {/* Search */}
        <div className="hidden sm:flex items-center gap-2 bg-dark-200 rounded-xl px-4 py-2 border border-white/[0.07] w-64 lg:w-80 focus-within:border-accent-purple/40 transition-colors">
          <Search size={16} className="text-white/30" />
          <input
            type="text"
            placeholder="Search characters, chats..."
            className="bg-transparent text-sm text-white placeholder:text-white/30 outline-none w-full"
          />
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2">
        <Link
          to="/explore"
          className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-accent-purple/20 to-accent-blue/10 border border-accent-purple/30 text-sm font-medium text-white hover:border-accent-purple/50 transition-all"
        >
          <Plus size={15} />
          <span>New Chat</span>
        </Link>

        <button className="relative w-9 h-9 flex items-center justify-center rounded-xl hover:bg-white/5 text-white/60 hover:text-white transition-colors">
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-accent-pink rounded-full" />
        </button>

        <Link
          to="/dashboard"
          className="w-9 h-9 rounded-full bg-gradient-to-br from-accent-pink to-accent-purple flex items-center justify-center text-white font-bold text-sm"
        >
          A
        </Link>
      </div>
    </header>
  )
}
