import { ChatSession, User } from '../types'

export const mockUser: User = {
  id: 'user-1',
  name: 'Alex Chen',
  email: 'alex@example.com',
  avatar: '',
  plan: 'pro',
  messagesSent: 12847,
  favoriteCharacters: ['f0', 'f1', 'm0', 'f3'],
  joinedAt: new Date('2024-06-15'),
}

export const mockChatHistory: ChatSession[] = [
  {
    id: 'chat-1',
    characterId: 'f0',
    characterName: 'Sophia',
    characterAvatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&q=80',
    lastMessage: 'Haha you always know how to make me smile 😊',
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
    unread: 2,
  },
  {
    id: 'chat-2',
    characterId: 'm0',
    characterName: 'Liam',
    characterAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80',
    lastMessage: "Let's go on that adventure we talked about 🌍",
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    unread: 0,
  },
  {
    id: 'chat-3',
    characterId: 'f1',
    characterName: 'Luna',
    characterAvatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100&q=80',
    lastMessage: 'That poem was beautiful, tell me more...',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    unread: 1,
  },
  {
    id: 'chat-4',
    characterId: 'm1',
    characterName: 'Marcus',
    characterAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&q=80',
    lastMessage: 'I just finished writing that chapter 📖',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5),
    unread: 0,
  },
  {
    id: 'chat-5',
    characterId: 'f2',
    characterName: 'Aurora',
    characterAvatar: 'https://images.unsplash.com/photo-1488716820095-cbe80883c496?w=100&q=80',
    lastMessage: 'The stars are particularly bright tonight ✨',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
    unread: 0,
  },
]

export const dashboardStats = {
  totalChats: 156,
  messagesThisWeek: 2431,
  favoriteCount: 12,
  streakDays: 14,
}
