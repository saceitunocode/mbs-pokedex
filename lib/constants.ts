export const TYPE_COLORS: Record<string, string> = {
  normal: 'bg-slate-400',
  fire: 'bg-orange-500',
  water: 'bg-blue-500',
  grass: 'bg-green-500',
  electric: 'bg-yellow-400',
  ice: 'bg-cyan-300',
  fighting: 'bg-red-600',
  poison: 'bg-purple-500',
  ground: 'bg-amber-600',
  flying: 'bg-indigo-300',
  psychic: 'bg-pink-500',
  bug: 'bg-lime-500',
  rock: 'bg-stone-500',
  ghost: 'bg-violet-700',
  dragon: 'bg-violet-600',
  steel: 'bg-slate-500',
  fairy: 'bg-pink-400',
  dark: 'bg-gray-700',
};

export const TYPE_HEXES: Record<string, string> = {
  normal: '#94a3b8',
  fire: '#f97316',
  water: '#3b82f6',
  grass: '#22c55e',
  electric: '#facc15',
  ice: '#67e8f9',
  fighting: '#dc2626',
  poison: '#a855f7',
  ground: '#d97706',
  flying: '#a5b4fc',
  psychic: '#ec4899',
  bug: '#84cc16',
  rock: '#78716c',
  ghost: '#7c3aed',
  dragon: '#7c3aed',
  steel: '#64748b',
  fairy: '#f472b6',
  dark: '#374151',
};

export const ITEMS_PER_PAGE = 27;

export const REGIONS = ['kanto', 'johto', 'hoenn', 'sinnoh', 'unova', 'kalos', 'alola', 'galar', 'paldea'] as const;

export const REGION_RANGES: Record<string, [number, number]> = {
  kanto: [1, 151],
  johto: [152, 251],
  hoenn: [252, 386],
  sinnoh: [387, 493],
  unova: [494, 649],
  kalos: [650, 721],
  alola: [722, 809],
  galar: [810, 905],
  paldea: [906, 1025]
};
