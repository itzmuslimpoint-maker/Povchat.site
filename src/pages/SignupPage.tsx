import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Sparkles, Mail, Lock, User, Eye, EyeOff, ArrowRight, Check } from 'lucide-react'
import toast from 'react-hot-toast'

export default function SignupPage() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !email || !password) {
      toast.error('Please fill in all fields')
      return
    }
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters')
      return
    }
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1500))
    toast.success('Account created! Welcome to POVChat! 🎉')
    setLoading(false)
    navigate('/')
  }

  const features = [
    'Unlimited AI characters',
    'Real-time conversations',
    'Memory & personality system',
    'Completely free to start',
  ]

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-accent-blue/8 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-accent-purple/10 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[length:50px_50px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-pink via-accent-purple to-accent-blue flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="font-display text-2xl font-bold gradient-text">POVChat</span>
          </Link>
          <h1 className="font-display text-2xl font-bold mt-4">Create Your Account</h1>
          <p className="text-white/40 text-sm mt-1">Start chatting with AI characters for free</p>
        </div>

        {/* Form */}
        <div className="glass-card p-8">
          <form onSubmit={handleSignup} className="space-y-4">
            {/* Name */}
            <div>
              <label className="text-xs font-semibold text-white/50 uppercase tracking-wide mb-2 block">
                Full Name
              </label>
              <div className="flex items-center gap-3 bg-dark-300 rounded-xl px-4 py-3 border border-white/[0.07] focus-within:border-accent-purple/40 transition-colors">
                <User size={16} className="text-white/30" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="bg-transparent text-sm text-white placeholder:text-white/30 outline-none w-full"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="text-xs font-semibold text-white/50 uppercase tracking-wide mb-2 block">
                Email
              </label>
              <div className="flex items-center gap-3 bg-dark-300 rounded-xl px-4 py-3 border border-white/[0.07] focus-within:border-accent-purple/40 transition-colors">
                <Mail size={16} className="text-white/30" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="bg-transparent text-sm text-white placeholder:text-white/30 outline-none w-full"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="text-xs font-semibold text-white/50 uppercase tracking-wide mb-2 block">
                Password
              </label>
              <div className="flex items-center gap-3 bg-dark-300 rounded-xl px-4 py-3 border border-white/[0.07] focus-within:border-accent-purple/40 transition-colors">
                <Lock size={16} className="text-white/30" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimum 6 characters"
                  className="bg-transparent text-sm text-white placeholder:text-white/30 outline-none w-full"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-white/30 hover:text-white/60 transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Features checklist */}
            <div className="py-3 space-y-2">
              {features.map((feat) => (
                <div key={feat} className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-accent-green/20 flex items-center justify-center">
                    <Check size={10} className="text-accent-green" />
                  </div>
                  <span className="text-xs text-white/50">{feat}</span>
                </div>
              ))}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full btn-gradient flex items-center justify-center gap-2 py-3.5 text-sm disabled:opacity-60"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Create Free Account
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          <p className="text-center text-[10px] text-white/20 mt-4">
            By creating an account you agree to our Terms of Service & Privacy Policy
          </p>
        </div>

        {/* Login link */}
        <p className="text-center text-sm text-white/40 mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-accent-purple font-semibold hover:underline">
            Sign In
          </Link>
        </p>
      </motion.div>
    </div>
  )
}
