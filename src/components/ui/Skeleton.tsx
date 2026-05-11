import { motion } from 'framer-motion'

export function CardSkeleton() {
  return (
    <div className="glass-card overflow-hidden animate-pulse">
      <div className="aspect-[3/4] bg-dark-300" />
      <div className="p-4 space-y-3">
        <div className="h-3 bg-dark-300 rounded-full w-3/4" />
        <div className="h-3 bg-dark-300 rounded-full w-1/2" />
        <div className="flex gap-2">
          <div className="h-5 w-16 bg-dark-300 rounded-full" />
          <div className="h-5 w-16 bg-dark-300 rounded-full" />
        </div>
        <div className="h-10 bg-dark-300 rounded-full" />
      </div>
    </div>
  )
}

export function ChatSkeleton() {
  return (
    <div className="flex flex-col gap-4 p-4 animate-pulse">
      {[...Array(4)].map((_, i) => (
        <div key={i} className={`flex gap-3 ${i % 2 === 0 ? '' : 'justify-end'}`}>
          {i % 2 === 0 && <div className="w-8 h-8 rounded-full bg-dark-300 flex-shrink-0" />}
          <div className={`${i % 2 === 0 ? 'max-w-[70%]' : 'max-w-[60%]'}`}>
            <div className={`h-12 bg-dark-300 rounded-2xl ${i % 2 === 0 ? 'rounded-bl-sm' : 'rounded-br-sm'}`} />
          </div>
          {i % 2 !== 0 && <div className="w-8 h-8 rounded-full bg-dark-300 flex-shrink-0" />}
        </div>
      ))}
    </div>
  )
}

export function ProfileSkeleton() {
  return (
    <div className="max-w-4xl mx-auto p-6 animate-pulse">
      <div className="flex gap-6">
        <div className="w-48 h-64 bg-dark-300 rounded-2xl" />
        <div className="flex-1 space-y-4">
          <div className="h-8 bg-dark-300 rounded-full w-1/3" />
          <div className="h-4 bg-dark-300 rounded-full w-1/2" />
          <div className="h-20 bg-dark-300 rounded-xl" />
          <div className="h-12 bg-dark-300 rounded-full w-40" />
        </div>
      </div>
    </div>
  )
}
