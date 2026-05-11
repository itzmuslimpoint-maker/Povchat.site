import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MessageCircle, Star, Heart } from 'lucide-react'
import { Character } from '../../types'

interface Props {
  character: Character
  index?: number
}

export default function CharacterCard({ character, index = 0 }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      className="group"
    >
      <div className="glass-card overflow-hidden hover:border-accent-purple/30 transition-all duration-300 hover:shadow-lg hover:shadow-accent-purple/10 hover:-translate-y-1">
        {/* Image */}
        <Link to={`/character/${character.id}`} className="block relative">
          <div className="aspect-[3/4] overflow-hidden">
            <img
              src={character.avatar}
              alt={character.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/30 to-transparent" />

          {/* Online badge */}
          <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-dark/80 backdrop-blur-sm border border-white/10">
            <div className="w-2 h-2 bg-accent-green rounded-full animate-pulse" />
            <span className="text-[10px] font-semibold text-white/80">Online</span>
          </div>

          {/* Gender badge */}
          <div
            className={`absolute top-3 right-3 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border ${
              character.gender === 'female'
                ? 'bg-accent-pink/20 border-accent-pink/40 text-accent-pink'
                : 'bg-accent-blue/20 border-accent-blue/40 text-accent-blue'
            }`}
          >
            {character.gender === 'female' ? '♀' : '♂'}
          </div>

          {/* Name overlay */}
          <div className="absolute bottom-3 left-3 right-3">
            <h3 className="font-display text-lg font-bold text-white">
              {character.name}, {character.age}
            </h3>
            <p
              className={`text-xs font-semibold uppercase tracking-wide ${
                character.gender === 'female' ? 'text-accent-pink' : 'text-accent-blue'
              }`}
            >
              {character.role}
            </p>
          </div>
        </Link>

        {/* Body */}
        <div className="p-4">
          <p className="text-sm text-white/50 line-clamp-2 leading-relaxed mb-3">
            {character.bio}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            {character.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-accent-purple/10 border border-accent-purple/20 text-accent-purple"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Stats row */}
          <div className="flex items-center gap-3 mb-3 text-xs text-white/40">
            <div className="flex items-center gap-1">
              <MessageCircle size={12} />
              <span>{(character.messageCount / 1000).toFixed(0)}k</span>
            </div>
            <div className="flex items-center gap-1">
              <Star size={12} className="text-accent-gold" />
              <span>{character.rating.toFixed(1)}</span>
            </div>
          </div>

          {/* Chat button */}
          <Link
            to={`/chat/${character.id}`}
            className="flex items-center justify-center gap-2 w-full py-2.5 rounded-full bg-gradient-to-r from-accent-pink via-accent-purple to-accent-blue text-white text-sm font-bold shadow-lg shadow-accent-purple/20 hover:shadow-accent-purple/40 hover:-translate-y-0.5 transition-all duration-200"
          >
            <MessageCircle size={14} />
            Chat Now
          </Link>
        </div>
      </div>
    </motion.div>
  )
}
