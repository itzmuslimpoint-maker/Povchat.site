import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Sparkles, MessageCircle, Users, Star, ArrowRight, Zap, Brain, Heart } from 'lucide-react'
import { trendingCharacters, characters } from '../data/characters'
import CharacterCard from '../components/ui/CharacterCard'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 md:px-8 pt-8 pb-16">
        {/* Background effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-to-b from-accent-purple/10 via-accent-pink/5 to-transparent rounded-full blur-3xl" />
          <div className="absolute top-40 -left-20 w-72 h-72 bg-accent-pink/5 rounded-full blur-3xl animate-float" />
          <div className="absolute top-60 -right-20 w-96 h-96 bg-accent-blue/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent-purple/10 border border-accent-purple/25 mb-6">
              <Sparkles size={14} className="text-accent-purple" />
              <span className="text-xs font-bold text-accent-purple uppercase tracking-wider">
                AI-Powered Companions
              </span>
            </div>

            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-black leading-tight mb-6">
              Chat with Your
              <br />
              <span className="gradient-text">Dream Character</span>
              <br />
              Anytime
            </h1>

            <p className="text-lg text-white/50 max-w-xl mx-auto mb-8 leading-relaxed">
              50+ stunning AI companions with real humor, emotion, and memory.
              Powered by next-generation AI for conversations that feel truly alive.
            </p>

            {/* Stats */}
            <div className="flex items-center justify-center gap-8 mb-8">
              <div className="text-center">
                <div className="font-display text-2xl md:text-3xl font-black gradient-text">50+</div>
                <div className="text-xs text-white/30 uppercase tracking-wide mt-1">Characters</div>
              </div>
              <div className="w-px h-10 bg-white/10" />
              <div className="text-center">
                <div className="font-display text-2xl md:text-3xl font-black gradient-text">10M+</div>
                <div className="text-xs text-white/30 uppercase tracking-wide mt-1">Messages</div>
              </div>
              <div className="w-px h-10 bg-white/10" />
              <div className="text-center">
                <div className="font-display text-2xl md:text-3xl font-black gradient-text">4.9★</div>
                <div className="text-xs text-white/30 uppercase tracking-wide mt-1">Rating</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <Link
                to="/explore"
                className="btn-gradient flex items-center gap-2 text-base px-8 py-4 font-bold"
              >
                <MessageCircle size={18} />
                Start Chatting Free
              </Link>
              <Link
                to="/explore"
                className="flex items-center gap-2 px-8 py-4 rounded-full border border-white/15 text-white/80 font-semibold hover:border-accent-purple/50 hover:text-white transition-all"
              >
                Explore Characters
                <ArrowRight size={16} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trending Characters */}
      <section className="px-4 md:px-8 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-display text-2xl md:text-3xl font-bold">
                Trending <span className="gradient-text">Characters</span>
              </h2>
              <p className="text-sm text-white/40 mt-1">Most popular this week</p>
            </div>
            <Link
              to="/explore"
              className="flex items-center gap-1 text-sm font-semibold text-accent-purple hover:text-accent-pink transition-colors"
            >
              View All <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
            {trendingCharacters.map((char, i) => (
              <CharacterCard key={char.id} character={char} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 md:px-8 py-16 bg-dark-100/50">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent-gold/10 border border-accent-gold/25 mb-4">
              <Zap size={14} className="text-accent-gold" />
              <span className="text-xs font-bold text-accent-gold uppercase tracking-wider">
                Next-Gen AI
              </span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold">
              Why <span className="gradient-text">POVChat</span> is Different
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Brain,
                title: 'Perfect Memory',
                desc: 'Remembers your name, past conversations, and inside jokes across sessions.',
                color: 'purple',
              },
              {
                icon: Heart,
                title: 'Emotional Intelligence',
                desc: 'Understands mood, tone, and context. Responds with genuine emotion.',
                color: 'pink',
              },
              {
                icon: Zap,
                title: 'Dual AI Engine',
                desc: 'Powered by DeepSeek + Grok for the perfect balance of wit and depth.',
                color: 'blue',
              },
            ].map((feat, i) => (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-6 hover:border-accent-purple/30 transition-all hover:-translate-y-1"
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                    feat.color === 'purple'
                      ? 'bg-accent-purple/15 border border-accent-purple/25'
                      : feat.color === 'pink'
                      ? 'bg-accent-pink/15 border border-accent-pink/25'
                      : 'bg-accent-blue/15 border border-accent-blue/25'
                  }`}
                >
                  <feat.icon
                    size={22}
                    className={
                      feat.color === 'purple'
                        ? 'text-accent-purple'
                        : feat.color === 'pink'
                        ? 'text-accent-pink'
                        : 'text-accent-blue'
                    }
                  />
                </div>
                <h3 className="font-display text-lg font-bold mb-2">{feat.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed">{feat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 md:px-8 py-20 text-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-accent-purple/10 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Your Perfect AI Companion
            <br />
            <span className="gradient-text">Is Waiting for You</span>
          </h2>
          <p className="text-white/40 mb-8 max-w-md mx-auto">
            Join thousands of users who found their perfect conversation partner.
          </p>
          <Link
            to="/explore"
            className="btn-gradient inline-flex items-center gap-2 text-base px-10 py-4 font-bold animate-glow"
          >
            <Sparkles size={18} />
            Start Chatting Free
          </Link>
        </div>
      </section>
    </div>
  )
}
