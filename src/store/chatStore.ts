import { create } from 'zustand'
import { Message, ChatSession } from '../types'
import { mockChatHistory } from '../data/mockData'

interface ChatState {
  messages: Record<string, Message[]>
  chatHistory: ChatSession[]
  isTyping: boolean
  sidebarOpen: boolean
  addMessage: (characterId: string, message: Message) => void
  setTyping: (typing: boolean) => void
  toggleSidebar: () => void
  setSidebarOpen: (open: boolean) => void
  toggleLike: (characterId: string, messageId: string) => void
}

export const useChatStore = create<ChatState>((set) => ({
  messages: {},
  chatHistory: mockChatHistory,
  isTyping: false,
  sidebarOpen: true,

  addMessage: (characterId, message) =>
    set((state) => ({
      messages: {
        ...state.messages,
        [characterId]: [...(state.messages[characterId] || []), message],
      },
    })),

  setTyping: (typing) => set({ isTyping: typing }),

  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),

  setSidebarOpen: (open) => set({ sidebarOpen: open }),

  toggleLike: (characterId, messageId) =>
    set((state) => ({
      messages: {
        ...state.messages,
        [characterId]: (state.messages[characterId] || []).map((m) =>
          m.id === messageId ? { ...m, liked: !m.liked } : m
        ),
      },
    })),
}))
