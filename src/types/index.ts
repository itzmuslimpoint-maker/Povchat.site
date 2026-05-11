export interface Character {
  id: string
  name: string
  age: number
  gender: 'female' | 'male'
  role: string
  bio: string
  avatar: string
  personality: 'romantic' | 'adventurous' | 'intellectual' | 'funny'
  tags: string[]
  greeting: string
  category: 'anime' | 'assistant' | 'roleplay' | 'companion'
  messageCount: number
  rating: number
  isPublic: boolean
  createdBy: string
}

export interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  liked?: boolean
}

export interface ChatSession {
  id: string
  characterId: string
  characterName: string
  characterAvatar: string
  lastMessage: string
  timestamp: Date
  unread: number
}

export interface User {
  id: string
  name: string
  email: string
  avatar: string
  plan: 'free' | 'pro' | 'premium'
  messagesSent: number
  favoriteCharacters: string[]
  joinedAt: Date
}
