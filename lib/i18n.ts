export type Language = 'en' | 'es';

export const translations = {
  en: {
    pokedex: 'Pokedex',
    page: 'Page',
    previous: 'Previous',
    next: 'Next',
    backToPokedex: 'Back to Pokedex',
    about: 'About',
    baseStats: 'Base Stats',
    total: 'Total',
    height: 'Height',
    weight: 'Weight',
    evolutionChain: 'Evolution Chain',
    noDescription: 'No description available.',
    hp: 'HP',
    attack: 'Attack',
    defense: 'Defense',
    specialAttack: 'Sp. Atk',
    specialDefense: 'Sp. Def',
    speed: 'Speed',
    types: {
      normal: 'Normal', fire: 'Fire', water: 'Water', electric: 'Electric', grass: 'Grass',
      ice: 'Ice', fighting: 'Fighting', poison: 'Poison', ground: 'Ground', flying: 'Flying',
      psychic: 'Psychic', bug: 'Bug', rock: 'Rock', ghost: 'Ghost', dragon: 'Dragon',
      steel: 'Steel', fairy: 'Fairy', dark: 'Dark',
    }
  },
  es: {
    pokedex: 'Pokédex',
    page: 'Página',
    previous: 'Anterior',
    next: 'Siguiente',
    backToPokedex: 'Volver a la Pokédex',
    about: 'Sobre',
    baseStats: 'Estadísticas Base',
    total: 'Total',
    height: 'Altura',
    weight: 'Peso',
    evolutionChain: 'Cadena de Evolución',
    noDescription: 'Sin descripción disponible.',
    hp: 'PS',
    attack: 'Ataque',
    defense: 'Defensa',
    specialAttack: 'At. Esp.',
    specialDefense: 'Def. Esp.',
    speed: 'Velocidad',
    types: {
      normal: 'Normal', fire: 'Fuego', water: 'Agua', electric: 'Eléctrico', grass: 'Planta',
      ice: 'Hielo', fighting: 'Lucha', poison: 'Veneno', ground: 'Tierra', flying: 'Volador',
      psychic: 'Psíquico', bug: 'Bicho', rock: 'Roca', ghost: 'Fantante', dragon: 'Dragón',
      steel: 'Acero', fairy: 'Hada', dark: 'Siniestro',
    }
  },
};

export function getLanguage(cookies: any): Language {
  const lang = cookies.get('lang')?.value;
  return lang === 'es' ? 'es' : 'en';
}
