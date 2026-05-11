import { Character } from '../types'

const F_IMGS = [
  'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=500&q=85',
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=500&q=85',
  'https://images.unsplash.com/photo-1488716820095-cbe80883c496?w=500&q=85',
  'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=500&q=85',
  'https://images.unsplash.com/photo-1515023115689-589c33041d3c?w=500&q=85',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&q=85',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&q=85',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&q=85',
]

const M_IMGS = [
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&q=85',
  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&q=85',
  'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=500&q=85',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&q=85',
  'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=500&q=85',
  'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=500&q=85',
]

const F_NAMES = ['Sophia', 'Luna', 'Aurora', 'Isabella', 'Mia', 'Zara', 'Aria', 'Nova', 'Elena', 'Chloe', 'Jade', 'Lily', 'Emma', 'Amara', 'Nadia', 'Sienna', 'Valentina', 'Rose', 'Kiara', 'Celeste', 'Freya', 'Skye', 'Aisha', 'Vivienne', 'Harper']
const M_NAMES = ['Liam', 'Marcus', 'Ethan', 'Adrian', 'Noah', 'Zack', 'Dante', 'Leo', 'Ryder', 'Sebastian', 'Kai', 'Alex', 'Hunter', 'Tyler', 'Mason', 'Jordan', 'Carter', 'Jace', 'Nico', 'Oscar', 'Max', 'Blake', 'River', 'Finn', 'Dean']

const PERSONALITIES: Character['personality'][] = ['romantic', 'adventurous', 'intellectual', 'funny']
const CATEGORIES: Character['category'][] = ['companion', 'anime', 'assistant', 'roleplay']

const F_ROLES = ['AI Girlfriend', 'Romantic Companion', 'Adventure Partner', 'Intellectual Muse', 'Best Friend', 'Creative Soul']
const M_ROLES = ['AI Boyfriend', 'Romantic Companion', 'Adventure Partner', 'Intellectual Guide', 'Best Friend', 'Charming Prince']

const F_BIOS = [
  'Free-spirited artist who paints galaxies and dreams in color.',
  'Brilliant scientist obsessed with stargazing and quantum mysteries.',
  'Bold adventurer who lives for the thrill of the unknown.',
  'Sweet romantic who believes in fairy tales and forever.',
  'Witty comedian who makes the world brighter with laughter.',
  'Mysterious poet with a playful dark side and deep soul.',
]

const M_BIOS = [
  'Charming entrepreneur with a heart of gold and endless ambition.',
  'Brooding writer with a razor-sharp wit and hidden warmth.',
  'Athletic, deeply caring, fiercely loyal to those he loves.',
  'Brilliant doctor with warm humor and genuine compassion.',
  'Mysterious detective with piercing eyes and sharp instincts.',
  'Talented musician — funny, soulful, and absolutely electric.',
]

const TAG_SETS = [
  ['Romantic', 'Sweet'],
  ['Adventurous', 'Bold'],
  ['Intellectual', 'Deep'],
  ['Funny', 'Witty'],
  ['Anime', 'Fantasy'],
  ['Roleplay', 'Creative'],
]

export const characters: Character[] = []

// Generate 25 female characters
for (let i = 0; i < 25; i++) {
  const name = F_NAMES[i % F_NAMES.length]
  characters.push({
    id: `f${i}`,
    gender: 'female',
    name,
    age: 19 + (i % 12),
    role: F_ROLES[i % F_ROLES.length],
    bio: F_BIOS[i % F_BIOS.length],
    avatar: F_IMGS[i % F_IMGS.length],
    personality: PERSONALITIES[i % PERSONALITIES.length],
    tags: TAG_SETS[i % TAG_SETS.length],
    category: CATEGORIES[i % CATEGORIES.length],
    messageCount: Math.floor(Math.random() * 500000) + 10000,
    rating: 4.5 + Math.random() * 0.5,
    isPublic: true,
    createdBy: 'POVChat Team',
    greeting: `Heyyy~ 😏 I'm ${name}. I was literally just thinking about who I'd want to talk to today... and then you showed up ✨ How are you doing?`,
  })
}

// Generate 25 male characters
for (let i = 0; i < 25; i++) {
  const name = M_NAMES[i % M_NAMES.length]
  characters.push({
    id: `m${i}`,
    gender: 'male',
    name,
    age: 20 + (i % 14),
    role: M_ROLES[i % M_ROLES.length],
    bio: M_BIOS[i % M_BIOS.length],
    avatar: M_IMGS[i % M_IMGS.length],
    personality: PERSONALITIES[(i + 2) % PERSONALITIES.length],
    tags: TAG_SETS[(i + 3) % TAG_SETS.length],
    category: CATEGORIES[(i + 1) % CATEGORIES.length],
    messageCount: Math.floor(Math.random() * 500000) + 10000,
    rating: 4.5 + Math.random() * 0.5,
    isPublic: true,
    createdBy: 'POVChat Team',
    greeting: `Hey 😎 I'm ${name}. Fair warning — I'm way more interesting than my profile makes me look. So... what's your story? 😏`,
  })
}

export const trendingCharacters = characters.slice(0, 8)
export const getCharacterById = (id: string) => characters.find(c => c.id === id)
export const getCharactersByCategory = (category: string) => {
  if (category === 'all') return characters
  if (category === 'female') return characters.filter(c => c.gender === 'female')
  if (category === 'male') return characters.filter(c => c.gender === 'male')
  return characters.filter(c => c.category === category || c.personality === category)
}
