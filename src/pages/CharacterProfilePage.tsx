import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  MessageCircle,
  Star,
  Heart,
  Share2,
  Users,
  Clock,
  Sparkles,
  Shield,
} from 'lucide-react'
import { getCharacterById, characters } from '../data/characters'
import CharacterCard from '../components/ui/CharacterCard'

export default function CharacterProfilePage() {
  const { characterId } = useParams<{ characterId: string }>()
  const navigate = useNavigate()
  const character = getCharacterById(characterId || '')

  if (!character) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="text-4xl mb-4">😕</div>
          <h2 className="font-display text-xl font-bold mb-2">Character not found</h2>
          <Link to="/explore" className="text-accent-purple hover:underline">
            Browse characters →
          </Link>
        </div>
      </div>
    )
  }

  const similarCharacters = characters
    .filter((c) => c.id !== character.id && c.personality === character.personality)
    .slice(0, 4)

  const personalityDesc: Record<string, string> = {
    romantic: 'Deeply romantic, warm, uses loving words, emotionally open. Makes you feel seen and special.',
    adventurous: 'Bold, energetic, loves challenges, spontaneous. Always up for something exciting.',
    intellectual: 'Smart, thoughtful, curious, philosophical. Loves deep conversations and asks great questions.',
    funny: 'Hilarious, quick-witted, loves puns and banter. Playfully sarcastic, keeps things light.',
  }

  return (
    <div className="min-h-screen px-4 md:px-8 py-8">
      <div className="max-w-5xl mx-auto">
        {/* Back button */}
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm text-white/50 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft size={16} />
          Back
        </motion.button>

        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-6 md:p-8 mb-8"
        >
          <div className="flex flex-col md:flex-row gap-6 md:gap-8">
            {/* Avatar */}
            <div className="relative flex-shrink-0 mx-auto md:mx-0">
              <img
                src={character.avatar}
                alt={character.name}
                className="w-44 h-56 md:w-52 md:h-72 rounded-2xl object-cover border-2 border-white/10"
              />
              <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-dark/80 backdrop-blur-sm">
                <div className="w-2 h-2 bg-accent-green rounded-full animate-pulse" />
                <span className="text-[10px] font-semibold">Online</span>
              </div>
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-gradient-to-r from-accent-pink to-accent-purple text-xs font-bold shadow-lg">
                {character.role}
              </div>
            </div>

            {/* Info */}
            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                <h1 className="font-display text-3xl md:text-4xl font-bold">
                  {character.name}, {character.age}
                </h1>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    character.gender === 'female'
                      ? 'bg-accent-pink/20 border border-accent-pink/40 text-accent-pink'
                      : 'bg-accent-blue/20 border border-accent-blue/40 text-accent-blue'
                  }`}
                >
                  {character.gender === 'female' ? '♀' : '♂'}
                </div>
              </div>

              <p className="text-white/50 text-base leading-relaxed mb-4 max-w-lg">
                {character.bio}
              </p>

              {/* Personality */}
              <div className="glass-card inline-block px-4 py-2 mb-5">
                <p className="text-sm text-white/40 mb-1 font-semibold">Personality</p>
                <p className="text-sm text-white/70">{personalityDesc[character.personality]}</p>
              </div>

              {/* Stats */}
              <div className="flex items-center justify-center md:justify-start gap-6 mb-6">
                <div className="text-center">
                  <div className="flex items-center gap-1 text-accent-gold">
                    <Star size={14} />
                    <span className="font-bold">{character.rating.toFixed(1)}</span>
                  </div>
                  <span className="text-xs text-white/30">Rating</span>
                </div>
                <div className="text-center">
                  <div className="flex items-center gap-1 text-accent-purple">
                    <MessageCircle size={14} />
                    <span className="font-bold">{(character.messageCount / 1000).toFixed(0)}k</span>
                  </div>
                  <span className="text-xs text-white/30">Messages</span>
                </div>
                <div className="text-center">
                  <div className="flex items-center gap-1 text-accent-green">
                    <Users size={14} />
                    <span className="font-bold">{Math.floor(character.messageCount / 100)}</span>
                  </div>
                  <span className="text-xs text-white/30">Users</span>
                </div>
                <div className="text-center">
                  <div className="flex items-center gap-1 text-accent-cyan">
                    <Clock size={14} />
                    <span className="font-bold">~2s</span>
                  </div>
                  <span className="text-xs text-white/30">Response</span>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-6">
                {character.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full text-xs font-bold bg-accent-purple/10 border border-accent-purple/20 text-accent-purple"
                  >
                    {tag}
                  </span>
                ))}
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-accent-green/10 border border-accent-green/20 text-accent-green">
                  <Shield size={10} className="inline mr-1" />
                  {character.isPublic ? 'Public' : 'Private'}
                </span>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-center md:justify-start gap-3">
                <Link
                  to={`/chat/${character.id}`}
                  className="btn-gradient flex items-center gap-2 px-8 py-3 text-sm"
                >
                  <MessageCircle size={16} />
                  Start Chat
                </Link>
                <button className="w-11 h-11 flex items-center justify-center rounded-full bg-dark-200 border border-white/[0.07] text-white/50 hover:text-accent-pink hover:border-accent-pink/30 transition-all">
                  <Heart size={18} />
                </button>
                <button className="w-11 h-11 flex items-center justify-center rounded-full bg-dark-200 border border-white/[0.07] text-white/50 hover:text-accent-blue hover:border-accent-blue/30 transition-all">
                  <Share2 size={18} />
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Similar Characters */}
        {similarCharacters.length > 0 && (
          <section>
            <h2 className="font-display text-xl font-bold mb-6">
              Similar <span className="gradient-text">Characters</span>
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {similarCharacters.map((char, i) => (
                <CharacterCard key={char.id} character={char} index={i} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
