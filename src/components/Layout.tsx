import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from './Sidebar'
import TopNav from './TopNav'
import { useChatStore } from '../store/chatStore'

export default function Layout() {
  const location = useLocation()
  const { sidebarOpen } = useChatStore()
  const isChatPage = location.pathname.startsWith('/chat/')

  return (
    <div className="flex h-screen overflow-hidden bg-dark">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div
        className={`flex flex-col flex-1 min-w-0 transition-all duration-300 ${
          sidebarOpen && !isChatPage ? 'md:ml-[280px]' : isChatPage ? 'ml-0' : 'md:ml-[72px]'
        }`}
      >
        {!isChatPage && <TopNav />}
        <main className={`flex-1 overflow-y-auto ${!isChatPage ? 'pt-16' : ''}`}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}
