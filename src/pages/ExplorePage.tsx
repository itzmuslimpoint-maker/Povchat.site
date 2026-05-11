import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Search, Filter, Sparkles, Users, Heart, Zap, Brain, Smile, Wand2 } from 'lucide-react'
import { characters, getCharactersByCategory } from '../data/characters'
import CharacterCard from '../components/ui/CharacterCard'
import { CardSkeleton } from '../components/ui/Skeleton'

const categories = [
  { id: 'all', label: 'All', icon: Sparkles, count: characters.length },
  { id: 'female', label: 'Girls', icon: Heart, count: characters.filter(c => c.gender === 'female').length },
  { id: 'male', label: 'Boys', icon: Users, count: characters.filter(c => c.gender === 'male').length },
  { id: 'romantic', label: 'Romantic', icon: Heart },
  { id: 'adventurous', label: 'Adventurous', icon: Zap },
  { id: 'intellectual', label: 'Intellectual', icon: Brain },
  { id: 'funny', label: 'Funny', icon: Smile },
  { id: 'anime', label: 'Anime', icon: Wand2 },
  { id: 'roleplay', label: 'Roleplay', icon: Sparkles },
]

export default function ExplorePage() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [visibleCount, setVisibleCount] = useState(12)

  const filteredCharacters = useMemo(() => {
    let chars = getCharactersByCategory(activeCategory)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      chars = chars.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.bio.toLowerCase().includes(q) ||
          c.role.toLowerCase().includes(q)
      )
    }
    return chars
  }, [activeCategory, searchQuery])

  const visibleCharacters = filteredCharacters.slice(0, visibleCount)
  const hasMore = visibleCount < filteredCharacters.length

  return (
    <div className="min-h-screen px-4 md:px-8 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-2 mb-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-pink/10 border border-accent-pink/25">
              <Sparkles size={12} className="text-accent-pink" />
              <span className="text-[10px] font-bold text-accent-pink uppercase tracking-wider">
                Explore
              </span>
            </div>
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-bold">
            Discover <span className="gradient-text">AI Characters</span>
          </h1>
          <p className="text-white/40 mt-2">
            Browse {characters.length}+ unique AI companions ready to chat
          </p>
        </motion.div>

        {/* Search */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 flex items-center gap-3 bg-dark-200 rounded-xl px-4 py-3 border border-white/[0.07] focus-within:border-accent-purple/40 transition-colors">
            <Search size={18} className="text-white/30 flex-shrink-0" />
            <input
              type="text"
              placeholder="Search by name, role, or personality..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value)
                setVisibleCount(12)
              }}
              className="bg-transparent text-sm text-white placeholder:text-white/30 outline-none w-full"
            />
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex gap-2 overflow-x-auto pb-4 no-scrollbar mb-8">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id)
                setVisibleCount(12)
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
                activeCategory === cat.id
                  ? 'bg-gradient-to-r from-accent-pink via-accent-purple to-accent-blue text-white shadow-lg shadow-accent-purple/20'
                  : 'bg-dark-200 border border-white/[0.07] text-white/50 hover:text-white hover:border-accent-purple/30'
              }`}
            >
              <cat.icon size={14} />
              {cat.label}
              {cat.count && (
                <span className="text-xs opacity-60">({cat.count})</span>
              )}
            </button>
          ))}
        </div>

        {/* Results count */}
        <p className="text-sm text-white/30 mb-6">
          Showing {visibleCharacters.length} of {filteredCharacters.length} characters
        </p>

        {/* Character Grid */}
        {filteredCharacters.length > 0 ? (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {visibleCharacters.map((char, i) => (
                <CharacterCard key={char.id} character={char} index={i} />
              ))}
            </div>

            {/* Load More */}
            {hasMore && (
              <div className="text-center mt-10">
                <button
                  onClick={() => setVisibleCount((prev) => prev + 12)}
                  className="px-8 py-3 rounded-full border border-accent-purple/30 text-accent-purple font-semibold hover:bg-accent-purple/10 hover:-translate-y-0.5 transition-all"
                >
                  Load More Characters ↓
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-20">
            <div className="text-4xl mb-4">🔍</div>
            <h3 className="font-display text-xl font-bold text-white/80 mb-2">No characters found</h3>
            <p className="text-white/40">Try adjusting your search or filter</p>
          </div>
        )}
      </div>
    </div>
  )
}
