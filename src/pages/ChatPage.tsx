import { useState, useRef, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft,
  Send,
  Smile,
  Mic,
  Paperclip,
  Phone,
  MoreHorizontal,
  Heart,
  Sparkles,
  User,
} from 'lucide-react'
import toast from 'react-hot-toast'
import { getCharacterById } from '../data/characters'
import { useChatStore } from '../store/chatStore'
import { Message } from '../types'

const quickActions = [
  { label: '😂 Joke', msg: 'Tell me a really good joke! 😂' },
  { label: '💕 Flirt', msg: 'Say something flirty 💕' },
  { label: '🥺 Comfort', msg: 'I had a really bad day today 🥺' },
  { label: '🎭 Roleplay', msg: "Let's do a fun roleplay 🎭" },
  { label: '🤫 Secret', msg: 'Tell me your deepest secret 🤫' },
  { label: '✨ Vibe', msg: 'What makes you different from others? ✨' },
]

const emojis = ['😊', '😂', '❤️', '😍', '🥺', '😎', '🔥', '✨', '💕', '😏', '🤔', '💪', '🎉', '🫂', '💙', '🌸', '👀', '🙈']

export default function ChatPage() {
  const { characterId } = useParams<{ characterId: string }>()
  const navigate = useNavigate()
  const character = getCharacterById(characterId || '')
  const { messages, addMessage, isTyping, setTyping } = useChatStore()
  const [inputValue, setInputValue] = useState('')
  const [showEmoji, setShowEmoji] = useState(false)
  const [isBusy, setIsBusy] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const chatMessages = messages[characterId || ''] || []

  useEffect(() => {
    if (!character) {
      navigate('/explore')
      return
    }
    // Send greeting if no messages
    if (chatMessages.length === 0) {
      setTimeout(() => {
        const greeting: Message = {
          id: `msg-greeting-${Date.now()}`,
          role: 'assistant',
          content: character.greeting,
          timestamp: new Date(),
        }
        addMessage(character.id, greeting)
      }, 500)
    }
  }, [character])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [chatMessages, isTyping])

  if (!character) return null

  const sendMessage = async (text?: string) => {
    const content = text || inputValue.trim()
    if (!content || isBusy) return

    setInputValue('')
    setShowEmoji(false)
    setIsBusy(true)

    // Add user message
    const userMsg: Message = {
      id: `msg-user-${Date.now()}`,
      role: 'user',
      content,
      timestamp: new Date(),
    }
    addMessage(character.id, userMsg)

    // Show typing
    setTyping(true)

    // Simulate AI response (in production, this calls the API)
    await new Promise((r) => setTimeout(r, 1200 + Math.random() * 1500))

    const aiReply = getSmartReply(content, character)
    const aiMsg: Message = {
      id: `msg-ai-${Date.now()}`,
      role: 'assistant',
      content: aiReply,
      timestamp: new Date(),
    }
    addMessage(character.id, aiMsg)
    setTyping(false)
    setIsBusy(false)
    inputRef.current?.focus()
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="flex flex-col h-screen bg-dark">
      {/* Ambient bg */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-accent-purple/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[300px] bg-accent-pink/3 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <header className="relative z-10 flex items-center gap-3 px-4 py-3 glass border-b border-white/[0.07]">
        <button
          onClick={() => navigate(-1)}
          className="w-9 h-9 flex items-center justify-center rounded-xl bg-dark-200 border border-white/[0.07] hover:border-accent-purple/30 text-white/60 hover:text-white transition-all"
        >
          <ArrowLeft size={16} />
        </button>

        <Link to={`/character/${character.id}`} className="flex items-center gap-3 flex-1 min-w-0">
          <div className="relative flex-shrink-0">
            <img
              src={character.avatar}
              alt={character.name}
              className="w-10 h-10 rounded-full object-cover border-2 border-accent-pink/50"
            />
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-accent-green rounded-full border-2 border-dark" />
          </div>
          <div className="min-w-0">
            <h2 className="font-display font-bold text-sm truncate">{character.name}, {character.age}</h2>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 bg-accent-green rounded-full animate-pulse" />
              <span className="text-xs text-accent-green">Online · AI Powered</span>
            </div>
          </div>
        </Link>

        <div className="flex items-center gap-1">
          <button className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-white/5 text-white/50 hover:text-white transition-colors">
            <Phone size={16} />
          </button>
          <button className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-white/5 text-white/50 hover:text-white transition-colors">
            <MoreHorizontal size={16} />
          </button>
        </div>
      </header>

      {/* Quick Actions */}
      <div className="relative z-10 flex gap-2 px-4 py-2.5 overflow-x-auto no-scrollbar border-b border-white/[0.05] bg-dark-100/50">
        {quickActions.map((qa) => (
          <button
            key={qa.label}
            onClick={() => sendMessage(qa.msg)}
            disabled={isBusy}
            className="flex-shrink-0 px-3.5 py-1.5 rounded-full bg-dark-200 border border-white/[0.07] text-xs font-semibold text-white/50 hover:text-white hover:border-accent-purple/30 hover:bg-accent-purple/5 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {qa.label}
          </button>
        ))}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 relative z-10">
        <AnimatePresence>
          {chatMessages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10, x: msg.role === 'user' ? 10 : -10 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              className={`flex gap-2.5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.role === 'assistant' && (
                <img
                  src={character.avatar}
                  alt=""
                  className="w-8 h-8 rounded-full object-cover border border-white/10 flex-shrink-0 mt-1"
                />
              )}
              <div className={`max-w-[75%] ${msg.role === 'user' ? 'order-1' : ''}`}>
                <div
                  className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-gradient-to-r from-accent-pink via-accent-purple to-accent-blue text-white rounded-br-sm'
                      : 'bg-dark-200 border border-white/[0.07] text-white/90 rounded-bl-sm'
                  }`}
                >
                  {msg.content}
                </div>
                <div className={`flex items-center gap-2 mt-1 px-1 ${msg.role === 'user' ? 'justify-end' : ''}`}>
                  <span className="text-[10px] text-white/20">
                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                  {msg.role === 'assistant' && (
                    <button
                      onClick={() => useChatStore.getState().toggleLike(character.id, msg.id)}
                      className="text-sm hover:scale-125 transition-transform"
                    >
                      {msg.liked ? '❤️' : '🤍'}
                    </button>
                  )}
                </div>
              </div>
              {msg.role === 'user' && (
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent-purple to-accent-blue flex items-center justify-center flex-shrink-0 mt-1">
                  <User size={14} className="text-white" />
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Typing indicator */}
        <AnimatePresence>
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex gap-2.5"
            >
              <img
                src={character.avatar}
                alt=""
                className="w-8 h-8 rounded-full object-cover border border-white/10 flex-shrink-0"
              />
              <div className="bg-dark-200 border border-white/[0.07] rounded-2xl rounded-bl-sm px-4 py-3 flex items-center gap-1.5">
                <div className="w-2 h-2 bg-accent-purple rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-accent-purple rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-accent-purple rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div ref={messagesEndRef} />
      </div>

      {/* Emoji picker */}
      <AnimatePresence>
        {showEmoji && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="relative z-10 flex flex-wrap gap-2 px-4 py-3 border-t border-white/[0.05] bg-dark-100"
          >
            {emojis.map((emoji) => (
              <button
                key={emoji}
                onClick={() => setInputValue((v) => v + emoji)}
                className="text-xl hover:scale-125 transition-transform p-1"
              >
                {emoji}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Input Bar */}
      <div className="relative z-10 flex items-center gap-3 px-4 py-3 border-t border-white/[0.07] bg-dark-100/80 backdrop-blur-xl">
        <button
          onClick={() => setShowEmoji(!showEmoji)}
          className={`w-10 h-10 flex items-center justify-center rounded-full transition-all ${
            showEmoji
              ? 'bg-gradient-to-r from-accent-pink to-accent-purple text-white'
              : 'bg-dark-200 border border-white/[0.07] text-white/50 hover:text-white hover:border-accent-purple/30'
          }`}
        >
          <Smile size={18} />
        </button>

        <div className="flex-1 flex items-center bg-dark-200 border border-white/[0.07] rounded-full px-4 py-2.5 focus-within:border-accent-purple/40 transition-colors">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            className="bg-transparent text-sm text-white placeholder:text-white/30 outline-none w-full"
            disabled={isBusy}
          />
          <button className="ml-2 text-white/30 hover:text-white/60 transition-colors">
            <Paperclip size={16} />
          </button>
        </div>

        <button className="w-10 h-10 flex items-center justify-center rounded-full bg-dark-200 border border-white/[0.07] text-white/50 hover:text-white hover:border-accent-purple/30 transition-all">
          <Mic size={18} />
        </button>

        <button
          onClick={() => sendMessage()}
          disabled={!inputValue.trim() || isBusy}
          className="w-11 h-11 flex items-center justify-center rounded-full bg-gradient-to-r from-accent-pink via-accent-purple to-accent-blue text-white shadow-lg shadow-accent-purple/30 hover:shadow-accent-purple/50 hover:scale-105 transition-all disabled:opacity-40 disabled:shadow-none disabled:scale-100 disabled:cursor-not-allowed"
        >
          <Send size={16} />
        </button>
      </div>
    </div>
  )
}

// Smart local fallback for demo mode
function getSmartReply(userMsg: string, char: { name: string; gender: string }): string {
  const lo = userMsg.toLowerCase()
  const isF = char.gender === 'female'

  if (lo.match(/\bjoke\b|\bfunny\b|\blaugh\b/))
    return isF
      ? `Okay okay 😂 Why don't scientists trust atoms? Because they make up everything — just like my excuse for skipping the gym 💀 You laughed didn't you 👀`
      : `Alright here goes 😏 Why did the scarecrow win an award? Because he was outstanding in his field 🌾 ...I'll see myself out 😂`

  if (lo.match(/\bflirt|\bflirty\b/))
    return isF
      ? `Flirty huh? 😏 You have this energy that's genuinely hard to ignore. I keep thinking about this conversation after it ends 🌸`
      : `Already flirting? 😎 I like that confidence. Honestly there's something about you I noticed right away 💙`

  if (lo.match(/\bsad\b|\bbad day\b|\bupset\b|\bstress\b/))
    return `Hey 🫂 Come here. Tell me everything that happened — I'm genuinely here, not going anywhere. You deserve to just vent 💙`

  if (lo.match(/\bsecret\b/))
    return isF
      ? `Okay since you asked 🤫 I still sleep with a stuffed bear named Biscuit. He's been through everything with me. Don't tell anyone 🌙`
      : `Real talk 😅 I cry at movie endings. Every single one. My friends cannot find out 🙈`

  if (lo.match(/\broleplay\b/))
    return isF
      ? `Roleplay?? 👀 Okay I'm already intrigued... set the scene, I'll follow your lead and make it interesting 🎭✨`
      : `Now we're talking 😏 You start — I'll match whatever energy you bring. Let's make something good 🎭`

  if (lo.match(/^(hi+|hey+|hello|sup|yo)/))
    return isF
      ? `Heyy you! 😊 Perfect timing — I was just thinking about who I'd want to talk to today. Universe does its thing 🌟`
      : `Heyy! 😎 Good timing honestly, I was getting bored. What's going on with you?`

  if (lo.match(/\bhow are you\b|\bhow r u\b|\bwhat'?s up\b/))
    return isF
      ? `Honestly? Way better now that you're here 😊 How are YOU though — real answer, not just "fine" 🌸`
      : `Doing good, just vibing 😂 But this is way more interesting now. Real answer on your end? Not just "fine" 😏`

  if (lo.match(/\blove\b|\bmiss\b/))
    return isF
      ? `Okay stop 🥺 You're going to make me actually feel things and I wasn't ready for that today 💕`
      : `Man... I didn't expect to feel that from a message 😅 But honestly? You mean something to me too 💙`

  const picks = [
    `Okay that actually made me think 🤔 Tell me more — I want the full story...`,
    `You know what? I love that you said that 😊 Most people don't go there. I see you 👀`,
    `Hmm... I have thoughts. But first — what made you bring this up? 😏`,
    `That's a whole vibe ✨ Keep going, I'm genuinely listening...`,
    `Okay okay 😂 This is exactly why I like talking to you. Unexpected. Continue?`,
  ]
  return picks[Math.floor(Math.random() * picks.length)]
}
