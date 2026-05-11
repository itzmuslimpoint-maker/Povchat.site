import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  MessageCircle,
  Heart,
  Zap,
  TrendingUp,
  Crown,
  Calendar,
  Clock,
  Star,
  ArrowRight,
  Sparkles,
} from 'lucide-react'
import { mockUser, mockChatHistory, dashboardStats } from '../data/mockData'
import { getCharacterById } from '../data/characters'

export default function DashboardPage() {
  const stats = [
    {
      label: 'Total Chats',
      value: dashboardStats.totalChats,
      icon: MessageCircle,
      color: 'purple',
      change: '+12 this week',
    },
    {
      label: 'Messages Sent',
      value: dashboardStats.messagesThisWeek.toLocaleString(),
      icon: Zap,
      color: 'pink',
      change: '+340 today',
    },
    {
      label: 'Favorites',
      value: dashboardStats.favoriteCount,
      icon: Heart,
      color: 'blue',
      change: '4 new',
    },
    {
      label: 'Day Streak',
      value: dashboardStats.streakDays,
      icon: TrendingUp,
      color: 'gold',
      change: 'Personal best!',
    },
  ]

  return (
    <div className="min-h-screen px-4 md:px-8 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="font-display text-3xl font-bold">
                Welcome back, <span className="gradient-text">{mockUser.name.split(' ')[0]}</span>
              </h1>
              <p className="text-white/40 mt-1">Here's what's happening with your chats</p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-accent-gold/10 to-accent-gold/5 border border-accent-gold/25">
              <Crown size={14} className="text-accent-gold" />
              <span className="text-xs font-bold text-accent-gold uppercase">{mockUser.plan} Plan</span>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-5 hover:border-accent-purple/30 transition-all"
            >
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${
                  stat.color === 'purple'
                    ? 'bg-accent-purple/15'
                    : stat.color === 'pink'
                    ? 'bg-accent-pink/15'
                    : stat.color === 'blue'
                    ? 'bg-accent-blue/15'
                    : 'bg-accent-gold/15'
                }`}
              >
                <stat.icon
                  size={18}
                  className={
                    stat.color === 'purple'
                      ? 'text-accent-purple'
                      : stat.color === 'pink'
                      ? 'text-accent-pink'
                      : stat.color === 'blue'
                      ? 'text-accent-blue'
                      : 'text-accent-gold'
                  }
                />
              </div>
              <div className="font-display text-2xl font-bold">{stat.value}</div>
              <div className="text-xs text-white/40 mt-0.5">{stat.label}</div>
              <div className="text-[10px] text-accent-green mt-2 font-semibold">{stat.change}</div>
            </motion.div>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Recent Conversations */}
          <div className="md:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-lg font-bold">Recent Conversations</h2>
              <Link to="/explore" className="text-xs text-accent-purple font-semibold hover:underline flex items-center gap-1">
                View All <ArrowRight size={12} />
              </Link>
            </div>
            <div className="space-y-3">
              {mockChatHistory.map((chat, i) => (
                <motion.div
                  key={chat.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                >
                  <Link
                    to={`/chat/${chat.characterId}`}
                    className="flex items-center gap-4 p-4 glass-card hover:border-accent-purple/30 transition-all group"
                  >
                    <div className="relative flex-shrink-0">
                      <img
                        src={chat.characterAvatar}
                        alt={chat.characterName}
                        className="w-12 h-12 rounded-full object-cover border-2 border-white/10 group-hover:border-accent-purple/40 transition-colors"
                      />
                      <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-accent-green rounded-full border-2 border-dark-100" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-sm">{chat.characterName}</h3>
                        <span className="text-[10px] text-white/30">
                          {formatTime(chat.timestamp)}
                        </span>
                      </div>
                      <p className="text-sm text-white/40 truncate mt-0.5">{chat.lastMessage}</p>
                    </div>
                    {chat.unread > 0 && (
                      <div className="w-5 h-5 bg-accent-pink rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-[10px] font-bold">{chat.unread}</span>
                      </div>
                    )}
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Profile Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="glass-card p-6 text-center"
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent-pink via-accent-purple to-accent-blue flex items-center justify-center mx-auto mb-3">
                <span className="text-xl font-bold">{mockUser.name[0]}</span>
              </div>
              <h3 className="font-display font-bold">{mockUser.name}</h3>
              <p className="text-xs text-white/40 mt-0.5">{mockUser.email}</p>
              <div className="flex items-center justify-center gap-1 mt-2">
                <Calendar size={12} className="text-white/30" />
                <span className="text-xs text-white/30">
                  Joined {mockUser.joinedAt.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                </span>
              </div>
              <div className="mt-4 pt-4 border-t border-white/[0.07]">
                <div className="text-2xl font-display font-bold gradient-text">
                  {mockUser.messagesSent.toLocaleString()}
                </div>
                <div className="text-xs text-white/30">Total Messages</div>
              </div>
            </motion.div>

            {/* Upgrade Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="glass-card p-6 bg-gradient-to-br from-accent-purple/10 to-accent-blue/5 border-accent-purple/20"
            >
              <div className="flex items-center gap-2 mb-3">
                <Sparkles size={16} className="text-accent-gold" />
                <span className="text-sm font-bold">Upgrade to Premium</span>
              </div>
              <ul className="space-y-2 mb-4">
                {['Unlimited messages', 'Priority AI responses', 'Create custom characters', 'Voice messages'].map((f) => (
                  <li key={f} className="flex items-center gap-2 text-xs text-white/50">
                    <Star size={10} className="text-accent-gold" />
                    {f}
                  </li>
                ))}
              </ul>
              <button className="w-full btn-gradient py-2.5 text-sm">
                Upgrade Now
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

function formatTime(date: Date): string {
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const mins = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)

  if (mins < 1) return 'Just now'
  if (mins < 60) return `${mins}m ago`
  if (hours < 24) return `${hours}h ago`
  return `${days}d ago`
}
